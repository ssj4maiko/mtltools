import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ApiService } from '../../api.service';

import { ModalService } from '../../_services/modal/modal.service';
import { Papa } from 'ngx-papaparse';

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
export class ListComponent implements OnInit, OnDestroy {

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
        ,private modalService: ModalService
        ,private papa: Papa
		) { }

	ngOnInit() {
		this.idNovel = this.route.snapshot.params['idNovel'];
		this.idDictionary = this.route.snapshot.params['idDictionary'];
		this.idCategory = this.route.snapshot.params['idCategory'];
		this.novel = this.api.Novel(this.idNovel);
		this.dictionary = this.api.Dictionary(this.idNovel,this.idDictionary);
		this.category = this.api.Category(this.idDictionary,this.idCategory);

        this.entryForm = this.formBuilder.group({
            idCategory	: '',
            entries		: this.formBuilder.array([this.createItem()])
        });

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
    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        console.log('should have been destroyed!');
    }
    /**
     * LOAD THE BASICS FOR NAVIGATION
     */
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
			this.api.getCategories(this.idNovel, this.idDictionary)
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
        this.api.getEntries(this.idDictionary, this.idCategory)
			.subscribe(res => {
                this.entries = Object.values(this.api.Entries(this.idCategory));
                this.fillForm();
			}, err => {
				console.log(err);
			});
	}

    /**
     * Form Building
     */
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
    /**
     * Form Behavior
     */
    onChanges(entity: FormGroup, idx: number): void {
        let lagDelete = false,
            lagCounter = 6,      // Number of fields per reset
            lag = 0,
            DEFAULT: DictionaryEntry;
        entity.valueChanges.subscribe(val => {
            if (lag === 0) {
                console.log(val);
                // In case there was default data, load it one time.
                if (!DEFAULT) {
                    DEFAULT = this.api.Entry(this.idCategory, val.id);
                    console.log(DEFAULT);
                }

                /**
                 * In case the reset button was pressed, activate lag,
                 * because the 6 changes will trigger this function 6 times,
                 * make it do nothing until it's done.
                 */
                if (val.reset) {
                    console.log('reset');
                    lag = lagCounter;
                    entity.controls.reset.setValue(false);  // set it back to false
                    entity.controls.update.setValue(false);
                    entity.controls.delete.setValue(false);
                    entity.controls.original.setValue(val.id ? DEFAULT.entryOriginal : '');
                    entity.controls.translation.setValue(val.id ? DEFAULT.entryTranslation : '');
                    entity.controls.description.setValue(val.id ? DEFAULT.description : '');
                }
                /**
                 * If there is an ID, it's related to data that already existed, so:
                 * - Don't delete instantly
                 * - Check if there is a need to update or not anymore
                 */
                if (val.id) {
                    let update = val.original != DEFAULT.entryOriginal
                        || val.translation != DEFAULT.entryTranslation
                        || val.description != DEFAULT.description
                        || val.delete != lagDelete;
                    if (update != val.update) {
                        lag = 1;
                        entity.controls.update.setValue(update);
                    }
                    if (val.delete) {
                        lagDelete = val.delete;
                    }
                }
                //  Otherwise it's an insert, there is no update, and it can be removed instantly
                else {
                    if (val.delete) {
                        this.entryArray.removeAt(idx);
                    }
                }
            } else {
                console.log('counter', lag);
                --lag;
            }
        });
    }
    /**
     * Form Edit
     */
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
        this.api.addEntries(this.idDictionary, this.idCategory,this.entryForm.value)
            .subscribe(res => {
                if (res.changes){
                    console.log(res);
                    this.api.getEntries(this.idDictionary,this.idCategory)
                        .subscribe(res => {
                            this.router.navigate(['/novel/dictionary/', this.idNovel,this.idDictionary]);
                        }, (err) => {
                            console.log("Didn't move because: ",err);
                        });
                } else {
                    this.router.navigate(['/novel/dictionary/', this.idNovel,this.idDictionary]);
                }
            }, (err) => {
                console.log(err);
            });
    }



    /**
     *
     *  IMPORT
     *
     */
    openModal(id: string) {
        this.modalService.open(id);
    }
    closeModal(id: string) {
        this.modalService.close(id);
    }
    private file:any;
    tmpResult: [] = [];
    uploadFile($event){
        this.file = $event.target.files[0];

        let fileReader = new FileReader();
        fileReader.onload = (e) => {

            this.papa.parse(<string>fileReader.result, {
                complete: (result) => {
                    this.tmpResult = result.data;
                    this.openModal('confirm-import');
                }
            });
        }
        fileReader.readAsText(this.file);
    }
    cancelImport(){
        this.tmpResult = [];
        this.closeModal('confirm-import');
    }
    commitImport(){
        // Check what's the last written field
        let i;
        for(i = this.entryArray.value.length-1;i > -1;--i){
            if( this.entryArray.value[i].id != ''
            || this.entryArray.value[i].original != ''
            || this.entryArray.value[i].translation != ''
            || this.entryArray.value[i].description != ''){
                ++i;
                break;
            }
        }

        this.tmpResult.forEach(e => {
            let tmpGroup = this.formBuilder.group({
                id: '',
                original: e[0],
                translation: e[1],
                description: e[2],
                update: false,
                delete: false,
                reset: false
            });

            // Starting from the last written field, check if it exists
            // If it does, overwrite it, since it's empty anyway
            if (this.entryArray.controls[i]){
                this.onChanges(tmpGroup, i);
                this.entryArray.controls[i] = tmpGroup;
            }
            // Otherwise, start pushing new items
            else {
                this.onChanges(tmpGroup, this.entryArray.length);
                this.entryArray.push(tmpGroup);
            }
            ++i;
        });

        // If, after the import, there are no empty fields remaining, create one at the end.
        if (!this.entryArray.controls[i]){
            this.addItem();
        }

        // Close all the modals
        this.closeModal('confirm-import');
        this.closeModal('import-list');
    }
}
