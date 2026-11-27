import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { ApiService } from '../../api.service';
import { ApiService } from '../../api';
import { Novel } from '../../_models/novel';
import { UpdateJob, UpdateJobsService } from '../../_services/update-jobs.service';
import { SortState, TableSort } from '../../_services/table-sort';
import { formatWhen, formatWhenFull } from '../../_services/format-when';

@Component({
    selector: 'app-novel-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ListComponent implements OnInit, OnDestroy {

  novels: Novel[] = [];
  /** The rows on screen: shown novels that match the filter, in the current order. */
  visible: Novel[] = [];

  constructor(
      protected api: ApiService,
      public jobs: UpdateJobsService,
      protected router: Router,
      protected route: ActivatedRoute,
  ) {}

  /** Latest job snapshot from the backend (in-memory there; mirrored here for display). */
  job: UpdateJob | null = null;
  private runningJobId: string | null = null;
  private lastFinishedHandled: string | null = null;
  private sub: Subscription;
  private querySub: Subscription;
  readonly label = UpdateJobsService.label;
  readonly isRunning = UpdateJobsService.isRunning;

  ngOnInit() {
    if (this.sortInUrl) { this.querySub = this.route.queryParamMap.subscribe((params) => this.onQuery(params)); }
    this.loadList();
    this.sub = this.jobs.job$.subscribe((job) => this.onJob(job));
    // Pick up a job that is already running (or just finished) when the page is (re)loaded.
    this.jobs.refresh().then((job) => {
      if (UpdateJobsService.isRunning(job)) { this.jobs.watch(); }
    });
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
    if (this.querySub) { this.querySub.unsubscribe(); }
    clearTimeout(this.filterTimer);
  }

  private onJob(job: UpdateJob | null) {
    this.job = job;
    if (!job) { return; }
    if (UpdateJobsService.isRunning(job)) {
      this.updating[job.idNovel] = true;
      this.runningJobId = job.id;
    } else {
      if (this.runningJobId === job.id) { delete this.updating[job.idNovel]; }
      // Refresh that novel's row once when a job finishes (e.g. started in another tab/page load).
      if (this.lastFinishedHandled !== job.id) {
        this.lastFinishedHandled = job.id;
        this.reloadNovel(job.idNovel);
      }
    }
  }

  /** True when the finished/failed badge should show for this novel (recent job only). */
  finishedJob(idNovel: number): UpdateJob | null {
    const j = this.job;
    if (!j || j.idNovel !== idNovel || this.updating[idNovel] || UpdateJobsService.isRunning(j)) { return null; }
    return j;
  }

  private reloadNovel(idNovel: number) {
    this.api.Novel.get({id: idNovel}).then((novel) => {
      for (const i in this.novels) {
        if (this.novels[i].id === novel.id) { this.novels[i] = novel; break; }
      }
      this.refreshView();
    });
  }

  loadList() {
    // Get list of novels
    this.api.Novel.getAll()
      .then((novels) => {
        // this.novels = [novels];
        this.novels = Object.values(novels);
        this.refreshView();
      }, (error) => {
        console.log(error);
      });
  }
  /** Sort columns; the URL carries them as novelSort/novelDir (the chapter table has its own pair). */
  readonly tableSort = new TableSort<Novel>([
    { key: 'id', value: (n) => n.id },
    { key: 'name', value: (n) => n.nameCustom },
    { key: 'nameJP', value: (n) => n.nameOriginal },
    { key: 'chapters', value: (n) => n.numberChapters },
    { key: 'driver', value: (n) => n.driver },
    { key: 'added', value: (n) => n.addedBy as unknown as string },
    { key: 'lastAdded', value: (n) => n.lastChapterAddedAt, firstDir: 'desc' },
    { key: 'lastRevised', value: (n) => n.lastChapterRevisedAt, firstDir: 'desc' },
  ], { by: 'id', dir: 'asc' }, 'novel');
  currentSort: SortState = this.tableSort.defaultState;
  /** The full list keeps its sort and filter in the URL; the dashboard's embedded copy sorts locally. */
  protected sortInUrl = true;
  /** Instant filter text, also kept in the URL as ?q= */
  filterText = '';
  private filterKey = '';
  private filterTimer: ReturnType<typeof setTimeout>;

  private onQuery(params: ParamMap) {
    let state = this.tableSort.fromParams(params);
    if (!state) {
      // No sort in the URL: use what was chosen last time (and show it in the URL).
      state = this.tableSort.recall();
      if (state) {
        this.router.navigate([], {
          relativeTo: this.route, queryParams: this.tableSort.toParams(state), queryParamsHandling: 'merge', replaceUrl: true,
        });
      }
    } else {
      this.tableSort.remember(state);
    }
    this.currentSort = state ?? this.tableSort.defaultState;
    const q = params.get('q') ?? '';
    if (q !== this.filterText.trim()) { this.filterText = q; }
    this.refreshView();
  }

  /** Header click: flip the active column or switch column. A new history entry, so Back undoes it. */
  sort(by: string) {
    if (!this.sortInUrl) {
      this.currentSort = this.tableSort.next(this.currentSort, by);
      this.refreshView();
      return;
    }
    this.router.navigate([], {
      relativeTo: this.route, queryParams: this.tableSort.toParams(this.tableSort.next(this.currentSort, by)), queryParamsHandling: 'merge',
    });
  }

  sortIcon(by: string): string {
    if (this.currentSort.by !== by) { return 'fa-sort'; }
    return this.currentSort.dir === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  onFilter(value: string) {
    this.filterText = value;
    this.refreshView();
    // The URL follows after a short pause, so a navigation echo never overwrites text still being typed.
    clearTimeout(this.filterTimer);
    this.filterTimer = setTimeout(() => {
      this.router.navigate([], {
        relativeTo: this.route, queryParams: { q: this.filterText.trim() || null }, queryParamsHandling: 'merge', replaceUrl: true,
      });
    }, 250);
  }

  protected refreshView() {
    this.tableSort.sort(this.novels, this.currentSort);
    this.filterKey = this.filterText.trim().toLowerCase();
    this.visible = this.novels.filter((n) => n.show && this.matches(n));
  }

  private matches(n: Novel): boolean {
    if (!this.filterKey) { return true; }
    return [n.nameCustom, n.nameOriginal, n.driver, n.code].some((v) => !!v && String(v).toLowerCase().includes(this.filterKey));
  }

  readonly when = formatWhen;
  readonly whenFull = formatWhenFull;

  updating:boolean[] = [];
  updateChapters(idNovel: number) {
    if (this.updating[idNovel]) { return; }
    this.updating[idNovel] = true;
    this.jobs.watch(true);
    this.api.Chapter.autoUpdate({ idNovel })
        .then(res => {
            console.log('Novel updated', res);
            delete this.updating[idNovel];
            this.jobs.watch(false);
            /**
             * Auto update on the list too
             */
            this.api.Novel.get({id: idNovel})
                          .then((novel) => {
                              let updated = false;
                              for (const i in this.novels) {
                                if (this.novels[i].id === novel.id) {
                                    this.novels[i] = novel;
                                    updated = true;
                                    break;
                                }
                              }
                              this.refreshView();
                              if (!updated) {
                                console.log('The novel was not found on the list? Impossible...');
                              }

                          });
        }, err => {
            console.log(err);
            // The HTTP request can time out while the backend job keeps going: trust /api/jobs.
            this.jobs.refresh().then((job) => {
              if (job && job.idNovel === idNovel && UpdateJobsService.isRunning(job)) {
                this.jobs.watch(false);
                return;
              }
              delete this.updating[idNovel];
              if (!job || job.idNovel !== idNovel || job.phase !== 'error') {
                alert("There was an error on updating, likely due to Timeout.\n\n" +
                      "Refresh the page to check whether the backend is still working. " +
                      "If it has stopped and/or it's taking too long, report it to the developer along with the novel.");
              }
            });
        });
  }
  delete(idNovel: number) {
    if (confirm('Are you sure?')) {
      this.api.Novel.delete({id: idNovel})
        .then((_) => {
          console.log(_);
          // this.novels = [novels];
          this.loadList();
        }, (error) => {
          console.log(error);
        });
    }
  }
}
