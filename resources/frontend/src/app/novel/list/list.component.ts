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
      protected api: ApiService,
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
        this.sort(this.currentSort.by, this.currentSort.dir);
      }, (error) => {
        console.log(error);
      });
  }
  sortingAlg = {
    idAsc: (a: Novel, b: Novel) => {
      return a.id > b.id;
    },
    nameAsc: (a: Novel, b: Novel) => {
      return a.nameCustom > b.nameCustom;
    },
    nameJPAsc: (a: Novel, b: Novel) => {
      return a.nameOriginal > b.nameOriginal;
    },
    chaptersAsc: (a: Novel, b: Novel) => {
      return a.numberChapters > b.numberChapters;
    },
    driverAsc: (a: Novel, b: Novel) => {
      return a.driver > b.driver;
    },
    addedAsc: (a: Novel, b: Novel) => {
      return a.addedBy > b.addedBy;
    },
    idDesc: (a: Novel, b: Novel) => {
      return a.id < b.id;
    },
    nameDesc: (a: Novel, b: Novel) => {
      return a.nameCustom < b.nameCustom;
    },
    nameJPDesc: (a: Novel, b: Novel) => {
      return a.nameOriginal < b.nameOriginal;
    },
    chaptersDesc: (a: Novel, b: Novel) => {
      return a.numberChapters < b.numberChapters;
    },
    driverDesc: (a: Novel, b: Novel) => {
      return a.driver < b.driver;
    },
    addedDesc: (a: Novel, b: Novel) => {
      return a.addedBy < b.addedBy;
    },
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
  this.updating[idNovel] = true;      
    this.api.Chapter.autoUpdate({ idNovel })
        .then(res => {
            console.log('Novel updated', res);
            delete this.updating[idNovel];
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
            delete this.updating[idNovel];
            alert("There was an error on updating, likely due to Timeout.\n\n"+
                  "The backend may still be working, so you will have to refresh the page to see if it's still updating"+
                  "If it has stopped and/or it's taking too long, report it to the developer along with the novel, as it will be necessary to reproduce the error.");
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
