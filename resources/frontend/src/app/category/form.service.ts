import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DictionaryCategory } from '../_models';
import { Dictionary } from '../_models/dictionary';
import { FormField, Meta, Option } from '../_models/formField';
import { Novel } from '../_models/novel';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(
      public formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({
        id: [null]
      , idDictionary: [null]
      , name: [null]
    });
  }

  formGroup: FormGroup;
  form: FormField[];

  indexes: string[] = [];

  addForm(name?: string, label?: string, type?: string, options?: Option[]): void {
    this.indexes.push(name);
    this.form.push(new FormField(name, label, type, options));
  }
  getForm(insert: boolean): void {
    this.form = [];
    if (insert) { this.addForm('id', '', 'hidden'); }
    this.addForm('idDictionary', '', 'hidden');
    this.addForm('name', 'Name', 'text');
  }

  setValues(category: DictionaryCategory): void {
    this.formGroup.setValue({
        id: category.id
      , idDictionary: category.idDictionary
      , name: category.name
    });
  }

  getValues(): {dictionaryCategory: DictionaryCategory} {
    const values2return = { dictionaryCategory: null};
    values2return.dictionaryCategory = new DictionaryCategory(this.formGroup.value);
    delete (values2return.dictionaryCategory.entries);

    return values2return;
  }
}
