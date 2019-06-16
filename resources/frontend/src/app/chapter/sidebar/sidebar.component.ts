import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';

import { DictionaryEntry } from '../../_models/dictionaryentry';
import { DictionaryCategory } from '../../_models/dictionarycategory';
import { Dictionary } from '../../_models/dictionary';
import { ApiService } from 'src/app/api.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-chapter-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

    @Output() Sidebar2Chapter: EventEmitter<DictionaryCategory[]> = new EventEmitter<DictionaryCategory[]>();

    dictionaries: Dictionary[] = [];
    categories: DictionaryCategory[] = [];
    entriesOriginalValues: {} = {};
    categoriesOriginalValues: {} = {};
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
    ngOnDestroy(){
        delete this.dictionaries;
        delete this.categories;
        delete this.entriesOriginalValues;
        delete this.categoriesOriginalValues;
        delete this.idCategory;
        delete this.idDictionary;
        delete this.idNovel;
        delete this.dictionarySelector;
        console.log('destroy Sidebar');
    }
    dictionarySelected(idDictionary:number){
        this.idDictionary = idDictionary;
        this.getCache();
    }
    private getCache() {
        if (this.categories.length == 0){
            this.api.dictionaryCache(this.idNovel, this.idDictionary)
            .subscribe(res => {
                this.categories = [];
                this.categoriesOriginalValues = {};
                this.entriesOriginalValues = {};

                this.categories = Object.values(this.api.Categories(this.idDictionary));
                this.categories.forEach(category => {
                    this.categoriesOriginalValues[category.id] = {
                        'name'  :   category.name
                    }
                    category.entries = Object.values(this.api.Entries(category.id));
                    category.entries.forEach(entry => {
                        if(!this.entriesOriginalValues[category.id]){
                            this.entriesOriginalValues[category.id] = {};
                        }
                        this.entriesOriginalValues[category.id][entry.id] = {
                             'entryOriginal'    : ''+entry.entryOriginal
                            ,'entryTranslation' : ''+entry.entryTranslation
                            ,'description'      : ''+entry.description
                            ,'idCategory'       : ''+entry.idCategory
                        }
                    });
                });
                this.refreshTranslation();
            }, err => {
                console.log(err);
            });
        } else {
            this.refreshTranslation();
        }
    }
    changeEntry(entry){
        if(entry.id > 0){
            entry.update = entry.entryOriginal != this.entriesOriginalValues[entry.idCategory][entry.id].entryOriginal
                        || entry.entryTranslation != this.entriesOriginalValues[entry.idCategory][entry.id].entryTranslation
                        || (!!entry.description && (entry.description != this.entriesOriginalValues[entry.idCategory][entry.id].description))
                        || entry.idCategory != this.entriesOriginalValues[entry.idCategory][entry.id].idCategory
            ;
        }
    }
    changeCategory(category){
        if(category.id > 0){
            category.update = category.name != this.categoriesOriginalValues[category.id].name;
            ;
            console.log(category.update);
        }
    }
    addEntry(entries, idCategory){
        entries.push({
             'id'               :   0
            ,'entryOriginal'    :   ''
            ,'entryTranslation' :   ''
            ,'description'      :   ''
            ,'update'           :   false
            ,'idCategory'       :   idCategory
        })
    }
    addCategory(){
        this.categories.push({
             'id'           : 0
            ,'idDictionary' : this.idDictionary
            ,'name'         : ''
            ,'update'       : false
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
                if (res.changes) {
                    this.dictionaries = Object.values(this.api.Dictionaries(this.idNovel));
                    this.categories = [];
                    this.getCache();
                }
                console.log(res);
            }, err => {
                console.log(err);
            });
        console.log(this.categories);
    }

    openOutside(translate){
        let no = this.route.snapshot.params['noChapter'];
        let url = `${environment.backendServer}/static/${this.idNovel}/${this.idDictionary}/${no}/`;
        window.open(url);
    }
}
