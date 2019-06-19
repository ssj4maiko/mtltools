import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

import { Chapter } from '../../_models/chapter';
import { Novel } from '../../_models/novel';

@Component({
	selector: 'app-chapter-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

	chapters: Chapter[] = [];
	novel: Novel;
	idNovel: number;

	constructor(
		 private router: Router
		,private route: ActivatedRoute
		,private api: ApiService
		) { }

	ngOnInit() {
		this.idNovel = this.route.snapshot.params['idNovel'];
		this.novel = this.api.Novel(this.idNovel);

		if(!this.novel){
			this.api.getNovel(this.idNovel)
					.subscribe(res => {
						this.novel = this.api.Novel(this.idNovel);
						this.chapterList();
					}, err => {
						console.log(err);
					}
				);

		}
		else {
			this.chapterList();
		}
	}
    private chapterList(force?: boolean){
		this.api.getChapters(this.idNovel,force)
			.subscribe(res => {
				let chapters = this.api.Chapters(this.idNovel);
				if(chapters)
					this.chapters = Object.values(chapters);
				console.log(this.chapters);
			}, err => {
				console.log(err);
			});
	}

	downloadChapter() {
        alert('Needs to be fixed, use Update Chapters for now');
        /*
		this.api.getAutoChapter(this.idNovel)
            .subscribe(res => {
                this.chapterList(true);
			}, err => {
				console.log(err);
            });
            */
	}

	updateChapters() {
        alert('Press it only one time, it is working, but there will be no visible response until it\'s finished.\n'+
          'Consider Pressing F12 and switching to the Network tab, so you can see when it\'s finished');
        this.api.autoUpdateChapters(this.idNovel)
			.subscribe(res => {
				console.log(res);
                this.chapterList(true);
			}, err => {
				console.log(err);
			});
	}

}
