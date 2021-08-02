import { Injectable, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
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
      , code: [null]
      , nameOriginal: [null]
      , nameCustom: [null]
      , addedBy: [null]
      , dictionary: [null]
      , driver: [null]
      , flagR18: [null]
      , completed: [null]
      , show: [null]
    });
  }

  formGroup: FormGroup;
  form: FormField[];

  selectDictionaries: Option[] = [];
  selectDrivers: Option[] = [];
  indexes: string[] = [];

  loadMeta(meta: Meta, dictionaries: Dictionary[]): void {
    this.selectDrivers = [];
    for (const value of Object.keys(meta.drivers)) {
      this.selectDrivers.push(new Option(value, meta.drivers[value]));
    }
    this.selectDictionaries = [];
    for (const value of Object.keys(dictionaries)) {
      this.selectDictionaries.push(new Option(value + '', dictionaries[value].name, false));
    }
  }
  addForm(name?: string, label?: string, type?: string, options?: Option[]): void {
    this.indexes.push(name);
    this.form.push(new FormField(name, label, type, options));
  }
  getForm(insert: boolean): void {
    this.form = [];
    if (insert) { this.addForm('id', '', 'hidden'); }
    this.addForm('code', 'Syosetsu code', 'text');
    this.addForm('nameOriginal', 'Original Name', 'text');
    this.addForm('nameCustom', 'Translated Name', 'text');
    if (insert) { this.addForm('addedBy', 'Added by', 'text'); }
    this.addForm('dictionary', 'Dictionaries', 'multiselect', this.selectDictionaries);
    this.addForm('driver', 'Driver', 'select', this.selectDrivers);
    this.addForm('flagR18', 'R18?', 'checkbox');
    this.addForm('completed', 'Completed?', 'checkbox');
    this.addForm('show', 'Show on list?', 'checkbox');
  }

  setValues(novel: Novel, dictionaries: Dictionary[]): void {

    const dicValues = dictionaries.map((dict: Dictionary) => dict.id + '');
    const dic = new FormArray(this.selectDictionaries.map((option) => {
      if (dicValues.includes(option.value)) {
        option.setChecked(true);
      }
      return option.control;
    }));

    this.formGroup.setValue({
        id: novel.id
      , code: novel.code
      , nameOriginal: novel.nameOriginal
      , nameCustom: novel.nameCustom
      , addedBy: novel.addedBy
      , dictionary: dic
      , driver: novel.driver
      , flagR18: novel.flagR18
      , completed: novel.flagR18
      , show: novel.show
    });
  }

  getValues(dictionariesAlreadyThere?:Dictionary[]): {novel: Novel, dictionaries: number[]} {
    const values2return = {novel: null, dictionaries: null};
    values2return.novel = new Novel(this.formGroup.value);
    delete (values2return.novel.dictionary);

    const dictIndex = this.indexes.indexOf('dictionary');
    values2return.dictionaries = this.form[dictIndex].getValues().map(item => parseInt(item, 10));
    if (dictionariesAlreadyThere && dictionariesAlreadyThere.length === values2return.dictionaries.length) {
      const dictValues = dictionariesAlreadyThere.map(item => item.id);
      if (JSON.stringify(dictValues) === JSON.stringify(values2return.dictionaries)) {
        delete values2return.dictionaries;
      }
    }

    return values2return;
  }
}
