import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
      , name: [null]
      , language: [null]
      , novel: [null]
    });
  }

  formGroup: FormGroup;
  form: FormField[];

  selectNovels: Option[] = [];
  selectLanguages: Option[] = [];
  indexes: string[] = [];

  loadMeta(meta: Meta, novels: Novel[]): void {
    this.selectLanguages = [];
    for (const value of Object.keys(meta.languages)) {
      this.selectLanguages.push(new Option(value, meta.languages[value]));
    }
    this.selectNovels = [];
    for (const value of Object.keys(novels)) {
      this.selectNovels.push(new Option(novels[value].id + '', novels[value].nameCustom, false));
    }
  }
  addForm(name?: string, label?: string, type?: string, options?: Option[]): void {
    this.indexes.push(name);
    this.form.push(new FormField(name, label, type, options));
  }
  getForm(insert: boolean): void {
    this.form = [];
    if (insert) { this.addForm('id', '', 'hidden'); }
    this.addForm('name', 'Name', 'text');
    this.addForm('language', 'Language', 'select', this.selectLanguages);
    this.addForm('novel', 'Novels', 'multiselect', this.selectNovels);
  }

  setValues(dictionary: Dictionary, novels: Novel[]): void {
    const novValues = novels.map((nove: Novel) => nove.id + '');
    const nov = new FormArray(this.selectNovels.map((option) => {
      if (novValues.includes(option.value)) {
        option.setChecked(true);
      }
      return option.control;
    }));
    if (dictionary) {
      this.formGroup.setValue({
          id: dictionary.id
        , name: dictionary.name
        , language: dictionary.language
        , novel: nov
      });
    }
  }

  getValues(novelsAlreadyThere?:Novel[]): {dictionary: Dictionary, novels: number[]} {
    const values2return = { dictionary: null, novels: null};
    values2return.dictionary = new Dictionary(this.formGroup.value);
    console.log(values2return.dictionary);
    delete (values2return.dictionary.novel);

    const novIndex = this.indexes.indexOf('novel');
    values2return.novels = this.form[novIndex].getValues().map(item => parseInt(item, 10));
    if (novelsAlreadyThere && novelsAlreadyThere.length === values2return.novels.length) {
      const dictValues = novelsAlreadyThere.map(item => item.id);
      if (JSON.stringify(dictValues) === JSON.stringify(values2return.novels)) {
        delete values2return.novels;
      }
    }

    return values2return;
  }
}
