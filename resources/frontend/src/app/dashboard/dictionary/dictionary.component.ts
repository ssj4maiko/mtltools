import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListComponent } from 'src/app/dictionary/list/list.component';
import { ApiService } from '../../api';

import { Dictionary } from '../../_models/dictionary';
import { Novel } from '../../_models/novel';


@Component({
  selector: 'app-dashboard-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['../../dictionary/list/list.component.scss']
})
export class DictionaryComponent extends ListComponent {

  dictionaries: Dictionary[] = [];

  constructor(
      router: Router
    , route: ActivatedRoute
    , api: ApiService
  ) {
    super(router,route,api);
  }
}
