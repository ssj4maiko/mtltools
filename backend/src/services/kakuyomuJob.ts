export const JOB_STATE_CAP_BYTES = 16 * 1024 * 1024;
export const JOB_TTL_MS = 15 * 60 * 1000;

export type KakuyomuJobKind = "autoUpdate" | "updateChapter";
export type KakuyomuJobPhase = "index" | "insert" | "fill" | "check-updates" | "done" | "error";

export type KakuyomuJobError = { code: string; message: string; no?: number; noCode?: string };

export type KakuyomuJobSnapshot = {
  id: string;
  idNovel: number;
  kind: KakuyomuJobKind;
  phase: KakuyomuJobPhase;
  total: number;
  current: number;
  currentNo: number | null;
  currentNoCode: string | null;
  errors: KakuyomuJobError[];
  startedAt: string;
  updatedAt: string;
  finishedAt: string | null;
};

export class KakuyomuJobConflictError extends Error {
  constructor(
    public readonly running: KakuyomuJobSnapshot,
    message = "A Kakuyomu update is already running",
  ) {
    super(message);
    this.name = "KakuyomuJobConflictError";
  }
}

export class KakuyomuJob {
  readonly id: string;
  readonly idNovel: number;
  readonly kind: KakuyomuJobKind;
  phase: KakuyomuJobPhase = "index";
  total = 0;
  current = 0;
  currentNo: number | null = null;
  currentNoCode: string | null = null;
  errors: KakuyomuJobError[] = [];
  readonly startedAt: string;
  updatedAt: string;
  finishedAt: string | null = null;
  readonly finished: Promise<void>;
  private resolveFinished!: () => void;
  private rejectFinished!: (err: unknown) => void;
  private settled = false;
  private readonly listeners = new Set<(snap: KakuyomuJobSnapshot) => void>();

  constructor(idNovel: number, kind: KakuyomuJobKind, now: Date = new Date()) {
    this.id = `kjob_${now.getTime()}_${idNovel}_${kind}`;
    this.idNovel = idNovel;
    this.kind = kind;
    this.startedAt = now.toISOString();
    this.updatedAt = this.startedAt;
    this.finished = new Promise<void>((resolve, reject) => {
      this.resolveFinished = resolve;
      this.rejectFinished = reject;
    });
  }

  snapshot(): KakuyomuJobSnapshot {
    return {
      id: this.id,
      idNovel: this.idNovel,
      kind: this.kind,
      phase: this.phase,
      total: this.total,
      current: this.current,
      currentNo: this.currentNo,
      currentNoCode: this.currentNoCode,
      errors: this.errors.map((e) => ({ ...e })),
      startedAt: this.startedAt,
      updatedAt: this.updatedAt,
      finishedAt: this.finishedAt,
    };
  }

  onUpdate(listener: (snap: KakuyomuJobSnapshot) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit(): void {
    const snap = this.snapshot();
    for (const listener of this.listeners) listener(snap);
  }

  touch(now: Date = new Date()): void {
    this.updatedAt = now.toISOString();
    this.emit();
  }

  setPhase(phase: KakuyomuJobPhase, now: Date = new Date()): void {
    this.phase = phase;
    this.touch(now);
  }

  progress(current: number, total: number, pointer?: { no?: number; noCode?: string }, now: Date = new Date()): void {
    this.current = current;
    this.total = total;
    if (pointer?.no !== undefined) this.currentNo = pointer.no;
    if (pointer?.noCode !== undefined) this.currentNoCode = pointer.noCode;
    this.touch(now);
  }

  addError(err: KakuyomuJobError, now: Date = new Date()): void {
    this.errors.push(err);
    this.touch(now);
  }

  succeed(now: Date = new Date()): void {
    if (this.settled) return;
    this.settled = true;
    this.phase = "done";
    this.finishedAt = now.toISOString();
    this.touch(now);
    this.resolveFinished();
  }

  fail(err: KakuyomuJobError | Error, now: Date = new Date()): void {
    if (this.settled) return;
    this.settled = true;
    this.phase = "error";
    this.finishedAt = now.toISOString();
    const payload: KakuyomuJobError =
      err instanceof Error && !("code" in err)
        ? { code: "error", message: err.message }
        : ((err as KakuyomuJobError).code ? (err as KakuyomuJobError) : { code: "error", message: String(err) });
    if (!this.errors.some((e) => e.message === payload.message && e.code === payload.code)) {
      this.errors.push(payload);
    }
    this.touch(now);
    this.rejectFinished(Object.assign(new Error(payload.message), { code: payload.code }));
  }
}

export class KakuyomuJobStore {
  private current: KakuyomuJob | null = null;
  private ttlTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private readonly ttlMs: number = JOB_TTL_MS) {}

  get(): KakuyomuJob | null {
    return this.current;
  }

  getById(jobId: string): KakuyomuJob | null {
    return this.current?.id === jobId ? this.current : null;
  }

  getByNovel(idNovel: number): KakuyomuJob | null {
    return this.current?.idNovel === idNovel ? this.current : null;
  }

  /**
   * Start a new job, or return the running/just-finished job for the same novel and kind.
   * A different running novel or kind raises KakuyomuJobConflictError.
   */
  startOrAttach(idNovel: number, kind: KakuyomuJobKind, now: Date = new Date()): { job: KakuyomuJob; started: boolean } {
    if (this.current) {
      const running = this.current;
      if (running.phase !== "done" && running.phase !== "error") {
        if (running.idNovel === idNovel && running.kind === kind) {
          return { job: running, started: false };
        }
        throw new KakuyomuJobConflictError(running.snapshot());
      }
      // Finished job still in the TTL window: same novel can start a new one.
    }
    this.clearTimer();
    const job = new KakuyomuJob(idNovel, kind, now);
    this.current = job;
    const settle = () => this.scheduleExpiry();
    job.finished.then(settle, settle);
    return { job, started: true };
  }

  estimateBytes(extra: unknown): number {
    const pieces = [this.current?.snapshot() ?? null, extra];
    return Buffer.byteLength(JSON.stringify(pieces), "utf8");
  }

  assertCap(extra: unknown): void {
    const size = this.estimateBytes(extra);
    if (size > JOB_STATE_CAP_BYTES) {
      throw new Error(`Kakuyomu job state would exceed ${JOB_STATE_CAP_BYTES} bytes`);
    }
  }

  private scheduleExpiry(): void {
    this.clearTimer();
    this.ttlTimer = setTimeout(() => {
      this.current = null;
      this.ttlTimer = null;
    }, this.ttlMs);
    this.ttlTimer.unref?.();
  }

  private clearTimer(): void {
    if (this.ttlTimer) {
      clearTimeout(this.ttlTimer);
      this.ttlTimer = null;
    }
  }

  /** Test helper: drop state immediately. */
  reset(): void {
    this.clearTimer();
    this.current = null;
  }
}
