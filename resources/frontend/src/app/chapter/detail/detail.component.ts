import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { DomSanitizer } from '@angular/platform-browser';

import { Chapter } from '../../_models/chapter';
import { Novel } from '../../_models/novel';
import { DictionaryCategory } from 'src/app/_models/dictionarycategory';
import { CategoryModule } from 'src/app/category';
import { count } from 'rxjs-compat/operator/count';

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

    renderedTitle: string;
    renderedText: string;
    loadingChapter: Promise<any>;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public sanitized: DomSanitizer,
		private api: ApiService
		) {
        }

	private startContent(){
		this.idNovel = this.route.snapshot.params['idNovel'];
		this.noChapter = this.route.snapshot.params['noChapter'];

		this.novel = this.api.Novel(this.idNovel);

        this.loadingChapter = new Promise((resolve,reject) => {

            if(!this.novel){
                this.api.getNovel(this.idNovel)
                .subscribe(res => {
                    this.novel = this.api.Novel(this.idNovel);
                    this.getChapter(resolve, reject);
                }, err => {
                    console.log(err);
                    reject();
                });

            }
            else if(!this.chapter || this.chapter.textOriginal) {
                this.getChapter(resolve, reject);
            }
            else {
                this.chapter = this.api.Chapter(this.idNovel, this.noChapter);
                this.renderDataView();
                resolve();
            }
        });
        this.api.getChapters(this.idNovel)
            .subscribe(res => {
                this.chapterPrevious = this.api.Chapter(this.idNovel, (+this.noChapter) - 1)
                this.chapterNext = this.api.Chapter(this.idNovel, (+this.noChapter) + 1)
            }, err => {
                console.log(err);
            }
        );
    }
    renderDataView(){
        this.renderedTitle = this.chapter.title;
        this.renderedText = !!this.chapter.textRevised ? this.chapter.textRevised : this.chapter.textOriginal;
    }
	ngOnInit() {
        console.log('onInit');
		this.startContent();
	}
	ngDoCheck(){
		if(this.noChapter != this.route.snapshot.params['noChapter'])
			this.startContent();
    }
    translateText(categories: DictionaryCategory[]) {
        // In case the dictionary comes first, then let it wait for the chapter
        this.loadingChapter.then(_ => {
            this.renderDataView();
            if (categories.length > 0){
                let entries = [];
                categories.forEach(category => {
                    category.entries.forEach(entry => {
                        let length = entry.entryOriginal.length;
                        if (!entries[length])
                            entries[length] = [];
                            entries[length].push({
                            'entryOriginal': entry.entryOriginal,
                            'entryTranslation': entry.entryTranslation,
                            'idEntry': entry.id,
                            'idCategory': category.id,
                            'category': category.name,
                        });
                    });
                });
                for(let i = entries.length; i>0; --i){
                    if (entries[i]){
                        entries[i].forEach(entry => {
                            //console.log('Change ', entry.entryOriginal, entry.entryTranslation);
                            let regex = new RegExp(entry.entryOriginal, 'g');
                            this.renderedTitle = this.renderedTitle.replace(regex, '\[\['+entry.entryTranslation+'\]\]');
                            this.renderedText = this.renderedText.replace(regex, '\[\['+entry.entryTranslation+'\]\]');
                        });
                    }
                }
                // The extra characters are to allow to create a space in between translated words
                let regex = new RegExp("\\]\\]\\[\\[", 'g');
                this.renderedTitle = this.renderedTitle.replace(regex, ' ');
                this.renderedText = this.renderedText.replace(regex, ' ');
                regex = new RegExp('\\]\\]', 'g');
                this.renderedTitle = this.renderedTitle.replace(regex, '');
                this.renderedText = this.renderedText.replace(regex, '');
                regex = new RegExp('\\[\\[', 'g');
                this.renderedTitle = this.renderedTitle.replace(regex, '');
                this.renderedText = this.renderedText.replace(regex, '');
            }
        });

    }
    private getChapter(resolve, reject){
		this.api.getChapter(this.idNovel, this.noChapter)
			.subscribe(res => {
                this.chapter = this.api.Chapter(this.idNovel, this.noChapter);
                this.renderDataView();
                resolve();
			}, err => {
                console.log(err);
                reject();
			});
	}

}
