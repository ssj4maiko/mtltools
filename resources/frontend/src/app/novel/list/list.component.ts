import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
// import { ApiService } from '../../api.service';
import { ApiService } from '../../api';
import { Novel } from '../../_models/novel';
import { UpdateJob, UpdateJobsService } from '../../_services/update-jobs.service';

/**
 * Comparators must return a number. Returning a boolean works in Firefox's merge sort by luck
 * but breaks in Chrome (V8's TimSort treats `true`/`false` as 1/0 and never sees "less than").
 */
function compare(a: any, b: any): number {
  if (a === b) { return 0; }
  if (a === null || a === undefined || a === '') { return 1; }
  if (b === null || b === undefined || b === '') { return -1; }
  if (typeof a === 'number' && typeof b === 'number') { return a - b; }
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

@Component({
  selector: 'app-novel-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  novels: Novel[] = [];

  constructor(
      protected api: ApiService,
      public jobs: UpdateJobsService,
      // private cacheService: CacheService
  ) {}

  /** Latest job snapshot from the backend (in-memory there; mirrored here for display). */
  job: UpdateJob | null = null;
  private runningJobId: string | null = null;
  private lastFinishedHandled: string | null = null;
  private sub: Subscription;
  readonly label = UpdateJobsService.label;
  readonly isRunning = UpdateJobsService.isRunning;

  ngOnInit() {
    this.loadList();
    this.sub = this.jobs.job$.subscribe((job) => this.onJob(job));
    // Pick up a job that is already running (or just finished) when the page is (re)loaded.
    this.jobs.refresh().then((job) => {
      if (UpdateJobsService.isRunning(job)) { this.jobs.watch(); }
    });
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
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
    });
  }

  loadList() {
    // Get list of novels
    this.api.Novel.getAll()
      .then((novels) => {
        // this.novels = [novels];
        this.novels = Object.values(novels);
        this.sort(this.currentSort.by, this.currentSort.dir);
      }, (error) => {
        console.log(error);
      });
  }
  sortingAlg = {
    idAsc: (a: Novel, b: Novel) => compare(a.id, b.id),
    nameAsc: (a: Novel, b: Novel) => compare(a.nameCustom, b.nameCustom),
    nameJPAsc: (a: Novel, b: Novel) => compare(a.nameOriginal, b.nameOriginal),
    chaptersAsc: (a: Novel, b: Novel) => compare(a.numberChapters, b.numberChapters),
    driverAsc: (a: Novel, b: Novel) => compare(a.driver, b.driver),
    addedAsc: (a: Novel, b: Novel) => compare(a.addedBy, b.addedBy),
    idDesc: (a: Novel, b: Novel) => compare(b.id, a.id),
    nameDesc: (a: Novel, b: Novel) => compare(b.nameCustom, a.nameCustom),
    nameJPDesc: (a: Novel, b: Novel) => compare(b.nameOriginal, a.nameOriginal),
    chaptersDesc: (a: Novel, b: Novel) => compare(b.numberChapters, a.numberChapters),
    driverDesc: (a: Novel, b: Novel) => compare(b.driver, a.driver),
    addedDesc: (a: Novel, b: Novel) => compare(b.addedBy, a.addedBy),
  }
  currentSort = {
    by: 'id',
    dir: '+'
  }
  sort(sortAlg: string, dir: string) {
    this.currentSort.by = sortAlg;
    this.currentSort.dir = dir;
    this.novels.sort(this.sortingAlg[this.currentSort.by + (dir == '+' ? 'Asc' : 'Desc')]);
  }

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
