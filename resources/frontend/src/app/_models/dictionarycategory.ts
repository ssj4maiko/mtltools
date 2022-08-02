import { DictionaryEntry, EntryForm } from './dictionaryentry';

export class DictionaryCategory {
  public constructor(init?: any, idDictionary?: number) {
    if (init) {
      Object.assign(this, init);
    }
    if (idDictionary) {
      this.idDictionary = idDictionary;
    }
  }
  id: number;
  idDictionary: number;
  name: string;
  entries: (DictionaryEntry | EntryForm)[];
  update: boolean;
}
