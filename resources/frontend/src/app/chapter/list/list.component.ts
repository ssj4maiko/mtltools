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

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private api: ApiService
    ) { }

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
                                            });
                          });
                });
  }

  openGT(chapter: Chapter, dictionary: Dictionary) {
      let url = `${environment.backendServer}/static/${this.idNovel}/${dictionary.id}/${chapter.no}/1`;
      url = 'https://translate.google.com/translate?sl=auto&tl=en&u=' + url;
      window.open(url);
  }

  updateChapters() {
    this.api.Chapter.autoUpdate({ idNovel : this.idNovel })
      .then(res => {
        /**
         * Update the list too
         */
        this.api.Chapter.getAll({ idNovel: this.idNovel })
                      .then(chapters => {
                        this.chapters = Object.values(chapters);
                      });
      }, err => {
        console.log(err);
      });
  }

}
