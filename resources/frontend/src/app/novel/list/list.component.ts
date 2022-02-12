import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../../api.service';
import { ApiService } from '../../api';
import { Novel } from '../../_models/novel';

@Component({
  selector: 'app-novel-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  novels: Novel[] = [];

  constructor(
      private api: ApiService,
      // private cacheService: CacheService
  ) {}

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    // Get list of novels
    this.api.Novel.getAll()
      .then((novels) => {
        // this.novels = [novels];
        this.novels = Object.values(novels);
      }, (error) => {
        console.log(error);
      });
  }

  updateChapters(idNovel: number) {
    this.api.Chapter.autoUpdate({ idNovel })
        .then(res => {
            console.log('Novel updated', res);
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
