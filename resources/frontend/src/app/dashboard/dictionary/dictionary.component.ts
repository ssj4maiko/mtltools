import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api';

import { Dictionary } from '../../_models/dictionary';
import { Novel } from '../../_models/novel';


@Component({
  selector: 'app-dashboard-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {

  dictionaries: Dictionary[] = [];

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private api: ApiService
  ) { }

  ngOnInit() {
    this.dictionaryList();
  }
  private dictionaryList() {
    this.api.Dictionary.getAll()
      .then(dictionaries => {
        if (dictionaries) {
          this.dictionaries = Object.values(dictionaries);
        }
      }, err => {
        console.log(err);
      });
  }

}
