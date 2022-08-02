import { Injectable } from '@angular/core';
import { Novel } from '../_models/novel';
import { AjaxService } from './ajax.service';
import { ApiService } from '.';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NovelsService extends AjaxService {
  route = 'novel/';
  items: Novel[] = [];
  hasAll = false;
  hasAllDictionaries = [];
  pivots = []; // pivots[idDictionary] = idNovel[]

  api: ApiService = null;
  setApi(api: ApiService): void {
    this.api = api;
  }
  set(items: Novel[], idDictionary?: number): void {
    // Because there may be updates on a Novel, and the rule above, everytime idNovel is being sent
    // I will erase the pivots so that they are done again, releasing the atached dictionaries too
    if (idDictionary) {
      this.pivots[idDictionary] = [];
    }
    for (const item of items) {
      if (typeof item.dictionary !== 'undefined') {
        this.api.Dictionary.set(item.dictionary, item.id);
        delete(item.dictionary);
      }
      this.items[item.id] = item;
      if (idDictionary) {
        this.pivots[idDictionary].push(item.id);
      }
    }
    // As mentioned on the first comment, this way, if getAll by Novel is used, it just gets from cache
    if (idDictionary) {
      this.hasAllDictionaries[idDictionary] = true;
    }
  }
  has(params: { id: number }): boolean {
    return !!(this.items[params.id]);
  }

  /**
   * Basic CRUD stuff here
   */
  get(params: {id: number} ): Promise<Novel> {
    return new Promise<Novel>((resolve, reject) => {
      if (this.items[params.id]) {
        resolve(this.items[params.id]);
      } else {
        this._get(this.route + params.id)
          .subscribe((item: Novel) => {
            if (item) {
              this.set([item]);
              resolve(item);
            } else {
              reject('Invalid Novel ' + params.id);
            }
          });
      }
    });
  }
  getAll(params?: { idDictionary?: number, search?: string } ): Promise<Novel[]> {
    return new Promise<Novel[]>((resolve, reject) => {
      // If we are looking only for all Dictionaries on one Novel, we don't need all
      const idDictionary = params && params.idDictionary ? params.idDictionary : null;
      if (idDictionary && this.hasAllDictionaries[idDictionary]) {
        resolve(this.getNovelPivots(idDictionary));
      } else
      if (this.hasAll && !idDictionary) {
        resolve(this.items);
      } else {
        this._get(this.route + (idDictionary ? 'dictionary/' + idDictionary : ''))
          .subscribe((items: Novel[]) => {
            this.set(items, idDictionary);
              // Here we also set the different paths
            if (!idDictionary) {
              this.hasAll = true;
              resolve(this.items);
            } else {
              resolve(this.getNovelPivots(idDictionary));
            }
          });
      }
    });
  }
  add(params: { values: { novel: Novel, dictionaries?: number[] } } ): Promise<Novel> {
    return new Promise<Novel>((resolve, reject) => {
      this._post(this.route, params.values)
        .subscribe((item: Novel) => {
          if (item) {
            this.set([item]);
            resolve(item);
          } else {
            reject('Error on inserting novel ' + params.values);
          }
        });
    });
  }
  update(params: { id: number, values: {novel: Novel, dictionaries?: number[]}} ): Promise<Novel> {
    return new Promise<Novel>((resolve, reject) => {
      this._put(this.route + params.id, params.values)
        .subscribe((item: Novel) => {
          if (item) {
            this.set([item]);
            resolve(item);
          } else {
            reject('Error on updating novel ' + params.id);
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
            reject('Error on deleting novel ' + params.id);
          }
        });
    });
  }

  getNovelPivots(idDictionary: number): Novel[] {
    if (!this.pivots[idDictionary]) {
      return [];
    } else {
      const arr = [];
      for (const idNov of this.pivots[idDictionary]) {
        arr.push(this.items[idNov]);
      }
      return arr;
    }
  }
}
