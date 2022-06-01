import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api';

import { Chapter } from '../../_models/chapter';
import { Novel } from '../../_models/novel';
import { environment } from 'src/environments/environment';
import { Dictionary } from 'src/app/_models/dictionary';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  chapters: Chapter[] = [];
  dictionaries: Dictionary[] = [];
  novel: Novel;
  idNovel: number;

  updating:boolean[] = [];

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private api: ApiService
    ) { }

  sortingAlg = {
    numberAsc: (a: Chapter, b: Chapter) => {
      return a.no > b.no;
    },
    titleAsc: (a: Chapter, b: Chapter) => {
      return a.title > b.title;
    },
    createdAsc: (a: Chapter, b: Chapter) => {
      return a.dateCreated > b.dateCreated;
    },
    updatedAsc: (a: Chapter, b: Chapter) => {
      return (a.dateRevision ?? a.dateCreated) > (b.dateRevision ?? b.dateCreated);
    },
    numberDesc: (a: Chapter, b: Chapter) => {
      return a.no < b.no;
    },
    titleDesc: (a: Chapter, b: Chapter) => {
      return a.title < b.title;
    },
    createdDesc: (a: Chapter, b: Chapter) => {
      return a.dateCreated < b.dateCreated;
    },
    updatedDesc: (a: Chapter, b: Chapter) => {
      return (a.dateRevision ?? a.dateCreated) < (b.dateRevision ?? b.dateCreated);
    },
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
    this.api.Chapter.autoUpdate({ idNovel : this.idNovel })
      .then(res => {
        /**
         * Update the list too
         */
        --this.disableupdate;
        this.api.Chapter.getAll({ idNovel: this.idNovel })
                      .then(chapters => {
                        this.chapters = Object.values(chapters);
                        this.sort(this.currentSort.by, this.currentSort.dir);
                      });
      }, err => {
        console.log(err);
      });
  }

}
