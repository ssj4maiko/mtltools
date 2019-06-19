import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

import { Dictionary } from '../../_models/dictionary';
import { Novel } from '../../_models/novel';

@Component({
	selector: 'app-dictionary-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

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

		if(!this.novel){
			this.api.getNovel(this.idNovel)
					.subscribe(res => {
						this.novel = this.api.Novel(this.idNovel);
						this.dictionaryList();
					}, err => {
						console.log(err);
					}
				);

		}
		else {
			this.dictionaryList();
		}
	}
	private dictionaryList(){
		this.api.getDictionaries(this.idNovel)
			.subscribe(res => {
				let dictionaries = this.api.Dictionaries(this.idNovel);
				if(dictionaries)
					this.dictionaries = Object.values(dictionaries);
				console.log(this.dictionaries);
			}, err => {
				console.log(err);
			});
	}

}
