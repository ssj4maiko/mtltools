import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface UpdateJob {
  id: string;
  idNovel: number;
  kind: 'autoUpdate' | 'updateChapter';
  phase: 'index' | 'insert' | 'fill' | 'check-updates' | 'done' | 'error';
  total: number;
  current: number;
  currentNo: number | null;
  errors: { code: string; message: string }[];
  startedAt: string;
  finishedAt: string | null;
}

/**
 * Tracks the backend's in-memory update job (GET /api/jobs). The backend keeps a single
 * current job, so one snapshot is enough. Nothing is persisted on the frontend either.
 */
@Injectable({ providedIn: 'root' })
export class UpdateJobsService {
  readonly job$ = new BehaviorSubject<UpdateJob | null>(null);
  private timer: any = null;

  constructor(private http: HttpClient) {}

  static isRunning(job: UpdateJob | null): boolean {
    return !!job && job.phase !== 'done' && job.phase !== 'error';
  }

  static label(job: UpdateJob): string {
    if (job.phase === 'done') { return 'Updated'; }
    if (job.phase === 'error') { return 'Update failed' + (job.errors.length ? ': ' + job.errors[0].message : ''); }
    const phases = { index: 'Reading index', insert: 'Inserting chapters', fill: 'Downloading chapters', 'check-updates': 'Checking revisions' };
    const progress = job.total > 0 ? ` ${job.current}/${job.total}` : '';
    return (phases[job.phase] || 'Updating') + progress + '…';
  }

  /** One-off fetch (used on page load to pick up a job that is already running). */
  refresh(): Promise<UpdateJob | null> {
    return new Promise((resolve) => {
      this.http.get<{ jobs: UpdateJob[] }>(environment.backendServer + '/api/jobs').subscribe(
        (res) => {
          const job = res && res.jobs && res.jobs.length ? res.jobs[0] : null;
          this.job$.next(job);
          resolve(job);
        },
        () => resolve(this.job$.value)
      );
    });
  }

  /**
   * Poll every 1.5 s until the current job is no longer running (or `maxMs` passes).
   * `expectNew` = a job was just requested: keep polling for a few seconds until it shows up.
   */
  watch(expectNew = false, maxMs = 30 * 60 * 1000): void {
    if (this.timer) { return; }
    const begun = Date.now();
    const until = begun + maxMs;
    const tick = () => {
      this.refresh().then((job) => {
        const waitingForStart = expectNew && Date.now() - begun < 8000
          && (!job || (job.finishedAt !== null && new Date(job.startedAt).getTime() < begun - 2000));
        if ((UpdateJobsService.isRunning(job) || waitingForStart) && Date.now() < until) {
          this.timer = setTimeout(tick, 1500);
        } else {
          this.timer = null;
        }
      });
    };
    this.timer = setTimeout(tick, 400);
  }
}
