import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

import { Chapter } from '../../_models/chapter';
import { Novel } from '../../_models/novel';
import { environment } from 'src/environments/environment';
import { Dictionary } from 'src/app/_models/dictionary';

@Component({
	selector: 'app-chapter-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

	chapters: Chapter[] = [];
	dictionaries: Dictionary[] = [];
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
        this.dictionaries = Object.values(this.api.Dictionaries(this.idNovel));
        this.chapters = Object.values(this.api.Chapters(this.idNovel));

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
        if(!this.chapters.length){

            this.api.getChapters(this.idNovel,force)
			.subscribe(res => {
                let chapters = this.api.Chapters(this.idNovel);
				if(chapters)
                this.chapters = Object.values(chapters);

                this.dictionaryList();
			}, err => {
                console.log(err);
			});
        } else {
            this.dictionaryList();
        }
    }
    private dictionaryList() {
        this.api.getDictionaries(this.idNovel)
            .subscribe(res => {
                let dictionaries = this.api.Dictionaries(this.idNovel);
                if (dictionaries)
                    this.dictionaries = Object.values(dictionaries);
                console.log(this.dictionaries);
            }, err => {
                console.log(err);
            });
    }

    openGT(chapter: Chapter, dictionary: Dictionary){
        let url = `${environment.backendServer}/static/${this.idNovel}/${dictionary.id}/${chapter.no}/1`;
            url = 'https://translate.google.com/translate?sl=auto&tl=en&u=' + url;
        window.open(url);
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
