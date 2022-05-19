import { ElementRef, Injectable, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api';
import { DictionaryCategory, DictionaryEntry, EntryForm } from '../_models';
import { Dictionary } from '../_models/dictionary';
import { FormField, Meta, Option } from '../_models/formField';
import { Novel } from '../_models/novel';


@Injectable({
  providedIn: 'root'
})
export class FormService {
  idDictionary: number;

  categories: DictionaryCategory[] = [];
  categoriesOriginalValues: DictionaryCategory[] = [];

  indexes: string[] = [];

  @ViewChildren('categoryDOM') public DOMcategories: QueryList<ElementRef<HTMLDivElement>>;

  constructor(
    public api: ApiService
  ) { }

  rebuildCache(resolveDic): void {
    this.api.Category.getAll({ idDictionary: this.idDictionary })
      .then((categories) => {

        this.categories = Object.values(categories);
        const LoadedPromise = [];

        this.categories.forEach((category, categoryIndex) => {
          LoadedPromise.push(new Promise<void>((resolveCat, rejectCat) => {

            this.api.Entry.getAll({ idDictionary: this.idDictionary, idCategory: category.id })
              .then((entries) => {
                LoadedPromise.push(new Promise<void>((resolveEnt, rejectEnt) => {
                  /** @var DictionaryEntry[] category.entries */
                  category.entries = Object.values(entries);
                  resolveEnt();
                }));
              });
            resolveCat();
          }));
        });

        Promise.all(LoadedPromise)
          .then(_ => {
            this.categoriesOriginalValues = JSON.parse(JSON.stringify(this.categories));
            resolveDic();
          });
      });
  }
  addEntry(category:DictionaryCategory, category_id:number, category_index:number) {
    if (!category.entries) {
      category.entries = [];
    }
    category.entries.push(new EntryForm());

    // Wait until new input is rendered to focus it
    setTimeout(() => {
      let DOMLi: HTMLDivElement;
      let DOMInput: HTMLInputElement;
      if (this.DOMcategories){
        let DOMcategory = this.DOMcategories.toArray()[category_index];
        if (DOMcategory) {
          DOMLi = DOMcategory.nativeElement;
        }
      }
      // Fallback for AOT
      if (!DOMLi) {
        DOMLi = <HTMLDivElement>document.getElementById("categoryDOM-" + category_index);
      }
      DOMInput = (DOMLi.children[DOMLi.children.length - 2].children[0] as HTMLInputElement);
      DOMInput.focus();
    },150)
  }
  addCategory() {
    this.categories.push(new DictionaryCategory(null, this.idDictionary));
  }


  changeEntry(entry: EntryForm, catIdx?: number, entIdx?: number) {
    if (entry.reset) {
      if (this.categories[catIdx].entries[entIdx].id) {
        this.categories[catIdx].entries[entIdx] = new EntryForm(this.categoriesOriginalValues[catIdx].entries[entIdx]);
      } else {
        this.categories[catIdx].entries[entIdx] = new EntryForm(null, this.categories[catIdx].id);
      }
    } else {
      if (entry.delete) {
        if (!entry.id) {
          this.categories[catIdx].entries.splice(entIdx, 1);
        }
      } else {
        if (entry.id) {
          entry.update = entry.entryOriginal    !== this.categoriesOriginalValues[catIdx].entries[entIdx].entryOriginal
                      || entry.entryTranslation !== this.categoriesOriginalValues[catIdx].entries[entIdx].entryTranslation
                      || entry.description      !== this.categoriesOriginalValues[catIdx].entries[entIdx].description
                      || entry.idCategory       !== this.categoriesOriginalValues[catIdx].entries[entIdx].idCategory
                      || entry.sufix            !== this.categoriesOriginalValues[catIdx].entries[entIdx].sufix
                      || entry.prefix           !== this.categoriesOriginalValues[catIdx].entries[entIdx].prefix
            ;
        }
      }
    }
  }
  changeCategory(category, idx) {
    if (category.id) {
      category.update = category.name !== this.categoriesOriginalValues[idx].name;
    }
  }

}
