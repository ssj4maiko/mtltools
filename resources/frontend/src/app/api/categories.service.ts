import { Injectable } from '@angular/core';
import { ApiService } from '.';
import { DictionaryCategory } from '../_models/dictionarycategory';
import { AjaxService } from './ajax.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends AjaxService {
  route = 'category/';
  items: DictionaryCategory[][] = [];
  hasAll: boolean[] = [];
  api: ApiService = null;
  setApi(api: ApiService): void {
    this.api = api;
  }
  set(items: DictionaryCategory[], idDictionary: number, force: boolean = false): void {
    if (!this.items[idDictionary] || force) {
      this.items[idDictionary] = [];
    }
    for (const item of items) {
      this.items[idDictionary][item.id] = item;
      if (!this.items[idDictionary][item.id].entries) {
        this.items[idDictionary][item.id].entries = [];
      }
    }
    if (force) {
      this.hasAll[idDictionary] = true;
    }
  }
  has(params: { idDictionary: number, id?: number }): boolean {
    if (!params.id) {
      return !!(this.items[params.idDictionary]);
    } else {
      return !!(this.items[params.idDictionary] && this.items[params.idDictionary][params.id]);
    }
  }

  /**
   * Basic CRUD stuff here
   */
  get(params: { idDictionary: number, id: number }): Promise<DictionaryCategory> {
    return new Promise<DictionaryCategory>((resolve, reject) => {
      if (this.items[params.idDictionary] && this.items[params.idDictionary][params.id]) {
        resolve(this.items[params.idDictionary][params.id]);
      } else {
        this._get(this.route + params.idDictionary + '/' + params.id)
          .subscribe((item: DictionaryCategory) => {
            if (item) {
              this.set([item], params.idDictionary);
              resolve(item);
            } else {
              reject('Invalid DictionaryCategory ' + params.id);
            }
          });
      }
    });
  }
  getAll(params: { idDictionary: number, search?: number }): Promise<DictionaryCategory[]> {
    return new Promise<DictionaryCategory[]>((resolve, reject) => {
      if (this.hasAll[params.idDictionary]) {
        resolve(this.items[params.idDictionary]);
      } else {
        this._get(this.route + params.idDictionary + '/' )
          .subscribe((items: DictionaryCategory[]) => {
            this.hasAll[params.idDictionary] = true;
            this.set(items, params.idDictionary);
            resolve(this.items[params.idDictionary]);
          });
      }
    });
  }
  add(params: { idDictionary: number, category: DictionaryCategory }): Promise<DictionaryCategory> {
    return new Promise<DictionaryCategory>((resolve, reject) => {
      this._post(this.route + params.idDictionary + '/' , params.category)
        .subscribe((item: DictionaryCategory) => {
          if (item) {
            this.set([item], params.idDictionary);
            resolve(item);
          } else {
            reject('Error on inserting category ' + params.category.name);
          }
        });
    });
  }
  update(params: { idDictionary: number, id: number, category: DictionaryCategory }): Promise<DictionaryCategory> {
    return new Promise<DictionaryCategory>((resolve, reject) => {
      this._put(this.route + params.idDictionary + '/'  + params.id, params.category)
        .subscribe((item: DictionaryCategory) => {
          if (item) {
            this.set([item], params.idDictionary);
            resolve(item);
          } else {
            reject('Error on updating category ' + params.id);
          }
        });
    });
  }
  delete(params: { idDictionary: number, id: number }): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._delete(this.route + params.idDictionary + '/'  + params.id)
        .subscribe((item) => {
          if (item) {
            delete this.items[params.idDictionary][params.id];
            resolve(true);
          } else {
            reject('Error on deleting category ' + params.id);
          }
        });
    });
  }
}
