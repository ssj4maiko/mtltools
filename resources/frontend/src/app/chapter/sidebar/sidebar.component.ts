import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';

import { DictionaryEntry, EntryForm } from '../../_models/dictionaryentry';
import { DictionaryCategory } from '../../_models/dictionarycategory';
import { Dictionary } from '../../_models/dictionary';
import { ApiService } from 'src/app/api';
import { environment } from 'src/environments/environment';
import { Novel } from 'src/app/_models/novel';
import { CacheService } from '../cache.service';
import { DetailComponent } from '../detail/detail.component';
import { FormService } from '../form.service';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';

@Component({
  selector: 'app-chapter-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends FormService implements OnInit, OnDestroy, AfterViewInit {

  @Output() Sidebar2Chapter: EventEmitter<DictionaryCategory[]> = new EventEmitter<DictionaryCategory[]>();

  dictionaries: Dictionary[] = [];
  categories: DictionaryCategory[] = [];

  idCategory: number;
  idDictionary: number;
  idNovel: number;
  novel: Novel;

  dictionarySelector: any = '';


  constructor(
      public api: ApiService
    , private route: ActivatedRoute
  ) {
    super(api);
  }

  ngOnInit() {
    this.idNovel = this.route.snapshot.params.idNovel;

    this.api.Dictionary.getAll({idNovel: this.idNovel})
      .then((dictionaries: Dictionary[]) => {
        this.dictionaries = dictionaries;
        this.dictionarySelector = dictionaries[0].id;
        this.dictionarySelected(this.dictionarySelector);
      });
  }

  @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
  shortcuts: ShortcutInput[] = [];
  selectOpenCategory:number = -1;
  selectedEntry:number = -1;
  private getSelectedEntryType = (inputId:string) => {
    let explode = inputId.split('-');
    if(!explode[3]){
      return '';
    }
    else {
      return '-'+explode[3];
    }
  }
  private moveFocus = (id: string, output?:ShortcutEventOutput) => {
    let el = document.getElementById(id);
    if (el){
      el.focus();
      el.scrollIntoView({
        behavior:'smooth',
        block: 'center',
        inline: 'center',
      });
    }
    else {
      console.error(id);
    }

    if(output){
      console.log({
        output: output.key,
        category: this.selectOpenCategory,
        categoryLength: this.categories.length,
        entry: this.selectedEntry,
        entryLength: this.categories[this.selectOpenCategory].entries?.length,
        target: output?.event.target
      });
    }
  }
  private moveCurrentCategory = (output?:ShortcutEventOutput) => {
    let id = 'category-' + this.selectOpenCategory;
    this.moveFocus(id, output);
  }
  private moveCurrentEntry = (entryType: string = '', output?: ShortcutEventOutput) => {
    let id = 'entry-' + this.selectOpenCategory + '-' + this.selectedEntry + entryType;
    this.moveFocus(id, output);
  }

  ngOnDestroy() {
    delete this.dictionaries;
    delete this.categories;
    delete this.categoriesOriginalValues;
    delete this.idCategory;
    delete this.idDictionary;
    delete this.idNovel;
    delete this.dictionarySelector;
    console.log('destroy Sidebar');
  }
  dictionarySelected(idDictionary: number) {
    this.idDictionary = idDictionary;
    this.getCache();
  }
  private getCache() {
    if (this.categories.length === 0) {
      this.api.Dictionary.getCache(this.idDictionary)
        .then((status) => {
          this.PrepareCacheThenTranslate(status);
        });
    } else {
      this.refreshTranslation();
    }
  }
  private PrepareCacheThenTranslate(status) {
    if (status) {
      const loadedDictionary = new Promise<void>((resolveDic, rejectDic) => {
        this.rebuildCache(resolveDic);
      });

      loadedDictionary.then(_ => {
        this.refreshTranslation();
      });
    }
  }

  refreshTranslation() {
    this.Sidebar2Chapter.emit(this.categories);
  }
  refreshOriginal() {
    this.Sidebar2Chapter.emit([]);
  }
  saving: boolean = false;
  saveModifications() {
    this.saving = true;
    this.api.Dictionary.fullSave(this.idDictionary, this.categories)
      .then(res => {
        this.categories = [];
        this.getCache();
        this.refreshTranslation();

        this.saving = false;
        console.log('saveModifications',res);
      }).catch(res => {
        this.saving = false;
        console.error(res);
      });
  }

  openOutside(translate) {
    const no = this.route.snapshot.params.noChapter;
    let url = `${environment.backendServer}/static/${this.idNovel}/${this.idDictionary}/${no}/`;
    if (translate) {
      url = 'https://translate.google.com/translate?sl=auto&tl=en&u=' + url;
    }
    window.open(url);
  }

  textPointer(catIdx: number, entIdx: number) {
    this.selectOpenCategory = catIdx;
    this.selectedEntry = entIdx;
    console.log('TESTES', this.selectOpenCategory, this.selectedEntry);
    setTimeout(() => {
      this.moveCurrentEntry('');
    }, 100)
  }
  activateSufix(entry:EntryForm, catIdx:number, entIdx:number) {
    switch(true){
      case !!entry.sufix:
        entry.sufix = null;
        entry.prefix = this.categories[0].id;
        break;
      case !!entry.prefix:
        entry.sufix = null;
        entry.prefix = null;
        break;
      default:
        entry.sufix = this.categories[0].id;
        entry.prefix = null;
    }
    this.changeEntry(entry, catIdx, entIdx);
  }
  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: ["f5"],
        preventDefault: true,
        label: "Dictionary",
        description: "Refresh Translation",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          this.refreshTranslation();
        }
      },
      {
        key: ["f4"],
        preventDefault: true,
        label: "Dictionary",
        description: "Refresh to Original",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          this.refreshOriginal();
        }
      },
      {
        key: ["ctrl + s"],
        preventDefault: true,
        label: "Dictionary",
        description: "Save Modifications",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          this.saveModifications();
        }
      },
      {
        key: ["ctrl + up", "ctrl + alt + up"],
        preventDefault: true,
        label: "Categories",
        description: "Category Up",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          this.selectedEntry = -1;
          if (this.selectOpenCategory > 0) {
            this.selectOpenCategory--
          } else {
            this.selectOpenCategory = this.categories.length - 1;
          }
          this.moveCurrentCategory(output);
        }
      },
      {
        key: ["ctrl + down", "ctrl + alt + down"],
        preventDefault: true,
        label: "Categories",
        description: "Category Down",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          this.selectedEntry = -1;
          if (this.selectOpenCategory < this.categories.length - 1) {
            this.selectOpenCategory++
          } else {
            this.selectOpenCategory = 0;
          }
          this.moveCurrentCategory(output);
        }
      },
      {
        key: ["ctrl + alt + plus", "ctrl + alt + n"],
        preventDefault: true,
        label: "Categories",
        description: "Add New Category",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          this.addCategory();
          this.selectOpenCategory = this.categories.length - 1;
          setTimeout(() => {
            this.moveCurrentCategory(output);
          }, 100)
        }
      },
      {
        key: "alt + down",
        preventDefault: true,
        label: "Entries",
        description: "Move Down on Entry List",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          if (this.selectOpenCategory < 0) {
            this.selectOpenCategory = 0;
          }
          if (this.categories[this.selectOpenCategory].entries) {
            if (this.selectedEntry >= this.categories[this.selectOpenCategory].entries.length - 1) {
              this.selectedEntry = 0;
            } else {
              this.selectedEntry++;
            }
            let target = (output.event.target as HTMLElement)
            let entryType: string = (target.id ? this.getSelectedEntryType(target.id) : '');
            if (
              (entryType == '-sufix' && !this.categories[this.selectOpenCategory].entries[this.selectedEntry].sufix) ||
              (entryType == '-prefix' && !this.categories[this.selectOpenCategory].entries[this.selectedEntry].prefix)
            ) {
              entryType = '-trans';
            }
            this.moveCurrentEntry(entryType, output);
          }
        }
      },
      {
        key: "alt + up",
        preventDefault: true,
        label: "Entries",
        description: "Move Up on Entry List",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          if (this.selectOpenCategory < 0) {
            this.selectOpenCategory = 0;
          }
          if (this.categories[this.selectOpenCategory].entries) {
            if (this.selectedEntry <= 0) {
              this.selectedEntry = this.categories[this.selectOpenCategory].entries.length - 1;
            } else {
              this.selectedEntry--;
            }
            let target = (output.event.target as HTMLElement)
            let entryType: string = (target.id ? this.getSelectedEntryType(target.id) : '');
            if (
              (entryType == '-sufix' && !this.categories[this.selectOpenCategory].entries[this.selectedEntry].sufix) ||
              (entryType == '-prefix' && !this.categories[this.selectOpenCategory].entries[this.selectedEntry].prefix)
            ){
              entryType = '-trans';
            }
            this.moveCurrentEntry(entryType, output);
          }
        }
      },
      {
        key: "alt + right",
        preventDefault: true,
        label: "Entries",
        description: "Move Right on Entry List",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          if (this.selectOpenCategory < 0) {
            return;
          }
          if (!this.categories[this.selectOpenCategory].entries)
            return;
          let target = (output.event.target as HTMLElement)
          if (target.id.indexOf('entry-') !== 0)
            return;

          let entryType: string = (target.id ? this.getSelectedEntryType(target.id) : '');
          switch (entryType) {
            case '':
              if (this.categories[this.selectOpenCategory].entries[this.selectedEntry].sufix){
                entryType = '-sufix';
              } else {
                entryType = '-trans';
              }
              break;
            case '-sufix':
              entryType = '-trans';
              break;
            case '-trans':

              if (this.categories[this.selectOpenCategory].entries[this.selectedEntry].prefix) {
                entryType = '-prefix';
              } else {
                entryType = '-desc';
              }
              break;
            case '-prefix':
              entryType = '-desc';
              break;
          }
          this.moveCurrentEntry(entryType, output);
        }
      },
      {
        key: "alt + left",
        preventDefault: true,
        label: "Entries",
        description: "Move Left on Entry List",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          if (this.selectOpenCategory < 0) {
            return;
          }
          if (!this.categories[this.selectOpenCategory].entries)
            return;

          let target = (output.event.target as HTMLElement)
          if (target.id.indexOf('entry-') !== 0)
            return;

          let entryType: string = (target.id ? this.getSelectedEntryType(target.id) : '');

          switch (entryType) {
            case '-desc':
              if (this.categories[this.selectOpenCategory].entries[this.selectedEntry].prefix) {
                entryType = '-prefix';
              } else {
                entryType = '-trans';
              }
              break;
            case '-prefix':
              entryType = '-trans';
              break;
            case '-trans':
              if (this.categories[this.selectOpenCategory].entries[this.selectedEntry].sufix) {
                entryType = '-sufix';
              } else {
                entryType = '';
              }
              break;
            case '-sufix':
              entryType = '';
              break;
          }
          this.moveCurrentEntry(entryType, output);
        }
      },
      {
        key: ["alt + home", "alt + 1"],
        preventDefault: true,
        label: "Entries",
        description: "Move to First Entry",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          if (this.selectOpenCategory < 0) {
            this.selectOpenCategory = 0;
          }
          if (this.categories[this.selectOpenCategory].entries) {
            this.selectedEntry = 0;
            let target = (output.event.target as HTMLElement)
            let entryType: string = (target.id ? this.getSelectedEntryType(target.id) : '');
            this.moveCurrentEntry(entryType, output);
          }
        }
      },
      {
        key: "alt + end",
        preventDefault: true,
        label: "Entries",
        description: "Move to Last Entry",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          if (this.selectOpenCategory < 0) {
            this.selectOpenCategory = 0;
          }
          if (this.categories[this.selectOpenCategory].entries) {
            this.selectedEntry = this.categories[this.selectOpenCategory].entries.length - 1;
            let target = (output.event.target as HTMLElement)
            let entryType: string = (target.id ? this.getSelectedEntryType(target.id) : '');
            this.moveCurrentEntry(entryType, output);
          }
        }
      },

      {
        key: ["alt + plus", "alt + insert", "alt + n"],
        preventDefault: true,
        label: "Entries",
        description: "Add New Entry",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          if (this.selectOpenCategory < 0) {
            return;
          }
          this.addEntry(this.categories[this.selectOpenCategory], this.categories[this.selectOpenCategory].id, this.selectOpenCategory);

          this.selectedEntry = this.categories[this.selectOpenCategory].entries.length - 1;
          setTimeout(() => {
            this.moveCurrentEntry('', output);
          }, 100)
        }
      },
      {
        key: ["ctrl + d", "alt + d"],
        preventDefault: true,
        label: "Entries",
        description: "Duplicate Entry",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          if (this.selectOpenCategory < 0) {
            return;
          }
          if (this.selectedEntry < 0) {
            return;
          }
          this.duplicateEntry(
            this.categories[this.selectOpenCategory],
            this.categories[this.selectOpenCategory].id,
            this.selectOpenCategory,
            this.categories[this.selectOpenCategory].entries[this.selectedEntry]
          );
        }
      },
      {
        key: ["alt + -", "alt + d"],
        preventDefault: true,
        label: "Entries",
        description: "Remove Entry",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          if (this.selectOpenCategory < 0) {
            return;
          }
          if (this.selectedEntry < 0) {
            return;
          }
          let entryform = this.categories[this.selectOpenCategory].entries[this.selectedEntry] as EntryForm
          entryform.delete = !entryform.delete;
        }
      },
      {
        key: ["alt + *", "alt + r"],
        preventDefault: true,
        label: "Entries",
        description: "Return Entry to normal",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          if (this.selectOpenCategory < 0) {
            return;
          }
          if (this.selectedEntry < 0) {
            return;
          }
          let entryform = this.categories[this.selectOpenCategory].entries[this.selectedEntry] as EntryForm
          entryform.reset = true;
          this.changeEntry(entryform, this.selectOpenCategory, this.selectedEntry);
          setTimeout(() => {
            let target = (output.event.target as HTMLElement);
            let id = target.id;
            this.moveFocus(id);
          }, 100);
        }
      },
      {
        key: ["alt + s"],
        preventDefault: true,
        label: "Entries",
        description: "Toggle Suffix/Prefix",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          if (this.selectOpenCategory < 0) {
            return;
          }
          if (this.selectedEntry < 0) {
            return;
          }
          let entryform = this.categories[this.selectOpenCategory].entries[this.selectedEntry] as EntryForm;
          this.activateSufix(entryform, this.selectOpenCategory, this.selectedEntry);
        }
      },
    );
    //this.keyboard.select("ctrl + alt + u").subscribe(e => console.log(e));
  }
}
