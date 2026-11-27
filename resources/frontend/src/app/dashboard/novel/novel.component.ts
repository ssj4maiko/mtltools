import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../../api';
import { CacheService } from '../../cache.service';

import { Observable } from 'rxjs';
import { Novel } from '../../_models/novel';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateJobsService } from '../../_services/update-jobs.service';
import { ListComponent } from 'src/app/novel/list/list.component';

@Component({
    selector: 'app-dashboard-novel',
    templateUrl: './novel.component.html',
    styleUrls: ['../../novel/list/list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NovelComponent extends ListComponent {
  constructor(
    api: ApiService,
    jobs: UpdateJobsService,
    router: Router,
    route: ActivatedRoute,
  ) {
    super(api, jobs, router, route);
    // The dashboard also holds a dictionary list: keep this mini table's sorting local, out of the URL.
    this.sortInUrl = false;
  }
}
