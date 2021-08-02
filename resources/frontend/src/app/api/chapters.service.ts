import { Injectable } from '@angular/core';
import { ApiService } from '.';
import { Chapter } from '../_models/chapter';
import { Novel } from '../_models/novel';
import { AjaxService } from './ajax.service';

@Injectable({
  providedIn: 'root'
})
export class ChaptersService extends AjaxService {
  route = 'chapter/';
  items: [Chapter[]] = [[]];
  hasAll: [boolean] = [false];
  api: ApiService = null;
  setApi(api: ApiService): void {
    this.api = api;
  }
  set(idNovel: number, items: Chapter[]): void {
    if (!this.items[idNovel]) {
      this.items[idNovel] = [];
    }
    if (items.length > 0) {
      for (const item of items) {
        this.items[idNovel][item.no] = item;
      }
    }
  }
  has(params: { idNovel: number, no?: number, text?: boolean }): boolean {
    if (!params.no ) {
      return !!(this.items[params.idNovel]);
    } else {
      if (!params.text) {
        return !!(this.items[params.idNovel] && this.items[params.idNovel][params.no]);
      } else {
        return !!(this.items[params.idNovel]
              && this.items[params.idNovel][params.no]
              && this.items[params.idNovel][params.no].textOriginal);
      }
    }
  }
  /**
   * Basic CRUD stuff here. <params.text> is for when I need the texts available (Only used in Detail View)
   */
  get(params: { idNovel: number, no: number, text?: boolean } ): Promise<Chapter> {
    return new Promise<Chapter>((resolve, reject) => {
      if (this.has({idNovel: params.idNovel, no: params.no, text: params.text})) {
        resolve(this.items[params.idNovel][params.no]);
      } else {
        this._get(this.route + params.idNovel + '/' + params.no)
          .subscribe((item: Chapter) => {
            if (item) {
              this.set(params.idNovel, [item]);
              resolve(this.items[params.idNovel][params.no]);
            } else {
              reject('Invalid Chapter on Novel ' + params.idNovel + ' / ' + params.no);
            }
          });
      }
    });
  }
  getAll(params: { idNovel: number, search?: string } ): Promise<Chapter[]> {
    return new Promise<Chapter[]>((resolve, reject) => {
      if (this.hasAll[params.idNovel]) {
        resolve(this.items[params.idNovel]);
      } else {
        this._get(this.route + params.idNovel)
          .subscribe((items: Chapter[]) => {
            if (items.length > 0) {
              this.set(params.idNovel, items);

              this.hasAll[params.idNovel] = true;
              resolve(items);
            } else {
              reject('No Chapters for Novel ' + params.idNovel);
            }
          });
      }
    });
  }
  add(params: { idNovel: number, chapter: Chapter }): Promise<Chapter> {
    return new Promise<Chapter>((resolve, reject) => {
      this._post(this.route, params.chapter)
        .subscribe((item: Chapter) => {
          if (item) {
            this.set(params.idNovel, [item]);
            resolve(item);
          } else {
            reject('Error on inserting chapter ' + params.idNovel);
          }
        });
    });
  }
  update(params: { idNovel: number, no: number, chapter: Chapter }): Promise<Chapter> {
    return new Promise<Chapter>((resolve, reject) => {
      this._put(this.route + params.idNovel + '/' + params.no, params.chapter)
        .subscribe((item: Chapter) => {
          if (item) {
            this.set(params.idNovel, [item]);
            resolve(item);
          } else {
            reject('Error on updating chapter ' + params.no);
          }
        });
    });
  }
  delete(params: { idNovel: number, no: number } ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._delete(this.route + params.idNovel + '/' + params.no)
        .subscribe((item) => {
          if (item) {
            this.items[params.idNovel][params.no] = null;
            resolve(true);
          } else {
            reject('Error on deleting chapter ' + params.no);
          }
        });
    });
  }
  /**
   * More complex stuff starting here
   */

  // Lots of automated services here
  autoUpdate(params: { idNovel: number }): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._get(this.route + 'autoUpdate/' + params.idNovel)
        .subscribe((novel: Novel) => {
          // If we already have a register, we should check if anything relevant was updated.
          if (this.api.Novel.has({ id: params.idNovel })) {
            this.api.Novel
                  .get({id: params.idNovel})
                  .then((novelCurrent) => {
                    // If there are more chapters, we update the novel folder, and point we don't have everything anymore
                    if (novel.numberChapters !== novelCurrent.numberChapters ) {
                      this.api.Novel.set([novel]);
                      this.hasAll[params.idNovel] = false;
                      //  Then if we already have chapters in, we reload, otherwise, no need to do that.
                      if (this.has({ idNovel : params.idNovel })) {
                        this.getAll({ idNovel : params.idNovel })
                            .then(_ => {
                              resolve(true);
                            });
                      } else {
                        resolve(true);
                      }
                    } else {
                      resolve(false);
                    }
                  });
          } else {
            this.api.Novel.set([novel]);
            resolve(true);
          }
        });
    });
  }
}
