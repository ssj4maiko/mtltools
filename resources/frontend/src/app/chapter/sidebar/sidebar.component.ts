import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';

import { DictionaryEntry } from '../../_models/dictionaryentry';
import { DictionaryCategory } from '../../_models/dictionarycategory';
import { Dictionary } from '../../_models/dictionary';
import { ApiService } from 'src/app/api.service';

@Component({
	selector: 'app-chapter-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    @Output() Sidebar2Chapter: EventEmitter<DictionaryCategory[]> = new EventEmitter<DictionaryCategory[]>();

    dictionaries: Dictionary[] = [];
    categories: DictionaryCategory[] = [];
    idCategory: number;
    idDictionary: number;
    idNovel: number;

    dictionarySelector:any = '';

	constructor(
        private api: ApiService
        , private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.idNovel = this.route.snapshot.params['idNovel'];
        this.dictionaries = Object.values(this.api.Dictionaries(this.idNovel));

        if(this.dictionaries.length == 0){
            this.api.getDictionaries(this.idNovel)
                .subscribe(res => {
                    let dictionaries = this.api.Dictionaries(this.idNovel);
                    if (dictionaries)
                        this.dictionaries = Object.values(dictionaries);

                    this.dictionarySelector = this.dictionaries[0].id;
                    this.dictionarySelected(this.dictionarySelector);
                }, err => {
                    console.log(err);
                });
        } else {
            this.dictionarySelector = this.dictionaries[0].id;
            this.dictionarySelected(this.dictionarySelector);
        }
    }
    dictionarySelected(idDictionary:number){
        this.idDictionary = idDictionary;
        this.getChache();
    }
    private getChache() {
        if (this.categories.length == 0){
            this.api.dictionaryCache(this.idNovel, this.idDictionary)
            .subscribe(res => {
                this.categories = Object.values(this.api.Categories(this.idDictionary));
                this.categories.forEach(category => {
                    category.entries = Object.values(this.api.Entries(category.id));
                });
                this.refreshTranslation();
            }, err => {
                console.log(err);
            });
        } else {
            this.refreshTranslation();
        }
    }
    private addEntry(entries, idCategory){
        entries.push({
             'id'               :   ''
            ,'entryOriginal'    :   ''
            ,'entryTranslation' :   ''
            ,'description'      :   ''
            ,'update'           :   0
            ,'idCategory'       : idCategory
        })
    }
    private addCategory(){
        this.categories.push({
             'id'           : 0
            ,'idDictionary' : this.idDictionary
            ,'name'         : ''
            ,'entries'      : []
        });
    }
    refreshTranslation(){
        this.Sidebar2Chapter.emit(this.categories);
    }
    refreshOriginal(){
        this.Sidebar2Chapter.emit([]);
    }
    saveModifications(){
        this.api.saveFullDictionary(this.idNovel, this.idDictionary, this.categories)
            .subscribe(res => {
                console.log(res);
            }, err => {
                console.log(err);
            });
        console.log(this.categories);
    }

}
