import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api';

import { Chapter } from '../../_models/chapter';
import { Novel } from '../../_models/novel';
import { environment } from 'src/environments/environment';
import { Dictionary } from 'src/app/_models/dictionary';
import { UpdateJob, UpdateJobsService } from '../../_services/update-jobs.service';

/**
 * Comparators must return a number. Returning a boolean works in Firefox but not in Chrome (V8 TimSort).
 */
function compare(a: any, b: any): number {
  if (a === b) { return 0; }
  if (a === null || a === undefined || a === '') { return 1; }
  if (b === null || b === undefined || b === '') { return -1; }
  if (typeof a === 'number' && typeof b === 'number') { return a - b; }
  return a < b ? -1 : (a > b ? 1 : 0);
}

@Component({
    selector: 'app-chapter-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
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
  }

  sortingAlg = {
    numberAsc: (a: Chapter, b: Chapter) => compare(a.no, b.no),
    titleAsc: (a: Chapter, b: Chapter) => compare(a.title, b.title),
    createdAsc: (a: Chapter, b: Chapter) => compare(a.dateCreated, b.dateCreated),
    updatedAsc: (a: Chapter, b: Chapter) => compare((a.dateRevision ?? a.dateCreated), (b.dateRevision ?? b.dateCreated)),
    numberDesc: (a: Chapter, b: Chapter) => compare(b.no, a.no),
    titleDesc: (a: Chapter, b: Chapter) => compare(b.title, a.title),
    createdDesc: (a: Chapter, b: Chapter) => compare(b.dateCreated, a.dateCreated),
    updatedDesc: (a: Chapter, b: Chapter) => compare((b.dateRevision ?? b.dateCreated), (a.dateRevision ?? a.dateCreated)),
  }
  currentSort = {
    by: 'number',
    dir: '-'
  }
  sort(sortAlg:string, dir:string) {
    this.currentSort.by = sortAlg;
    this.currentSort.dir = dir;
    this.chapters.sort(this.sortingAlg[this.currentSort.by + (dir == '+' ? 'Asc' : 'Desc' ) ] );
  }

  ngOnInit() {
    this.idNovel = this.route.snapshot.params.idNovel;
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
                                              this.sort(this.currentSort.by, this.currentSort.dir);
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
            this.sort(this.currentSort.by, this.currentSort.dir);
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
                        this.sort(this.currentSort.by, this.currentSort.dir);
                      });
      }, err => {
        console.log(err);
        --this.disableupdate;
        this.jobs.watch(false);
      });
  }

}
