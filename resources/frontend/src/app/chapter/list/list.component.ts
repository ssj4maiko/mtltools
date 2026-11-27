import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../api';

import { Chapter } from '../../_models/chapter';
import { Novel } from '../../_models/novel';
import { environment } from 'src/environments/environment';
import { Dictionary } from 'src/app/_models/dictionary';
import { UpdateJob, UpdateJobsService } from '../../_services/update-jobs.service';
import { SortState, TableSort } from '../../_services/table-sort';

@Component({
    selector: 'app-chapter-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ListComponent implements OnInit, OnDestroy {

  chapters: Chapter[] = [];
  dictionaries: Dictionary[] = [];
  novel: Novel;
  idNovel: number;

  updating:boolean[] = [];

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private api: ApiService
    , public jobs: UpdateJobsService
    ) { }

  job: UpdateJob | null = null;
  private sub: Subscription;
  readonly label = UpdateJobsService.label;
  readonly isRunning = UpdateJobsService.isRunning;

  /** The backend job for this novel, if it is still running. */
  get runningJob(): UpdateJob | null {
    return this.job && this.job.idNovel == this.idNovel && UpdateJobsService.isRunning(this.job) ? this.job : null;
  }
  /** The finished/failed job for this novel (shown after an update). */
  get finishedJob(): UpdateJob | null {
    return this.job && this.job.idNovel == this.idNovel && !UpdateJobsService.isRunning(this.job) && this.disableupdate === 0 ? this.job : null;
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
    if (this.querySub) { this.querySub.unsubscribe(); }
  }

  /** Sort columns; the URL carries them as chapterSort/chapterDir (the novel table has its own pair). */
  readonly tableSort = new TableSort<Chapter>([
    { key: 'number', value: (c) => c.no },
    { key: 'title', value: (c) => c.title },
    // Sort by the same source dates the columns show. Empty values sort last (same as the
    // novel-list date columns); a hidden fallback would put blank cells in the middle.
    { key: 'created', value: (c) => c.dateOriginalPost as unknown as string, firstDir: 'desc' },
    { key: 'updated', value: (c) => c.dateOriginalRevision as unknown as string, firstDir: 'desc' },
  ], { by: 'number', dir: 'desc' }, 'chapter');
  currentSort: SortState = this.tableSort.defaultState;
  private querySub: Subscription;

  private onQuery(params: ParamMap) {
    let state = this.tableSort.fromParams(params);
    if (!state) {
      // No sort in the URL: use what was chosen last time, on any novel (and show it in the URL).
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
    this.applySort();
  }

  /** Header click: flip the active column or switch column. A new history entry, so Back undoes it. */
  sort(by: string) {
    this.router.navigate([], {
      relativeTo: this.route, queryParams: this.tableSort.toParams(this.tableSort.next(this.currentSort, by)), queryParamsHandling: 'merge',
    });
  }

  sortIcon(by: string): string {
    if (this.currentSort.by !== by) { return 'fa-sort'; }
    return this.currentSort.dir === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  private applySort() {
    this.tableSort.sort(this.chapters, this.currentSort);
  }

  ngOnInit() {
    this.idNovel = this.route.snapshot.params.idNovel;
    this.querySub = this.route.queryParamMap.subscribe((params) => this.onQuery(params));
    this.sub = this.jobs.job$.subscribe((job) => this.job = job);
    this.jobs.refresh().then((job) => {
      if (UpdateJobsService.isRunning(job)) { this.jobs.watch(); }
    });
    this.api.Novel.get({id: this.idNovel})
                .then(novel => {
                  this.novel = novel;
                  this.api.Dictionary.getAll({idNovel: this.idNovel})
                          .then(dictionaries => {
                            this.dictionaries = Object.values(dictionaries);
                            this.api.Chapter.getAll({idNovel: this.idNovel})
                                            .then(chapters => {
                                              this.chapters = Object.values(chapters);
                                              this.applySort();
                                            });
                          });
                });
  }
  disableupdate:number = 0;
  async updateChapter(noChapter: number) {
    this.updating[noChapter] = true;
    this.disableupdate++;
    return this.api.Chapter.chapterAutoUpdate({ idNovel:this.idNovel, no: noChapter })
      .then(res => {
        console.log('Chapter updated', res);
        --this.disableupdate;
        /**
         * Auto update on the list too
         */
        this.api.Chapter.getAll({ idNovel: this.idNovel })
          .then(chapters => {
            this.chapters = Object.values(chapters);
            this.applySort();
          });
        delete this.updating[noChapter];
      }, err => {
        console.log(err);
      });
  }
  async updateAllChapters(){
    if(this.disableupdate == 0){
      for(let i=0; i<this.chapters.length; ++i){
        await (new Promise((resolve) => {
          this.updateChapter(this.chapters[i].no)
              .then(() => {
                resolve(true);
              });
        }))
      }
    }
  }
  openGT(chapter: Chapter, dictionary: Dictionary) {
      let url = `${environment.backendServer}/static/${this.idNovel}/${dictionary.id}/${chapter.no}/1`;
      url = 'https://translate.google.com/translate?sl=auto&tl=en&u=' + url;
      window.open(url);
  }

  updateChapters() {
    this.disableupdate++;
    this.jobs.watch(true);
    this.api.Chapter.autoUpdate({ idNovel : this.idNovel })
      .then(res => {
        /**
         * Update the list too
         */
        --this.disableupdate;
        this.jobs.watch(false);
        this.api.Chapter.getAll({ idNovel: this.idNovel })
                      .then(chapters => {
                        this.chapters = Object.values(chapters);
                        this.applySort();
                      });
      }, err => {
        console.log(err);
        --this.disableupdate;
        this.jobs.watch(false);
      });
  }

}
