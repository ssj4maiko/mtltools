import { Injectable } from '@angular/core';
import { ApiService } from '.';
import { DictionaryCategory, DictionaryEntry, EntryForm } from '../_models';
import { AjaxService } from './ajax.service';

@Injectable({
  providedIn: 'root'
})
export class EntriesService extends AjaxService {
  route = 'entry/';
  items: [[DictionaryEntry[]]] = [[[]]];
  hasAll: boolean[][] = [[]];
  api: ApiService = null;
  setApi(api: ApiService): void {
    this.api = api;
  }
  setHasAll(idDictionary: number, idCategory: number, set: boolean = true): void {
    if (!this.hasAll[idDictionary]) {
      this.hasAll[idDictionary] = [];
    }
    this.hasAll[idDictionary][idCategory] = set;
  }
  set(idDictionary: number, idCategory: number, items: DictionaryEntry[] | EntryForm[], force: boolean = false): void {
    if (!this.items[idDictionary] || force) {
      this.items[idDictionary] = [[]];
    }
    if (idCategory) {
      if (!this.items[idDictionary][idCategory]) {
        this.items[idDictionary][idCategory] = [];
      }
      if (items.length > 0) {
        for (const item of items) {
          this.items[idDictionary][idCategory][item.id] = new DictionaryEntry(item);
        }
      }
      if (force) {
        this.setHasAll(idDictionary, idCategory);
      }
    } else {
      if (items.length > 0) {
        for (const item of items) {
          if (!this.items[idDictionary][item.idCategory]) {
            this.items[idDictionary][item.idCategory] = [];
          }
          this.items[idDictionary][item.idCategory][item.id] = new DictionaryEntry(item);
          if (force) {
            this.setHasAll(idDictionary, item.idCategory);
          }
        }
      }
    }
  }
  has(params: { idDictionary: number, idCategory: number, id?: number }): boolean {
    if (!params.id) {
      return !!(this.items[params.idDictionary] && this.items[params.idDictionary][params.idCategory]);
    } else {
      return !!(this.items[params.idDictionary] && this.items[params.idDictionary][params.idCategory]
             && this.items[params.idDictionary][params.idCategory][params.id]);
    }
  }

  /**
   * Basic CRUD stuff here
   */
  get(params: { idDictionary: number, idCategory: number, id: number }): Promise<DictionaryEntry> {
    return new Promise<DictionaryEntry>((resolve, reject) => {
      if (this.items[params.idDictionary]
        && this.items[params.idDictionary][params.idCategory]
        && this.items[params.idDictionary][params.idCategory][params.id] ) {
        resolve(this.items[params.idDictionary][params.idCategory][params.id]);
      } else {
        this._get(this.route + params.id)
          .subscribe((item: DictionaryEntry) => {
            if (item) {
              this.set(params.idDictionary, params.idCategory, [item]);
              resolve(item);
            } else {
              reject('Invalid DictionaryEntry ' + params.id);
            }
          });
      }
    });
  }
  getAll(params: { idDictionary: number, idCategory: number, search?: number }): Promise<DictionaryEntry[]> {
    return new Promise<DictionaryEntry[]>((resolve, reject) => {
      if (this.hasAll[params.idDictionary]
        && this.hasAll[params.idDictionary][params.idCategory]) {
        resolve(this.items[params.idDictionary][params.idCategory]);
      } else {
        this._get(this.route + [params.idDictionary, params.idCategory].join('/'))
          .subscribe((items: DictionaryEntry[]) => {
            if (items.length >= 0) {
              this.set(params.idDictionary, params.idCategory, items);
              this.setHasAll(params.idDictionary, params.idCategory);
              resolve(items);
            } else {
              reject('No DictionaryEntrys');
            }
          });
      }
    });
  }
  add(params: { idDictionary: number, idCategory: number, entry: DictionaryEntry }): Promise<DictionaryEntry> {
    return new Promise<DictionaryEntry>((resolve, reject) => {
      this._post(this.route, params.entry)
        .subscribe((item: DictionaryEntry) => {
          if (item) {
            this.set(params.idDictionary, params.idCategory, [item]);
            resolve(item);
          } else {
            reject('Error on inserting entry ' + params.entry.entryTranslation);
          }
        });
    });
  }
  update(params: { idDictionary: number, idCategory: number, id: number, entry: DictionaryEntry }): Promise<DictionaryEntry> {
    return new Promise<DictionaryEntry>((resolve, reject) => {
      this._put(this.route + params.id, params.entry)
        .subscribe((item: DictionaryEntry) => {
          if (item) {
            this.set(params.idDictionary, params.idCategory, [item]);
            resolve(item);
          } else {
            reject('Error on updating entry ' + params.id);
          }
        });
    });
  }
  delete(params: { idDictionary: number, idCategory: number, id: number }): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._delete(this.route + params.id)
        .subscribe((item) => {
          if (item) {
            this.items[params.idDictionary][params.idCategory][params.id] = null;
            resolve(true);
          } else {
            reject('Error on deleting entry ' + params.id);
          }
        });
    });
  }

  saveByCategory(params: { idDictionary: number, idCategory: number, entries: EntryForm[]}): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._put(this.route + [params.idDictionary, 'updatebycategory', params.idCategory].join('/'), params.entries)
        .subscribe((items: {categories: DictionaryCategory[], entries: DictionaryEntry[]}) => {
          if (items) {
            /**
             * Because multiple categories may have been changed, the backend returns all affected categories
             */
            if (items.categories) {
              items.categories.map((category) => {
                this.setHasAll(category.idDictionary, category.id, false);
                this.api.Category.set([category], category.idDictionary);
              });
            }
            this.setHasAll(params.idDictionary, params.idCategory);
            this.set(params.idDictionary, params.idCategory, items.entries, true);
            resolve(true);
          } else {
            reject('Error on updating entry ' + params.idCategory);
          }
        });
      return true;
    });
  }
}
