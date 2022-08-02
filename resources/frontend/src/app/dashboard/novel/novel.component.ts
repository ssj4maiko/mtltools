import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api';
import { CacheService } from '../../cache.service';

import { Observable } from 'rxjs/Observable';
import { Novel } from '../../_models/novel';
import { ListComponent } from 'src/app/novel/list/list.component';

@Component({
  selector: 'app-dashboard-novel',
  templateUrl: './novel.component.html',
  styleUrls: ['../../novel/list/list.component.scss']
})
export class NovelComponent extends ListComponent {
  constructor(
    api: ApiService
  ) {
    super(api);
  }
}
