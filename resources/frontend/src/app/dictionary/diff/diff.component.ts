import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dictionary } from 'src/app/_models/dictionary';
import { DictionaryCategory } from 'src/app/_models/dictionarycategory';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DictionaryEntry } from 'src/app/_models/dictionaryentry';

@Component({
  selector: 'app-diff',
  templateUrl: './diff.component.html',
  styleUrls: ['./diff.component.scss']
})
export class DiffComponent implements OnInit, OnDestroy {

    dictionaries: Dictionary[] = [];

    categories: DictionaryCategory[] = [];
    categoriesHash: {} = {};
    entries: DictionaryEntry[] = [];
    idDictionary: number;
    entriesOriginalValues: {} = {};

    entry2SelectHash: {} = {};
    entry2SelectHashKeys: string[] = [];

    categoriesSelected: DictionaryCategory[] = [];
    categoriesSelectedHash: {} = {};
    entriesSelected: DictionaryEntry[] = [];
    idDictionarySelected: number;

    idNovel: number;

    constructor(
          private api: ApiService
        , private route: ActivatedRoute
        , private router: Router
    ) { }

    ngOnInit() {
        this.idNovel = this.route.snapshot.params.idNovel;
        this.idDictionary = this.route.snapshot.params.idDictionary;
        this.dictionaries = Object.values(this.api.Dictionaries());

        if (this.dictionaries.length == 0) {
            this.api.getDictionaries()
                .subscribe(res => {
                    const dictionaries = this.api.Dictionaries();
                    if (dictionaries) {
                        this.dictionaries = Object.values(dictionaries);
                    }
                    this.getCache();

                }, err => {
                    console.log(err);
                });
        } else {
            this.getCache();
        }
    }
    ngOnDestroy(): void {
        delete this.dictionaries;
        delete this.categories;
        delete this.categoriesHash;
        delete this.entries;
        delete this.idDictionary;

        delete this.entry2SelectHash;
        delete this.entry2SelectHashKeys;

        delete this.categoriesSelected;
        delete this.categoriesSelectedHash;
        delete this.entriesSelected;
        delete this.idDictionarySelected;
    }
    loadSelectedDictionary() {
        this.getSelectedCache();
    }
    changeEntry(entry) {
        if (entry.id > 0) {
            console.log(entry.id);
            console.log(entry.idCategory);
            entry.update =
                    entry.entryOriginal != this.entriesOriginalValues[entry.id].entryOriginal
                || entry.entryTranslation != this.entriesOriginalValues[entry.id].entryTranslation
                || (!!entry.description && (entry.description != this.entriesOriginalValues[entry.id].description))
                || entry.idCategory != this.entriesOriginalValues[entry.id].idCategory
                ;
            console.log(entry);
        }
    }
    addEntry($event, i) {
        const idCategory = $event.target.value,
            selectedValues = this.entry2SelectHash[this.entry2SelectHashKeys[i]],
            selectedEntry = this.entriesSelected[selectedValues.selected],
            newEntry = new DictionaryEntry();

        newEntry.id = 0;
        newEntry.idCategory = idCategory;
        newEntry.entryOriginal = selectedEntry.entryOriginal;
        newEntry.entryTranslation = selectedEntry.entryTranslation;
        newEntry.description = selectedEntry.description;

        selectedValues.entry = this.entries.length;
        this.entries.push(newEntry);
    }
    saveList() {
        const tmpEntries = {},
            send = [];

        this.categories.forEach(category => {
            send.push(category);
            tmpEntries[category.id] = [];
        });
        this.entries.forEach(entry => {
            tmpEntries[entry.idCategory].push(entry);
        });
        send.forEach(sen => {
            sen.entries = tmpEntries[sen.id];
        });

        this.api.saveFullDictionary(this.idDictionary, send)
            .subscribe(res => {
                if (res.changes) {
                    this.dictionaries = Object.values(this.api.Dictionaries());
                    this.categories = [];
                    this.router.navigate(['/novel/dictionary/', ]);
                }
                console.log(res);
            }, err => {
                console.log(err);
            });
    }
    private getCache() {
        if (this.categories.length == 0) {
            this.api.dictionaryCache(this.idDictionary)
                .subscribe(res => {
                    this.categories = [];
                    this.entries = [];

                    this.categories = Object.values(this.api.Categories(this.idDictionary));
                    this.categories.forEach(category => {
                        this.categoriesHash[category.id] = {
                            name: category.name
                        };
                        const entries = this.api.Entries(category.id);
                        for (const i in entries) {
                            this.entry2SelectHash[entries[i].entryOriginal] = {
                                entry : this.entries.length,
                                selected : null
                            };
                            this.entries.push(entries[i]);
                            this.entriesOriginalValues[entries[i].id] = {
                                  entryOriginal: '' + entries[i].entryOriginal
                                , entryTranslation: '' + entries[i].entryTranslation
                                , description: '' + entries[i].description
                                , idCategory: '' + entries[i].idCategory
                            };
                        }
                    });
                    this.entry2SelectHashKeys = Object.keys(this.entry2SelectHash);
                }, err => {
                    console.log(err);
                });
        }
    }
    getSelectedCache() {
        this.api.dictionaryCache(this.idDictionarySelected)
            .subscribe(res => {
                this.categoriesSelected = [];
                this.entriesSelected = [];

                this.categoriesSelected = Object.values(this.api.Categories(this.idDictionarySelected));
                this.categoriesSelected.forEach(category => {
                    this.categoriesSelectedHash[category.id] = {
                        name: category.name
                    };
                    const entries = this.api.Entries(category.id);
                    for (const i in entries) {

                        if (!this.entry2SelectHash[entries[i].entryOriginal]) {
                            this.entry2SelectHash[entries[i].entryOriginal] = {
                                entry: null,
                                selected: this.entriesSelected.length
                            };
                        } else {
                            this.entry2SelectHash[entries[i].entryOriginal].selected = this.entriesSelected.length;
                        }
                        this.entriesSelected.push(entries[i]);
                    }
                });
                this.entry2SelectHashKeys = Object.keys(this.entry2SelectHash);
            }, err => {
                console.log(err);
            });
    }

}
