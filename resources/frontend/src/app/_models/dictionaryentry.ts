export class DictionaryEntry {
  public constructor(init?: any) {
    Object.assign(this, init);
  }
  id: number;
  idCategory: number;
  entryOriginal: string;
  entryTranslation: string;
  description: string;
  length: number;
}
export class EntryForm {
  public constructor(init?: DictionaryEntry | EntryForm, idCategory?: number) {
    if (init) {
      Object.assign(this, init);
    }
    if (idCategory) {
      this.idCategory = idCategory;
    }
  }
  id: number;
  idCategory: number;
  entryOriginal: string;
  entryTranslation: string;
  description: string;
  update: boolean;
  delete: boolean;
  reset: boolean;
}
