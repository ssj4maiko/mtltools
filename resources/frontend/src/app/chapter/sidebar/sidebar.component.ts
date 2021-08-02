import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';

import { DictionaryEntry, EntryForm } from '../../_models/dictionaryentry';
import { DictionaryCategory } from '../../_models/dictionarycategory';
import { Dictionary } from '../../_models/dictionary';
import { ApiService } from 'src/app/api';
import { environment } from 'src/environments/environment';
import { Novel } from 'src/app/_models/novel';
import { CacheService } from '../cache.service';
import { DetailComponent } from '../detail/detail.component';
import { FormService } from '../form.service';

@Component({
  selector: 'app-chapter-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends FormService implements OnInit, OnDestroy {

  @Output() Sidebar2Chapter: EventEmitter<DictionaryCategory[]> = new EventEmitter<DictionaryCategory[]>();

  dictionaries: Dictionary[] = [];
  categories: DictionaryCategory[] = [];

  idCategory: number;
  idDictionary: number;
  idNovel: number;
  novel: Novel;

  dictionarySelector: any = '';

  constructor(
      public api: ApiService
    , private route: ActivatedRoute
  ) {
    super(api);
  }

  ngOnInit() {
    this.idNovel = this.route.snapshot.params.idNovel;

    this.api.Dictionary.getAll({idNovel: this.idNovel})
      .then((dictionaries: Dictionary[]) => {
        this.dictionaries = dictionaries;
        this.dictionarySelector = dictionaries[0].id;
        this.dictionarySelected(this.dictionarySelector);
      });
  }
  ngOnDestroy() {
    delete this.dictionaries;
    delete this.categories;
    delete this.categoriesOriginalValues;
    delete this.idCategory;
    delete this.idDictionary;
    delete this.idNovel;
    delete this.dictionarySelector;
    console.log('destroy Sidebar');
  }
  dictionarySelected(idDictionary: number) {
    this.idDictionary = idDictionary;
    this.getCache();
  }
  private getCache() {
    if (this.categories.length === 0) {
      this.api.Dictionary.getCache(this.idDictionary)
        .then((status) => {
          this.PrepareCacheThenTranslate(status);
        });
    } else {
      this.refreshTranslation();
    }
  }
  private PrepareCacheThenTranslate(status) {
    if (status) {
      const loadedDictionary = new Promise<void>((resolveDic, rejectDic) => {
        this.rebuildCache(resolveDic);
      });

      loadedDictionary.then(_ => {
        this.refreshTranslation();
      });
    }
  }

  refreshTranslation() {
    this.Sidebar2Chapter.emit(this.categories);
  }
  refreshOriginal() {
    this.Sidebar2Chapter.emit([]);
  }
  saveModifications() {
    /*
      this.api.saveFullDictionary(this.idDictionary, this.categories)
        .subscribe(res => {
          if (res.changes) {
            this.dictionaries = Object.values(this.api.Dictionaries());
            this.categories = [];
            this.getCache();
          }
          console.log(res);
        }, err => {
          console.log(err);
        });
      console.log(this.categories);
    */
  }

  openOutside(translate) {
    const no = this.route.snapshot.params.noChapter;
    let url = `${environment.backendServer}/static/${this.idNovel}/${this.idDictionary}/${no}/`;
    if (translate) {
      url = 'https://translate.google.com/translate?sl=auto&tl=en&u=' + url;
    }
    window.open(url);
  }
}
