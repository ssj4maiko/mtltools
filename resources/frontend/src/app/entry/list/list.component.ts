import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ApiService } from '../../api';

import { ModalService } from '../../_services/modal/modal.service';
import { Papa } from 'ngx-papaparse';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { DictionaryEntry } from '../../_models/dictionaryentry';
import { DictionaryCategory } from '../../_models/dictionarycategory';
import { Dictionary } from '../../_models/dictionary';
import { Novel } from '../../_models/novel';
import { FormService } from '../form.service';

@Component({
    selector: 'app-list',
    host: {
        '(blur)': 'onBlur($event)'
    },
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends FormService implements OnInit, OnDestroy {

    constructor(
          private router: Router
        , private route: ActivatedRoute
        , public api: ApiService
        , public formBuilder: FormBuilder
        , private modalService: ModalService
        , private papa: Papa
    ) {
        super(formBuilder);
    }

    dictionary: Dictionary;
    categories: DictionaryCategory[] = [];

    private file: any;
    tmpResult: [] = [];

    ngOnInit() {
        this.idDictionary = this.route.snapshot.params.idDictionary;
        this.idCategory = this.route.snapshot.params.idCategory;

        Promise.all([
            this.api.Dictionary.get({id: this.idDictionary}),
            this.api.Category.getAll({idDictionary: this.idDictionary}),
            this.api.Entry.getAll({ idDictionary: this.idDictionary, idCategory: this.idCategory}),
        ]).then((values: [Dictionary, DictionaryCategory[], DictionaryEntry[]]) => {
            this.api.Category.get({ idDictionary: this.idDictionary, id: this.idCategory })
                .then((category) => {
                    this.dictionary = values[0];
                    this.categories = Object.values(values[1]);
                    this.entries = Object.values(values[2]);

                    this.createForm(this.idDictionary, this.idCategory, this.entries);

                    // this.setValues(this.idDictionary, this.idCategory, values[2]);
                    // this.fillForm();
                });
        });

    }
    ngOnDestroy(): void {
        // Called once, before the instance is destroyed.
        // Add 'implements OnDestroy' to the class.
        delete this.entries;
        delete this.dictionary;
        delete this.categories;
        delete this.formGroup;
        delete this.entryArray;
        delete this.idCategory;
        delete this.idDictionary;
        console.log('DESTROY!');
    }

    submitForm(): void {
        const entries = this.getValues();
        this.api.Entry.saveByCategory({idDictionary: this.idDictionary, idCategory: this.idCategory, entries : entries.entries})
            .then((status) => {
                if (status) {
                    this.router.navigate(['/dictionary/', this.idDictionary]);
                } else {
                    console.log('THERE WAS AN ERROR!');
                }
            });
    }



    /**
     *
     *  IMPORT
     *
     */
    /*
    openModal(id: string) {
        this.modalService.open(id);
    }
    closeModal(id: string) {
        this.modalService.close(id);
    }
    uploadFile($event) {
        this.file = $event.target.files[0];

        const fileReader = new FileReader();
        fileReader.onload = (e) => {

            this.papa.parse( fileReader.result as string, {
                complete: (result) => {
                    this.tmpResult = result.data;
                    this.openModal('confirm-import');
                }
            });
        };
        fileReader.readAsText(this.file);
    }
    cancelImport() {
        this.tmpResult = [];
        this.closeModal('confirm-import');
    }
    commitImport() {
        // Check what's the last written field
        let i;
        for (i = this.entryArray.value.length - 1; i > -1; --i) {
            if ( this.entryArray.value[i].id != ''
            || this.entryArray.value[i].idCategory != ''
            || this.entryArray.value[i].entryOriginal != ''
            || this.entryArray.value[i].entryTranslation != ''
            || this.entryArray.value[i].description != '') {
                ++i;
                break;
            }
        }

        this.tmpResult.forEach(e => {
            const tmpGroup = this.formBuilder.group({
                id: '',
                idCategory: this.idCategory,
                entryOriginal: e[0],
                entryTranslation: e[1],
                description: e[2],
                update: false,
                delete: false,
                reset: false
            });

            // Starting from the last written field, check if it exists
            // If it does, overwrite it, since it's empty anyway
            if (this.entryArray.controls[i]) {
                this.onChanges(tmpGroup, i);
                this.entryArray.controls[i] = tmpGroup;
            } else {
                this.onChanges(tmpGroup, this.entryArray.length);
                this.entryArray.push(tmpGroup);
            }
            ++i;
        });

        // If, after the import, there are no empty fields remaining, create one at the end.
        if (!this.entryArray.controls[i]) {
            this.addItem();
        }

        // Close all the modals
        this.closeModal('confirm-import');
        this.closeModal('import-list');
    }
    */
}
