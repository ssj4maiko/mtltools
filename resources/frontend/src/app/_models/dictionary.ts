import { Optional } from '@angular/core';
import { Novel } from './';
import { DictionaryCategory } from './dictionarycategory';
import { DictionaryEntry } from './dictionaryentry';

export class Dictionary {
  public constructor(init?: any) {
    Object.assign(this, init);
  }
  id: number;
  name: string;
  language: string;
  dateCreated: Date;
  dateRevision: Date;
  @Optional() changes: boolean; // Use on FullSave, to learn if there is a need to get a new cache
  @Optional() novel: Novel[];
  // tslint:disable-next-line: variable-name
  @Optional() count_categories: [{count: number}];

  countCategories(): number {
    if (this.count_categories[0]) {
      return this.count_categories[0].count;
    }
    return 0;
  }
}

export class CacheDictionary {
  dateCreated: Date;
  dateRevision: Date;
  id: number;
  name: string;
  language: string;
  // tslint:disable-next-line: variable-name
  dictionary_category: DictionaryCategory[];
  // tslint:disable-next-line: variable-name
  dictionary_entry: DictionaryEntry[];
}

export class returnFullSave {
  changes: boolean
  dateRevision: Date
}