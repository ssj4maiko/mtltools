import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DictionaryCategory, DictionaryEntry, EntryForm } from '../_models';
import { Dictionary } from '../_models/dictionary';
import { FormField, Meta, Option } from '../_models/formField';
import { Novel } from '../_models/novel';


@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(
      public formBuilder: FormBuilder
  ) {}
  idCategory: number;
  idDictionary: number;

  formGroup: FormGroup;
  entryArray: FormArray;

  indexes: string[] = [];

  /**
   * Form Edit
   */
  entries: DictionaryEntry[] = [];
  formEntries: EntryForm[];

  public createForm(idDictionary: number, idCategory: number, entries: DictionaryEntry[]): void {
    // Add an extra entry
    this.formEntries = entries.map((entry: DictionaryEntry): EntryForm => {
      return new EntryForm(entry);
    });
    console.log(this.formEntries);
    this.addItem();
  }
  addItem(): void {
    this.formEntries.push(new EntryForm(null, this.idCategory) );
  }
  onChange(entry: EntryForm, i: number): void {
    // If RESET is pressed
    if (entry.reset) {
      if (this.entries[i] ) {
        this.formEntries[i] = new EntryForm(this.entries[i]);
      } else {
        this.formEntries[i] = new EntryForm(null, this.idCategory);
      }
    } else {
      // If DELETE is pressed
      if (entry.delete) {
        if (this.entries[i]) {
          this.formEntries[i].delete  = true;
        } else {
          this.formEntries.splice(i, 1);

        }
      } else {
        // If ANY OTHER action is done
        this.formEntries[i].update = (this.formEntries[i].id && (
                                      this.formEntries[i].idCategory !== this.entries[i].idCategory ||
                                      this.formEntries[i].entryOriginal !== this.entries[i].entryOriginal ||
                                      this.formEntries[i].entryTranslation !== this.entries[i].entryTranslation ||
                                      this.formEntries[i].description !== this.entries[i].description ||
                                      this.formEntries[i].sufix !== this.entries[i].sufix ||
                                      this.formEntries[i].prefix !== this.entries[i].prefix)
                                      );
      }
      // For the sake of always having one extra entry opened
      this.checkIfNeedsToAutoAddAnExtraItem();
    }
  }
  private checkIfNeedsToAutoAddAnExtraItem(): void {
    const lastItem = this.formEntries[this.formEntries.length - 1];
    if (!!(lastItem.entryOriginal
      || lastItem.entryTranslation
      || lastItem.description)) {
      this.addItem();
    }
  }
  getValues(): { entries: EntryForm[]} {
    return {entries: this.formEntries};
  }
}
