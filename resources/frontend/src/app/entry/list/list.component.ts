import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

import { DictionaryEntry } from '../../_models/dictionaryentry';
import { DictionaryCategory } from '../../_models/dictionarycategory';
import { Dictionary } from '../../_models/dictionary';
import { Novel } from '../../_models/novel';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	entries: DictionaryEntry[] = [];
	novel: Novel;
	dictionary: Dictionary;
	category: DictionaryCategory;
	idCategory: number;
	idDictionary: number;
	idNovel: number;

	constructor(
		 private router: Router
		,private route: ActivatedRoute
		,private api: ApiService
		) { }

	ngOnInit() {
		this.idNovel = this.route.snapshot.params['idNovel'];
		this.idDictionary = this.route.snapshot.params['idDictionary'];
		this.idCategory = this.route.snapshot.params['idCategory'];
		this.novel = this.api.Novel(this.idNovel);
		this.dictionary = this.api.Dictionary(this.idNovel,this.idDictionary);
		this.category = this.api.Category(this.idDictionary,this.idCategory);

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
		if(!this.dictionary) {
			this.api.getDictionaries(this.idNovel)
				.subscribe(res => {
					this.dictionary = this.api.Dictionary(this.idNovel,this.idDictionary);
					this.categoryList();
				}, err => {
					console.log(err);
				});
		} else {
			this.categoryList();
		}
	}
	private categoryList(){
		if(!this.category) {
			this.api.getCategories(this.idDictionary)
				.subscribe(res => {
					this.category = this.api.Category(this.idDictionary,this.idCategory);
					this.EntryList();
				}, err => {
					console.log(err);
				});
		} else {
			this.EntryList();
		}
	}
	private EntryList(){
		this.api.getEntries(this.idCategory)
			.subscribe(res => {
				this.entries = Object.values(this.api.Entries(this.idCategory));
			}, err => {
				console.log(err);
			});
	}

}
