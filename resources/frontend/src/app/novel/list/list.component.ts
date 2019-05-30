import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CacheService } from '../../cache.service';

import { Observable } from 'rxjs/Observable';
import { Novel } from '../../_models/novel';

@Component({
	selector: 'app-novel-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	novels: Novel[] = [];

	constructor(
		private api: ApiService,
		private cacheService: CacheService
	) {}

	ngOnInit() {
		// Get list of novels
		this.api.getNovels()
			.subscribe(_ => {
				// Always take from the updated api.Novels()
				this.novels = Object.values(this.api.Novels());
				console.log(this.novels);
			}, err => {
				console.log(err);
			});
	}

}
