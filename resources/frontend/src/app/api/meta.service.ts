import { Injectable } from '@angular/core';
import { ApiService } from '.';
import { Meta } from '../_models/formField';
import { AjaxService } from './ajax.service';

@Injectable({
  providedIn: 'root'
})
export class MetaService extends AjaxService {
  route = 'meta/';
  items = [];
  api: ApiService = null;
  setApi(api: ApiService): void {
    this.api = api;
  }

  set(type: string, value: []): void {
    this.items[type] = value;
  }
  has(type: string) {
    return !!(this.items[type]);
  }

  get(...params: string[]): Promise<Meta> {
    return new Promise<Meta>((resolve, reject) => {
      this._post(this.route, { meta: params })
        .subscribe((items: Meta) => {
          resolve(items);
        });
    });
  }
}
