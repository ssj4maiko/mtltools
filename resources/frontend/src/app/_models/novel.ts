import { Optional } from '@angular/core';
import { Dictionary } from './';

export class Novel {
  public constructor(init?: any) {
    Object.assign(this, init);
  }
  id: number;
  code: string;
  nameOriginal: string;
  nameCustom: string;
  numberChapters: number;
  driver: string;
  flagR18: boolean;
  completed: boolean;
  addedBy: Date;
  show: boolean;
  @Optional() dictionary: Dictionary[];
}
