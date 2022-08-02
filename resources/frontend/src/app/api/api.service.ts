import { Injectable } from '@angular/core';
import { NovelsService } from './novels.service';
import { ChaptersService } from './chapters.service';
import { DictionariesService } from './dictionaries.service';
import { CategoriesService } from './categories.service';
import { EntriesService } from './entries.service';
import { MetaService } from './meta.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    // private cacheService: CacheService
    public Novel: NovelsService,
    public Chapter: ChaptersService,
    public Dictionary: DictionariesService,
    public Category: CategoriesService,
    public Entry: EntriesService,
    public Meta: MetaService,
  ) {
    this.Novel.setApi(this);
    this.Chapter.setApi(this);
    this.Dictionary.setApi(this);
    this.Category.setApi(this);
    this.Entry.setApi(this);
  }
}
