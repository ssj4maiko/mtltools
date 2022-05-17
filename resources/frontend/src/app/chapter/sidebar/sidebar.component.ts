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
    if(inputId.indexOf('trans') > 0){
      return '-trans';
    }
    if(inputId.indexOf('desc') > 0){
      return '-desc';
    }
    return '';
  }
  private moveFocus = (id: string, direction?: string, output?:ShortcutEventOutput) => {
    let el = document.getElementById(id);
    if (el)
      el.focus();
    else {
      console.error(id);
    }

    // if(direction){
    //   console.log({
    //     direction,
    //     category: this.selectOpenCategory,
    //     categoryLength: this.categories.length,
    //     entry: this.selectedEntry,
    //     entryLength: this.categories[this.selectOpenCategory].entries?.length,
    //     target: output?.event.target
    //   });
    // }
  }

  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: ["ctrl + up","ctrl + alt + up"],
        preventDefault: true,
        label: "Categories",
        description: "Category Up",
        allowIn: [AllowIn.ContentEditable,AllowIn.Input, AllowIn.Select, AllowIn.Textarea],  
        command: (output: ShortcutEventOutput) => {
          this.selectedEntry = -1;
          if (this.selectOpenCategory > 0){
            this.selectOpenCategory--
          } else {
            this.selectOpenCategory = this.categories.length-1;
          }
          let id = 'category-' + this.selectOpenCategory;
          this.moveFocus(id, 'CUp', output);
        }
      },
      {
        key: ["ctrl + down", "ctrl + alt + down"],
        preventDefault: true,
        label: "Categories",
        description: "Category Down",
        allowIn: [AllowIn.ContentEditable,AllowIn.Input, AllowIn.Select, AllowIn.Textarea],  
        command: (output: ShortcutEventOutput) => {
          this.selectedEntry = -1;
          if (this.selectOpenCategory < this.categories.length-1) {
            this.selectOpenCategory++
          } else {
            this.selectOpenCategory = 0;
          }
          let id = 'category-'+this.selectOpenCategory;
          this.moveFocus(id, 'CDown', output);
        }
      },
      {
        key: "ctrl + alt + plus",
        preventDefault: true,
        label: "Categories",
        description: "Add New Category",
        allowIn: [AllowIn.ContentEditable, AllowIn.Input, AllowIn.Select, AllowIn.Textarea],
        command: (output: ShortcutEventOutput) => {
          this.addCategory();
          this.selectOpenCategory = this.categories.length-1;
          let id = 'category-' + this.selectOpenCategory;
          setTimeout(() => {
            this.moveFocus(id, 'CNew', output);
          },100)
        }
      },
      {
        key: "alt + down",
        preventDefault: true,
        label: "Entries",
        description: "Move Down on Entry List",
        allowIn: [AllowIn.ContentEditable,AllowIn.Input, AllowIn.Select, AllowIn.Textarea],  
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
            /* @ts-ignore */
            let entryType: string = (output.event.target.id ? this.getSelectedEntryType(output.event.target.id) : '');
            let id = 'entry-' + this.selectOpenCategory + '-' + this.selectedEntry + entryType;
            this.moveFocus(id, 'EDown', output);
          }
        }
      },
      {
        key: "alt + up",
        preventDefault: true,
        label: "Entries",
        description: "Move Up on Entry List",
        allowIn: [AllowIn.ContentEditable,AllowIn.Input, AllowIn.Select, AllowIn.Textarea],  
        command: (output: ShortcutEventOutput) => {
          if (this.selectOpenCategory < 0) {
            this.selectOpenCategory = 0;
          }
          if (this.categories[this.selectOpenCategory].entries){
            if (this.selectedEntry <= 0) {
              this.selectedEntry = this.categories[this.selectOpenCategory].entries.length-1;
            } else {
              this.selectedEntry--;
            }
            /* @ts-ignore */
            let entryType: string = (output.event.target.id ? this.getSelectedEntryType(output.event.target.id) : '');
            let id = 'entry-' + this.selectOpenCategory + '-' + this.selectedEntry + entryType;
            this.moveFocus(id, 'EUp', output);
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
            return ;
          }
          if (!this.categories[this.selectOpenCategory].entries)
            return;
            /* @ts-ignore */
          if(output.event.target.id.indexOf('entry-') !== 0)
            return;

          /* @ts-ignore */
          let entryType: string = (output.event.target.id ? this.getSelectedEntryType(output.event.target.id) : '');
          switch(entryType){
            case '':
              entryType = '-trans';
              break;
            case '-trans':
              entryType = '-desc';
              break;
          }
          let id = 'entry-' + this.selectOpenCategory + '-' + this.selectedEntry + entryType;
          this.moveFocus(id, 'ERight', output);
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
          /* @ts-ignore */
          if (output.event.target.id.indexOf('entry-') !== 0)
            return;

          /* @ts-ignore */
          let entryType: string = (output.event.target.id ? this.getSelectedEntryType(output.event.target.id) : '');
          switch (entryType) {
            case '-trans':
              entryType = '';
              break;
            case '-desc':
              entryType = '-trans';
              break;
          }
          let id = 'entry-' + this.selectOpenCategory + '-' + this.selectedEntry + entryType;
          this.moveFocus(id, 'ERight', output);
        }
      },
      
      {
        key: "alt + plus",
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
          let id = 'entry-' + this.selectOpenCategory + '-' + this.selectedEntry;
          setTimeout(() => {
            this.moveFocus(id, 'ENew', output);
          }, 100)
        }
      }
      
    );

    //this.keyboard.select("ctrl + f").subscribe(e => console.log(e));
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
}
