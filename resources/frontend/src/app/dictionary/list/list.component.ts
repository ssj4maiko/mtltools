import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api';

import { Dictionary } from '../../_models/dictionary';

@Component({
  selector: 'app-dictionary-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dictionaries: Dictionary[] = [];
  idNovel: number = null;

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
    this.api.Dictionary.getAll({idNovel: this.idNovel})
      .then((dictionaries) => {
        // this.novels = [novels];
        this.dictionaries = Object.values(dictionaries);
      }, (error) => {
        console.log(error);
      });
  }
  LINK(idDictionary?: number, action?: string) {
    const base = [];
    if (this.idNovel) {
      base.push('novel');
      base.push(this.idNovel);
    }
    base.push('dictionary');
    if (action) {
      base.push(action);
    }
    if (idDictionary) {
      base.push(idDictionary);
    }
    console.log(base);
    this.router.navigate(base);
  }
  delete(idDictionary: number) {
    if (confirm('Are you sure?')) {
      this.api.Dictionary.delete({ id: idDictionary })
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
