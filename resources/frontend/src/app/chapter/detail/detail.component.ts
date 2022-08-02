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
import { DictionaryEntry } from 'src/app/_models';

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
    this.translateWorker = new Worker(new URL('../../_workers/translate-text.worker', import.meta.url), { type: 'module' });
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
  private translateWorker:Worker;
  translateText(categories: DictionaryCategory[]) {
    // In case the dictionary comes first, then let it wait for the chapter
    this.loadedChapter.then(_ => {
      // Confirm that there are categories
      if(typeof Worker !== 'undefined') {
        this.translateWorker.onmessage = ( ( e ) => {
          this.renderedText = e.data.text;
          this.renderedTitle = e.data.title;

          setTimeout(() => {
            let els = Array.from(document.getElementsByClassName('replaced'));
            els.forEach(element => {
              element.addEventListener('click', (event) => {
                let idxs = (event.target as HTMLElement).id.split('-');
                this.Sidebar.textPointer(idxs[1], idxs[2]);
              })
            });
          }, 200);
        })
        this.translateWorker.postMessage({
          categories,
          title: this.chapter.title,
          text: !!this.chapter.textRevision ? this.chapter.textRevision : this.chapter.textOriginal
        })
      } else {
        console.log('use some browser, goddamnit');
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
      document.getElementById('content').scrollTop = 0;
      this.router.navigate(['novel', this.idNovel, this.chapterNext.no]);
    },
    previous: () => {
      document.getElementById('content').scrollTop = 0;
      this.router.navigate(['novel', this.idNovel, this.chapterPrevious.no]);
    }
  }

}
