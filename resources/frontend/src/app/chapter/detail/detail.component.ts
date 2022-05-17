import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api';
import { DomSanitizer } from '@angular/platform-browser';

import { Chapter } from '../../_models/chapter';
import { Novel } from '../../_models/novel';
import { DictionaryCategory } from 'src/app/_models/dictionarycategory';
import { CategoryModule } from 'src/app/category';
import { count } from 'rxjs-compat/operator/count';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ViewportScroller } from '@angular/common';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';

import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-chapter-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent implements OnInit {
  @ViewChild(SidebarComponent) Sidebar;

  chapter: Chapter;
  novel: Novel;
  idNovel: number;
  noChapter: number;

  chapterPrevious: Chapter;
  chapterNext: Chapter;

  renderedTitle: string;
  renderedText: string;
  loadedChapter: Promise<void>;
  loadedChapterResolve: () => void;


  showSidebar: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public sanitized: DomSanitizer,
    private api: ApiService,
    private viewport: ViewportScroller
  ) {
    this.showSidebar = true;
  }

  ngOnInit() {
    this.loadedChapter = new Promise<void>((resolve) => {
      this.loadedChapterResolve = resolve;
    });
    this.startContent();
  }

  @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
  shortcuts: ShortcutInput[] = [];
  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: "alt + pageup",
        preventDefault: true,
        label: "Chapter",
        description: "Previous Chapter",
        command: (output: ShortcutEventOutput) => {
          this.chapterRoute.previous()
        },
      },
      {
        key: "alt + pagedown",
        preventDefault: true,
        label: "Chapter",
        description: "Next Chapter",
        command: (output: ShortcutEventOutput) => {
          this.chapterRoute.next()
        },
      },
    );

    //this.keyboard.select("ctrl + f").subscribe(e => console.log(e));
  }  
  ngOnDestroy() {
    delete this.loadedChapter;
    console.log('destroy detailed chapter');
  }
  ngDoCheck() {

    if (this.noChapter !== this.route.snapshot.params.noChapter) {
      console.log('changing chapter', this.Sidebar.categories);
      this.ngOnInit();
      this.translateText(this.Sidebar.categories);
    }
  }

  private startContent() {
    this.idNovel = this.route.snapshot.params.idNovel;
    this.noChapter = this.route.snapshot.params.noChapter;
    Promise.all([
      this.api.Novel.get({ id: this.idNovel }),
      this.api.Chapter.get({ idNovel: this.idNovel, no: this.noChapter, text: true })
    ]).then((values: [Novel, Chapter]) => {
      this.novel = values[0];
      this.chapter = values[1];

      this.renderDataView();
      this.cacheAdjecentChapters(this.noChapter - 0);
      this.loadedChapterResolve();
    });
  }
  private cacheAdjecentChapters(noChapter: number) {
    const prev = noChapter - 1;
    if (prev > 0) {
      this.api.Chapter.get({ idNovel: this.idNovel, no: prev, text: true })
        .then(previous => {
          this.chapterPrevious = previous;
        });
    }
    const next = noChapter - 0 + 1;
    if (next <= this.novel.numberChapters) {
      this.api.Chapter.get({ idNovel: this.idNovel, no: next, text: true })
        .then(Next => {
          this.chapterNext = Next;
        });
    }
  }
  renderDataView() {
    this.renderedTitle = this.chapter.title;
    this.renderedText = !!this.chapter.textRevision ? this.chapter.textRevision : this.chapter.textOriginal;
  }

  translateText(categories: DictionaryCategory[]) {
    // In case the dictionary comes first, then let it wait for the chapter
    this.loadedChapter.then(_ => {
      this.renderDataView();
      // Confirm that there are categories
      if (categories.length > 0) {
        const entries = [];
        categories.forEach((category,i) => {
          // Newly created Categories don't come with Entries, so let's not break the code
          if (category.entries) {
            category.entries.forEach((entry,j) => {
              // Newly created Entries won't have the variables set by default, which would break the code on AOT
              if (entry.entryOriginal){
                const length = entry.entryOriginal.length;
                if (!entries[length]) {
                  entries[length] = [];
                }
                entries[length].push({
                  entryOriginal: entry.entryOriginal,
                  entryTranslation: entry.entryTranslation,
                  entryDescription: entry.description,
                  idEntry: entry.id,
                  idCategory: category.id,
                  category: category.name,
                  index: [i,j]
                });
              }
            });
          }
        });
        for (let i = entries.length; i > 0; --i) {
          if (entries[i]) {
            entries[i].forEach((entry, j) => {
              // console.log('Change ', entry.entryOriginal, entry.entryTranslation);
              const regex = new RegExp(entry.entryOriginal, 'g');
              this.renderedTitle = this.renderedTitle.replace(regex, '\[\[' + entry.entryTranslation + '\]\]');
              this.renderedText = this.renderedText.replace(regex, '\[\[<span class="replaced" '
                                                                        + (entry.entryDescription ? `title="${entry.entryDescription}"` : '') 
                                                                      +' id="replaced-' + entry.index[0] + '-' + entry.index[1] +'">'
                                                                        + entry.entryTranslation
                                                                      +'</span>\]\]');
            });
          }
        }
        // The extra characters are to allow to create a space in between translated words
        let regex = new RegExp('\\]\\]\\[\\[', 'g');
        this.renderedTitle = this.renderedTitle.replace(regex, ' ');
        this.renderedText = this.renderedText.replace(regex, ' ');
        regex = new RegExp('\\]\\]', 'g');
        this.renderedTitle = this.renderedTitle.replace(regex, '');
        this.renderedText = this.renderedText.replace(regex, '');
        regex = new RegExp('\\[\\[', 'g');
        this.renderedTitle = this.renderedTitle.replace(regex, '');
        this.renderedText = this.renderedText.replace(regex, '');

        setTimeout(() => {
          let els = Array.from(document.getElementsByClassName('replaced'));
          els.forEach(element => {
            element.addEventListener('click',(event) => {
              let idxs = (event.target as HTMLElement).id.split('-');
              this.Sidebar.textPointer(idxs[1],idxs[2]);
            })
          });
        }, 200);
        //alert(this.renderedText);
      }
    });

  }
  toogleSidebar() {
    if (this.showSidebar)
      this.showSidebar = false;
    else
      this.showSidebar = true;
  }

  public chapterRoute = {
    next: () => {
      this.viewport.scrollToPosition([0,0]);
      this.router.navigate(['novel', this.idNovel, this.chapterNext.no]);
    },
    previous: () => {
      this.viewport.scrollToPosition([0,0]);
      this.router.navigate(['novel', this.idNovel, this.chapterPrevious.no]);
    }
  }

}
