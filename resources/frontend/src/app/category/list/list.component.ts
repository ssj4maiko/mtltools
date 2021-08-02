import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api';

import { DictionaryCategory } from '../../_models/dictionarycategory';
import { Dictionary } from '../../_models/dictionary';
import { Novel } from '../../_models/novel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  categories: DictionaryCategory[] = [];
  dictionary: Dictionary;
  idDictionary: number;
  idNovel: number;

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private api: ApiService
    ) { }

  ngOnInit() {
    this.loadList();
  }
  loadList() {
    this.idNovel = this.route.snapshot.params.idNovel;
    this.idDictionary = this.route.snapshot.params.idDictionary;
    Promise.all([
      this.api.Dictionary.get({ id: this.idDictionary }),
      this.api.Category.getAll({ idDictionary: this.idDictionary }),
    ]).then((values: [Dictionary, DictionaryCategory[]]) => {
      this.dictionary = values[0];
      this.categories = Object.values(values[1]);
    });
  }
  rebuildCache() {
    this.api.Dictionary.rebuildCache(this.idDictionary)
        .then(res => {
          alert(res);
        }, err => {
          console.log(err);
        });
  }
  LINK(idCategory?: number, action?: string) {
    const base = [];
    if (this.idNovel) {
      base.push('novel');
      base.push(this.idNovel);
    }
    base.push('dictionary');
    base.push(this.idDictionary);
    if (action) {
      base.push(action);
    }
    if (idCategory) {
      base.push(idCategory);
    }
    console.log(base);
    this.router.navigate(base);
  }
  delete(idCategory: number) {
    if (confirm('Are you sure?')) {
      this.api.Category.delete({ idDictionary: this.idDictionary, id: idCategory })
        .then((_) => {
          // this.novels = [novels];
          this.loadList();
        }, (error) => {
          console.log(error);
        });
    }
    return true;
  }

}
