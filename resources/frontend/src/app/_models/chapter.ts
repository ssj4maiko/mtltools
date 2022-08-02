export class Chapter {
  public constructor(init?: any) {
    Object.assign(this, init);
  }
  no: number;
  idNovel: number;
  title: string;
  hasText: boolean;
  textOriginal: string;
  textRevision: string;
  textCustom: string;
  dateOriginalPost: Date;
  dateOriginalRevision: Date;
  dateCreated: Date;
  dateRevision: Date;
}
