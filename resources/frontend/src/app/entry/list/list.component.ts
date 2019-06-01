import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { DictionaryEntry } from '../../_models/dictionaryentry';
import { DictionaryCategory } from '../../_models/dictionarycategory';
import { Dictionary } from '../../_models/dictionary';
import { Novel } from '../../_models/novel';

@Component({
    selector: 'app-list',
    host: {
        '(blur)': 'onBlur($event)'
    },
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

	entries: DictionaryEntry[] = [];
	novel: Novel;
	dictionary: Dictionary;
	category: DictionaryCategory;
	idCategory: number;
	idDictionary: number;
    idNovel: number;

    entries2Save: DictionaryEntry[];


	entryForm: FormGroup;
    entryArray: FormArray;

	constructor(
		 private router: Router
		,private route: ActivatedRoute
		,private api: ApiService
		,private formBuilder: FormBuilder
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

		this.entryForm = this.formBuilder.group({
			idCategory	: '',
			entries		: this.formBuilder.array([this.createItem()])
        });
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
					this.entryList();
				}, err => {
					console.log(err);
				});
		} else {
			this.entryList();
		}
	}
	private entryList(){
		this.api.getEntries(this.idCategory)
			.subscribe(res => {
				this.entries = Object.values(this.api.Entries(this.idCategory));
                this.fillForm();
			}, err => {
				console.log(err);
			});
	}

    createItem(): FormGroup {
        let tmpField = this.formBuilder.group({
            id: '',
            original: '',
            translation: '',
            description: '',
            update: '',
            delete: '',
            reset: '',
        });
        //Sets up the triggers for Insert verification.
        if (this.entryArray)
            this.onChanges(tmpField, this.entryArray.length);
        return tmpField;
    }
    addItem(): void {
        this.entryArray = this.entryForm.get('entries') as FormArray;
        let tmpField = this.createItem();
        //this.onChanges(tmpField);
        this.entryArray.push(tmpField);
    }
    private fillForm(): void{
        this.entryForm.patchValue({
            idCategory: this.idCategory
        })
        this.entryForm.setControl('entries', this.setExistingEntries(this.entries));
        // Add an extra entry
        this.addItem();
    }
    private setExistingEntries(entries: DictionaryEntry[]): FormArray {
        const formArray = new FormArray([]);
        let tmpGroup = null;
        entries.forEach(e => {
            tmpGroup = this.formBuilder.group({
                id: e.id,
                original: e.entryOriginal,
                translation: e.entryTranslation,
                description: e.description,
                update: false,
                delete: false,
                reset: false
            });
            //Sets up the triggers for change verification on update values.
            this.onChanges(tmpGroup, formArray.length);
            formArray.push(tmpGroup);
        });
        this.entryArray = formArray;
        return formArray;
    }
    submitForm(): void {
        console.log(this.entryForm.value);
    }
    onBlur(event){
        console.log(event);
    }

    onChanges(entity:FormGroup, idx:number): void {
        let lagDelete = false;
        entity.valueChanges.subscribe(val => {
            console.log(idx);
            if(val.id){
                let tmpVer = this.api.Entry(this.idCategory, val.id);
                let update = val.original != tmpVer.entryOriginal
                    || val.translation != tmpVer.entryTranslation
                    || val.description != tmpVer.description
                    || val.delete != lagDelete;
                if(update != val.update){
                    entity.controls.update.setValue(update);
                }
                if(val.delete){
                    lagDelete = val.delete;
                }
                console.log('update');
            } else {
                if(val.delete){
                    this.entryArray.removeAt(idx);
                }
                console.log('insert');
            }
        })
    }
}
