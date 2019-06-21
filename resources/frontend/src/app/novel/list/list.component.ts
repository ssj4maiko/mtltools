import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CacheService } from '../../cache.service';

import { Observable } from 'rxjs/Observable';
import { Novel } from '../../_models/novel';

@Component({
	selector: 'app-novel-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
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
            }
        );
	}

    autoUpdate(id:number){
        this.api.updateIndexNovel(id)
            .subscribe(_ => {
                // Always take from the updated api.Novels()
                this.novels = Object.values(this.api.Novels());
                console.log(this.novels);
            }, err => {
                console.log(err);
            }
        );
    }
    updateChapters(id: number) {
        alert('Press it only one time, it is working, but there will be no visible response until it\'s finished.\n' +
            'Consider Pressing F12 and switching to the Network tab, so you can see when it\'s finished');
        this.api.autoUpdateChapters(id)
            .subscribe(res => {
                console.log('Novel updated');
            }, err => {
                console.log(err);
            });
    }
}
