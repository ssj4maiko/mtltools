import { Injectable } from '@angular/core';
import { ApiService } from '.';
import { CacheDictionary, Dictionary, DictionaryCategory, returnFullSave } from '../_models';
import { AjaxService } from './ajax.service';

@Injectable({
  providedIn: 'root'
})
export class DictionariesService extends AjaxService {
  route = 'dictionary/';
  items: Dictionary[] = [];
  hasAll = false;
  hasAllNovels = [];
  pivots = []; // pivots[idNovel] = idDictionary[]

  api: ApiService = null;
  hasCache: boolean[] = [];

  setApi(api: ApiService): void {
    this.api = api;
  }
  set(items: Dictionary[], idNovel?: number): void {
    // If idNovel is being sent, I'm considering that it's sending all Dictionaries from one novel
    // Because there may be updates on a Novel, and the rule above, everytime idNovel is being sent
    // I will erase the pivots so that they are done again, releasing the detached dictionaries too
    if (idNovel) {
      this.pivots[idNovel] = [];
    }
    for (const item of items) {
      if (typeof item.novel !== 'undefined') {
        this.api.Novel.set(item.novel, item.id);
        delete (item.novel);
      }
      this.items[item.id] = new Dictionary(item);
      if (idNovel) {
        this.pivots[idNovel].push(item.id);
      }
    }
    // As mentioned on the first comment, this way, if getAll by Novel is used, it just gets from cache
    if (idNovel) {
      this.hasAllNovels[idNovel] = true;
    }
  }
  has(params: { id: number }): boolean {
    return !!(this.items[params.id]);
  }

  /**
   * Basic CRUD stuff here
   */
  get(params: { id?: number } ): Promise<Dictionary> {
    if (params.id) {
      return new Promise<Dictionary>((resolve, reject) => {
        if (this.items[params.id]) {
          resolve(this.items[params.id]);
        } else {
          this._get(this.route + params.id)
            .subscribe((item: Dictionary) => {
              if (item) {
                this.set([item]);
                resolve(item);
              } else {
                reject('Invalid Dictionary ' + params.id);
              }
            });
        }
      });
    }
  }
  getAll(params?: { idNovel?: number, search?: number } ): Promise<Dictionary[]> {
    return new Promise<Dictionary[]>((resolve, reject) => {
      // If we are looking only for all Dictionaries on one Novel, we don't need all
      const idNovel = params && params.idNovel ? params.idNovel : null;
      if (idNovel && this.hasAllNovels[idNovel]) {
        resolve(this.getDictionaryPivots(idNovel));
      } else
      // If we are looking only for all Dictionaries, we do it here
      if (this.hasAll && !idNovel) {
        resolve(this.items);
      } else {
        this._get(this.route + (idNovel ? 'novel/' + idNovel : ''))
          .subscribe((items: Dictionary[]) => {
            if (items.length > 0) {
              this.set(items, idNovel);
              // Here we also set the different paths
              if (!idNovel) {
                this.hasAll = true;
                resolve(this.items);
              } else {
                resolve(this.getDictionaryPivots(idNovel));
              }
            } else {
              reject('No Dictionaries');
            }
          });
      }
    });
  }
  add(params: { values: { dictionary: Dictionary, novels?: number[] } } ): Promise<Dictionary> {
    return new Promise<Dictionary>((resolve, reject) => {
      this._post(this.route, params.values)
        .subscribe((item: Dictionary) => {
          if (item) {
            this.set([item]);
            resolve(item);
          } else {
            reject('Error on inserting dictionary ' + params.values);
          }
        });
    });
  }
  update(params: { id: number, values: { dictionary: Dictionary, novels?: number[] } }): Promise<Dictionary> {
    return new Promise<Dictionary>((resolve, reject) => {
      this._put(this.route + params.id, params.values)
        .subscribe((item: Dictionary) => {
          if (item) {
            this.set([item]);
            resolve(item);
          } else {
            reject('Error on updating dictionary ' + params.id);
          }
        });
    });
  }
  delete(params: { id: number }): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._delete(this.route + params.id)
        .subscribe((item) => {
          if (item) {
            delete this.items[params.id];
            resolve(true);
          } else {
            reject('Error on deleting dictionary ' + params.id);
          }
        });
    });
  }

  getDictionaryPivots(idNovel: number): Dictionary[] {
    if (!this.pivots[idNovel]) {
      return [];
    } else {
      const arr = [];
      for (const idDic of this.pivots[idNovel]) {
        arr.push(this.items[idDic]);
      }
      return arr;
    }
  }
  getCache(idDictionary: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.hasCache[idDictionary]) {
        resolve (true);
      } else {
        this._get('cache/dictionary/' + idDictionary)
          .subscribe((cache: CacheDictionary) => {
            this.hasCache[idDictionary] = true;
            this.reworkCache(cache);
            resolve(true);
          });
      }
    });
  }
  rebuildCache(idDictionary: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._put('cache/dictionary/' + idDictionary)
        .subscribe((cache: CacheDictionary) => {
          this.hasCache[idDictionary] = true;
          this.reworkCache(cache);
          resolve(true);
        });
    });
  }
  reworkCache(cache: CacheDictionary): void {
    if (cache.dictionary_category) {
      this.api.Category.set(cache.dictionary_category, cache.id, true);
    }
    if (cache.dictionary_entry.length >= 0) {
      this.api.Entry.set(cache.id, null, cache.dictionary_entry, true);
    }
  }
  fullSave(idDictionary: number, categories: DictionaryCategory[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._put('dictionary/fullSave/' + idDictionary, categories)
        .subscribe((returnFS: returnFullSave) => {
          if (returnFS.changes) {
            this.hasCache[idDictionary] = false;
            console.log('full Save Dictionary.Service', this.items[idDictionary]);
            this.items[idDictionary].dateRevision = returnFS.dateRevision;
          }
          resolve(true);
        });
    });
  }
}
