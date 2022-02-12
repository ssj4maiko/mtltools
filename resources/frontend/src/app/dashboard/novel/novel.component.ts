import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api';
import { CacheService } from '../../cache.service';

import { Observable } from 'rxjs/Observable';
import { Novel } from '../../_models/novel';

@Component({
  selector: 'app-dashboard-novel',
  templateUrl: './novel.component.html',
  styleUrls: ['./novel.component.scss']
})
export class NovelComponent implements OnInit {

  novels: Novel[] = [];

  constructor(
    private api: ApiService,
    private cacheService: CacheService
  ) { }

  ngOnInit() {
    // Get list of novels
    this.api.Novel.getAll()
      .then(novels => {
        // Always take from the updated api.Novels()
        this.novels = Object.values(novels);
      }, err => {
        console.log(err);
      }
      );
  }

  updateChapters(idNovel: number) {
    this.api.Chapter.autoUpdate({ idNovel })
      .then(res => {
        console.log('updateChapters', res);
        /**
         * Auto update on the list too
         */
        this.api.Novel.get({ id: idNovel })
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
      });
  }
}
