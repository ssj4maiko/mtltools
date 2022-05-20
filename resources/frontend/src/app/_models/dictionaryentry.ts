export class DictionaryEntry {
  public constructor(init?: any) {
    Object.assign(this, init);
  }
  id: number;
  idCategory: number;
  entryOriginal: string;
  entryTranslation: string;
  description: string;
  sufix: number;
  prefix: number;
  simplified: string;
  length: number;

  category?: string;
  index?: [number, number];
}
export class EntryForm {
  public constructor(init?: DictionaryEntry | EntryForm, idCategory?: number) {
    this.sufix = null;
    this.prefix = null;
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
  sufix: number;
  prefix: number;
  update: boolean;
  delete: boolean;
  reset: boolean;
}
