import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { DomSanitizer } from '@angular/platform-browser';

import { Chapter } from '../../_models/chapter';
import { Novel } from '../../_models/novel';

@Component({
	selector: 'app-chapter-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

	chapter: Chapter;
	novel: Novel;
	idNovel: number;
	noChapter: number;

	chapterPrevious: Chapter;
	chapterNext: Chapter;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public sanitized: DomSanitizer,
		private api: ApiService
		) { }

	private startContent(){
		this.idNovel = this.route.snapshot.params['idNovel'];
		this.noChapter = this.route.snapshot.params['noChapter'];

		this.novel = this.api.Novel(this.idNovel);
		this.api.getChapters(this.idNovel)
				.subscribe(res => {
						this.chapterPrevious = this.api.Chapter(this.idNovel, (+this.noChapter)-1)
						this.chapterNext = this.api.Chapter(this.idNovel, (+this.noChapter)+1)
						console.log(this.chapterPrevious);
						console.log(this.chapterNext);
						console.log(this.api.Chapters(this.idNovel));
					}, err => {
						console.log(err);
					}
				);

		if(!this.novel){
			this.api.getNovel(this.idNovel)
					.subscribe(res => {
						this.novel = this.api.Novel(this.idNovel);
						this.getChapter();
					}, err => {
						console.log(err);
					}
				);

		}
		else if(!this.chapter || this.chapter.textOriginal) {
			this.getChapter();
		}
		else {
			this.chapter = this.api.Chapter(this.idNovel, this.noChapter);
		}
	}
	ngOnInit() {
        console.log('onInit');
		this.startContent();
	}
	ngDoCheck(){
		if(this.noChapter != this.route.snapshot.params['noChapter'])
			this.startContent();
	}
	/*
	ngAfterContentInit(){
		console.log('ngAfterContentInit');
	}
	ngAfterContentChecked(){
		console.log('ngAfterContentChecked');
	}
	ngAfterViewInit(){
		console.log('ngAfterViewInit');
	}
	ngAfterViewChecked(){
		console.log('ngAfterViewChecked');
	}
	ngOnChanges(){
		console.log('ngOnChanges');
	}
	ngOnDestroy(){
		console.log('ngOnDestroy');
	}
	*/
	private getChapter(){
		this.api.getChapter(this.idNovel, this.noChapter)
			.subscribe(res => {
				this.chapter = this.api.Chapter(this.idNovel, this.noChapter);
			}, err => {
				console.log(err);
			});
	}

}
