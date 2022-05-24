"use strict";
(self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || []).push([["src_app_chapter_index_ts"],{

/***/ 8723:
/*!***************************************************!*\
  !*** ./src/app/chapter/chapter-routing.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChapterRoutingModule": () => (/* binding */ ChapterRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _list_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list/list.component */ 63434);
/* harmony import */ var _detail_detail_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail/detail.component */ 82319);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);





const routes = [{
  path: '',
  component: _list_list_component__WEBPACK_IMPORTED_MODULE_0__.ListComponent,
  data: {
    title: 'List Chapters'
  }
}, {
  path: 'dictionary',
  loadChildren: () => __webpack_require__.e(/*! import() */ "default-src_app_dictionary_index_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../dictionary */ 84341)).then(m => m.DictionaryModule),
  data: {
    title: 'View dictionary',
    breadcrumb: 'Dictionaries'
  }
}, {
  path: ':noChapter',
  component: _detail_detail_component__WEBPACK_IMPORTED_MODULE_1__.DetailComponent // ,loadChildren: () => ChapterModule
  ,
  data: {
    title: 'View chapter',
    breadcrumb: 'View Chapter'
  }
}, {
  path: '**',
  redirectTo: ''
}];
let ChapterRoutingModule = /*#__PURE__*/(() => {
  class ChapterRoutingModule {}

  ChapterRoutingModule.ɵfac = function ChapterRoutingModule_Factory(t) {
    return new (t || ChapterRoutingModule)();
  };

  ChapterRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: ChapterRoutingModule
  });
  ChapterRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
  return ChapterRoutingModule;
})();

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ChapterRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 39929:
/*!*******************************************!*\
  !*** ./src/app/chapter/chapter.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChapterModule": () => (/* binding */ ChapterModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _chapter_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chapter-routing.module */ 8723);
/* harmony import */ var _list_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list/list.component */ 63434);
/* harmony import */ var _detail_detail_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail/detail.component */ 82319);
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sidebar/sidebar.component */ 66061);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 14740);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);












let ChapterModule = /*#__PURE__*/(() => {
  class ChapterModule {}

  ChapterModule.ɵfac = function ChapterModule_Factory(t) {
    return new (t || ChapterModule)();
  };

  ChapterModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: ChapterModule
  });
  ChapterModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _chapter_routing_module__WEBPACK_IMPORTED_MODULE_0__.ChapterRoutingModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_8__.KeyboardShortcutsModule.forRoot()]]
  });
  return ChapterModule;
})();

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ChapterModule, {
    declarations: [_list_list_component__WEBPACK_IMPORTED_MODULE_1__.ListComponent, _detail_detail_component__WEBPACK_IMPORTED_MODULE_2__.DetailComponent, _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_3__.SidebarComponent, _detail_detail_component__WEBPACK_IMPORTED_MODULE_2__.SafeHtmlPipe],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _chapter_routing_module__WEBPACK_IMPORTED_MODULE_0__.ChapterRoutingModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_8__.KeyboardShortcutsModule]
  });
})();

_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetComponentScope"](_detail_detail_component__WEBPACK_IMPORTED_MODULE_2__.DetailComponent, [_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_3__.SidebarComponent, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLinkWithHref, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgTemplateOutlet, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_8__.KeyboardShortcutsComponent, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_8__.KeyboardShortcutsHelpComponent], [_detail_detail_component__WEBPACK_IMPORTED_MODULE_2__.SafeHtmlPipe]);

/***/ }),

/***/ 82319:
/*!****************************************************!*\
  !*** ./src/app/chapter/detail/detail.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DetailComponent": () => (/* binding */ DetailComponent),
/* harmony export */   "SafeHtmlPipe": () => (/* binding */ SafeHtmlPipe)
/* harmony export */ });
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sidebar/sidebar.component */ 66061);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 14740);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 34497);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api */ 39354);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);








function DetailComponent_ng_template_6_a_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DetailComponent_ng_template_6_a_2_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return ctx_r9.chapterRoute.previous();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Previous ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}

function DetailComponent_ng_template_6_a_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DetailComponent_ng_template_6_a_7_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return ctx_r11.chapterRoute.next();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Next ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}

const _c0 = function (a1) {
  return ["/novel/", a1];
};

function DetailComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 11)(1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, DetailComponent_ng_template_6_a_2_Template, 2, 0, "a", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 12)(4, "a", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " Table of Contents ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, DetailComponent_ng_template_6_a_7_Template, 2, 0, "a", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.chapterPrevious);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c0, ctx_r3.idNovel));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.chapterNext);
  }
}

function DetailComponent_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](0);
  }
}

function DetailComponent_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "h1", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "safeHtml");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "hr")(4, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "safeHtml");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 2, ctx_r5.renderedTitle), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](5, 4, ctx_r5.renderedText), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
  }
}

function DetailComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](0);
  }
}

let SafeHtmlPipe = /*#__PURE__*/(() => {
  class SafeHtmlPipe {
    constructor(sanitized) {
      this.sanitized = sanitized;
    }

    transform(value) {
      return this.sanitized.bypassSecurityTrustHtml(value);
    }

  }

  SafeHtmlPipe.ɵfac = function SafeHtmlPipe_Factory(t) {
    return new (t || SafeHtmlPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.DomSanitizer, 16));
  };

  SafeHtmlPipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefinePipe"]({
    name: "safeHtml",
    type: SafeHtmlPipe,
    pure: true
  });
  return SafeHtmlPipe;
})();
let DetailComponent = /*#__PURE__*/(() => {
  class DetailComponent {
    constructor(router, route, sanitized, api, viewport) {
      this.router = router;
      this.route = route;
      this.sanitized = sanitized;
      this.api = api;
      this.viewport = viewport;
      this.shortcuts = [];
      this.chapterRoute = {
        next: () => {
          document.getElementById('content').scrollTop = 0;
          this.router.navigate(['novel', this.idNovel, this.chapterNext.no]);
        },
        previous: () => {
          document.getElementById('content').scrollTop = 0;
          this.router.navigate(['novel', this.idNovel, this.chapterPrevious.no]);
        }
      };
      this.showSidebar = true;
      this.translateWorker = new Worker(__webpack_require__.tu(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u("src_app__workers_translate-text_worker_ts"), __webpack_require__.b)), {
        type: undefined
      });
    }

    ngOnInit() {
      this.loadedChapter = new Promise(resolve => {
        this.loadedChapterResolve = resolve;
      });
      this.startContent();
    }

    ngAfterViewInit() {
      this.shortcuts.push({
        key: "alt + pageup",
        preventDefault: true,
        label: "Chapter",
        description: "Previous Chapter",
        command: output => {
          this.chapterRoute.previous();
        }
      }, {
        key: "alt + pagedown",
        preventDefault: true,
        label: "Chapter",
        description: "Next Chapter",
        command: output => {
          this.chapterRoute.next();
        }
      }); //this.keyboard.select("ctrl + f").subscribe(e => console.log(e));
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

    startContent() {
      this.idNovel = this.route.snapshot.params.idNovel;
      this.noChapter = this.route.snapshot.params.noChapter;
      Promise.all([this.api.Novel.get({
        id: this.idNovel
      }), this.api.Chapter.get({
        idNovel: this.idNovel,
        no: this.noChapter,
        text: true
      })]).then(values => {
        this.novel = values[0];
        this.chapter = values[1];
        this.renderDataView();
        this.cacheAdjecentChapters(this.noChapter - 0);
        this.loadedChapterResolve();
      });
    }

    cacheAdjecentChapters(noChapter) {
      const prev = noChapter - 1;

      if (prev > 0) {
        this.api.Chapter.get({
          idNovel: this.idNovel,
          no: prev,
          text: true
        }).then(previous => {
          this.chapterPrevious = previous;
        });
      }

      const next = noChapter - 0 + 1;

      if (next <= this.novel.numberChapters) {
        this.api.Chapter.get({
          idNovel: this.idNovel,
          no: next,
          text: true
        }).then(Next => {
          this.chapterNext = Next;
        });
      }
    }

    renderDataView() {
      this.renderedTitle = this.chapter.title;
      this.renderedText = !!this.chapter.textRevision ? this.chapter.textRevision : this.chapter.textOriginal;
    }

    translateText(categories) {
      // In case the dictionary comes first, then let it wait for the chapter
      this.loadedChapter.then(_ => {
        // Confirm that there are categories
        if (typeof Worker !== 'undefined') {
          this.translateWorker.onmessage = e => {
            this.renderedText = e.data.text;
            this.renderedTitle = e.data.title;
            setTimeout(() => {
              let els = Array.from(document.getElementsByClassName('replaced'));
              els.forEach(element => {
                element.addEventListener('click', event => {
                  let idxs = event.target.id.split('-');
                  this.Sidebar.textPointer(idxs[1], idxs[2]);
                });
              });
            }, 200);
          };

          this.translateWorker.postMessage({
            categories,
            title: this.chapter.title,
            text: !!this.chapter.textRevision ? this.chapter.textRevision : this.chapter.textOriginal
          });
        } else {
          console.log('use some browser, goddamnit');
        }
      });
    }

    toogleSidebar() {
      if (this.showSidebar) this.showSidebar = false;else this.showSidebar = true;
    }

  }

  DetailComponent.ɵfac = function DetailComponent_Factory(t) {
    return new (t || DetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_api__WEBPACK_IMPORTED_MODULE_1__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.ViewportScroller));
  };

  DetailComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: DetailComponent,
    selectors: [["app-chapter-detail"]],
    viewQuery: function DetailComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__.SidebarComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_6__.KeyboardShortcutsComponent, 5);
      }

      if (rf & 2) {
        let _t;

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.Sidebar = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.keyboard = _t.first);
      }
    },
    decls: 13,
    vars: 7,
    consts: [[1, "flexContent"], [1, "sidebar", 3, "hidden"], [3, "Sidebar2Chapter"], ["SidebarChild", ""], ["id", "content", 1, "content"], ["Content", ""], ["controlButtons", ""], [4, "ngTemplateOutlet"], [4, "ngIf"], [3, "shortcuts"], [3, "key", "title"], [1, "columns", "controlButtons"], [1, "column"], ["class", "button is-large is-primary", 3, "click", 4, "ngIf"], [1, "button", "is-large", "is-primary", 3, "routerLink"], [1, "button", "is-large", "is-primary", 3, "click"], [1, "title", 3, "innerHTML"], [1, "novel-content", 3, "innerHTML"]],
    template: function DetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "app-chapter-sidebar", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("Sidebar2Chapter", function DetailComponent_Template_app_chapter_sidebar_Sidebar2Chapter_2_listener($event) {
          return ctx.translateText($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, DetailComponent_ng_template_6_Template, 8, 5, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, DetailComponent_ng_container_8_Template, 1, 0, "ng-container", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, DetailComponent_ng_container_9_Template, 6, 6, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, DetailComponent_ng_container_10_Template, 1, 0, "ng-container", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "ng-keyboard-shortcuts", 9)(12, "ng-keyboard-shortcuts-help", 10);
      }

      if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](7);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("hidden", !ctx.showSidebar);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutlet", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.chapter);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutlet", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("shortcuts", ctx.shortcuts);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("key", "f1")("title", "Help");
      }
    },
    styles: [".controlButtons {\n  margin-top: 1px;\n}\n.controlButtons a {\n  width: 100%;\n  text-align: center;\n}\n.content > h1.title {\n  color: #fff;\n}\n.novel-content {\n  color: white;\n}\n.novel-content .replaced {\n  background-color: #636363;\n}\n.novel-content .replaced.sufix {\n  background-color: #ce7474;\n}\n.novel-content .replaced.prefix {\n  background-color: #7476ce;\n}\n.flexContent {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  height: 100%;\n}\n.flexContent .sidebar {\n  z-index: 20;\n  width: 400px;\n  position: fixed;\n  left: 0px;\n  margin-right: 10px;\n  height: calc(100% - 100px);\n  top: 100px;\n  bottom: 0px;\n  overflow-y: auto;\n  background: #5e009f;\n}\n.flexContent .sidebar:hover {\n  width: 80%;\n  max-width: 800px;\n}\n.flexContent .content {\n  width: calc(100% - 410px);\n  height: calc(100% - 100px);\n  right: 0px;\n  position: fixed;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.help-modal__body {\n  min-width: 700px;\n  color: #000;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7QUFDSjtBQUFJO0VBQ0ksV0FBQTtFQUNBLGtCQUFBO0FBRVI7QUFFSTtFQUNJLFdBQUE7QUFDUjtBQUVBO0VBQ0ksWUFBQTtBQUNKO0FBQ0k7RUFDSSx5QkFBQTtBQUNSO0FBQ0k7RUFDSSx5QkFBQTtBQUNSO0FBQ0k7RUFDSSx5QkFBQTtBQUNSO0FBRUE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUNKO0FBQ0k7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQkFBQTtFQUNBLFVBQUE7RUFHQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQURSO0FBR1E7RUFDSSxVQUFBO0VBQ0EsZ0JBQUE7QUFEWjtBQUlJO0VBQ0kseUJBQUE7RUFDQSwwQkFBQTtFQUNBLFVBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQUZSO0FBS0E7RUFDSSxnQkFBQTtFQUNBLFdBQUE7QUFGSiIsImZpbGUiOiJkZXRhaWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udHJvbEJ1dHRvbnN7XG4gICAgbWFyZ2luLXRvcDogMXB4O1xuICAgIGF7XG4gICAgICAgIHdpZHRoOjEwMCU7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG59XG4uY29udGVudCB7XG4gICAgJiA+IGgxLnRpdGxlIHtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgfVxufVxuLm5vdmVsLWNvbnRlbnR7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIFxuICAgIC5yZXBsYWNlZCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6cmdiKDk5LCA5OSwgOTkpO1xuICAgIH1cbiAgICAucmVwbGFjZWQuc3VmaXgge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOnJnYigyMDYsIDExNiwgMTE2KTtcbiAgICB9XG4gICAgLnJlcGxhY2VkLnByZWZpeCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6cmdiKDExNiwgMTE4LCAyMDYpO1xuICAgIH1cbn1cbi5mbGV4Q29udGVudHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuXG4gICAgLnNpZGViYXIge1xuICAgICAgICB6LWluZGV4OiAyMDtcbiAgICAgICAgd2lkdGg6NDAwcHg7XG4gICAgICAgIHBvc2l0aW9uOmZpeGVkO1xuICAgICAgICBsZWZ0OiAwcHg7XG4gICAgICAgIG1hcmdpbi1yaWdodDoxMHB4O1xuICAgICAgICBoZWlnaHQ6Y2FsYygxMDAlIC0gMTAwcHgpO1xuICAgICAgICB0b3A6IDEwMHB4O1xuICAgICAgICAvLyBoZWlnaHQ6MTAwJTtcbiAgICAgICAgLy8gdG9wOiAwcHg7XG4gICAgICAgIGJvdHRvbTogMHB4O1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgICBiYWNrZ3JvdW5kOiAjNWUwMDlmO1xuXG4gICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgd2lkdGg6ODAlO1xuICAgICAgICAgICAgbWF4LXdpZHRoOjgwMHB4O1xuICAgICAgICB9XG4gICAgfVxuICAgIC5jb250ZW50IHtcbiAgICAgICAgd2lkdGg6IGNhbGMoMTAwJSAtIDQxMHB4KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAxMDBweCk7XG4gICAgICAgIHJpZ2h0OiAwcHg7XG4gICAgICAgIHBvc2l0aW9uOmZpeGVkO1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XG4gICAgfVxufVxuLmhlbHAtbW9kYWxfX2JvZHkge1xuICAgIG1pbi13aWR0aDo3MDBweDtcbiAgICBjb2xvcjogIzAwMDtcbn0iXX0= */"],
    encapsulation: 2
  });
  return DetailComponent;
})();

/***/ }),

/***/ 16822:
/*!*****************************************!*\
  !*** ./src/app/chapter/form.service.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormService": () => (/* binding */ FormService)
/* harmony export */ });
/* harmony import */ var _home_node_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_models */ 3027);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api */ 39354);




let FormService = /*#__PURE__*/(() => {
  class FormService {
    constructor(api) {
      this.api = api;
      this.categories = [];
      this.categoriesOriginalValues = [];
      this.indexes = [];
    }

    rebuildCache(resolveDic) {
      var _this = this;

      this.api.Category.getAll({
        idDictionary: this.idDictionary
      }).then( /*#__PURE__*/function () {
        var _ref = (0,_home_node_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (categories) {
          _this.categories = Object.values(categories);
          const LoadedPromise = [];

          _this.categories.forEach( /*#__PURE__*/function () {
            var _ref2 = (0,_home_node_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (category, categoryIndex) {
              LoadedPromise.push(new Promise((resolveCat, rejectCat) => {
                _this.api.Entry.getAll({
                  idDictionary: _this.idDictionary,
                  idCategory: category.id
                }).then( /*#__PURE__*/function () {
                  var _ref3 = (0,_home_node_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (entries) {
                    LoadedPromise.push(new Promise( /*#__PURE__*/function () {
                      var _ref4 = (0,_home_node_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolveEnt, rejectEnt) {
                        /** @var DictionaryEntry[] category.entries */
                        category.entries = Object.values(entries);
                        resolveEnt();
                      });

                      return function (_x5, _x6) {
                        return _ref4.apply(this, arguments);
                      };
                    }()));
                  });

                  return function (_x4) {
                    return _ref3.apply(this, arguments);
                  };
                }());

                resolveCat();
              }));
            });

            return function (_x2, _x3) {
              return _ref2.apply(this, arguments);
            };
          }());

          Promise.all(LoadedPromise).then(_ => {
            _this.categoriesOriginalValues = JSON.parse(JSON.stringify(_this.categories));
            resolveDic();
          });
        });

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }

    addEntry(category, category_id, category_index, entry) {
      if (!category.entries) {
        category.entries = [];
      }

      category.entries.push(new _models__WEBPACK_IMPORTED_MODULE_1__.EntryForm(entry)); // Wait until new input is rendered to focus it

      setTimeout(() => {
        let DOMLi;
        let DOMInput;

        if (this.DOMcategories) {
          let DOMcategory = this.DOMcategories.toArray()[category_index];

          if (DOMcategory) {
            DOMLi = DOMcategory.nativeElement;
          }
        } // Fallback for AOT


        if (!DOMLi) {
          DOMLi = document.getElementById("categoryDOM-" + category_index);
        }

        DOMInput = DOMLi.children[DOMLi.children.length - 2].children[0];
        DOMInput.focus();
      }, 150);
    }

    duplicateEntry(category, category_id, category_index, entry) {
      let clone = JSON.parse(JSON.stringify(entry));
      delete clone.id;
      this.addEntry(category, category_id, category_index, clone);
    }

    addCategory() {
      this.categories.push(new _models__WEBPACK_IMPORTED_MODULE_1__.DictionaryCategory(null, this.idDictionary));
    }

    changeEntry(entry, catIdx, entIdx, target) {
      if (entry.reset) {
        if (this.categories[catIdx].entries[entIdx].id) {
          this.categories[catIdx].entries[entIdx] = new _models__WEBPACK_IMPORTED_MODULE_1__.EntryForm(this.categoriesOriginalValues[catIdx].entries[entIdx]);
        } else {
          this.categories[catIdx].entries[entIdx] = new _models__WEBPACK_IMPORTED_MODULE_1__.EntryForm(null, this.categories[catIdx].id);
        }
      } else {
        if (entry.delete) {
          if (!entry.id) {
            this.categories[catIdx].entries.splice(entIdx, 1);
          }
        } else {
          if (entry.id) {
            entry.update = entry.entryOriginal !== this.categoriesOriginalValues[catIdx].entries[entIdx].entryOriginal || entry.entryTranslation !== this.categoriesOriginalValues[catIdx].entries[entIdx].entryTranslation || entry.description !== this.categoriesOriginalValues[catIdx].entries[entIdx].description || entry.idCategory !== this.categoriesOriginalValues[catIdx].entries[entIdx].idCategory || entry.sufix !== this.categoriesOriginalValues[catIdx].entries[entIdx].sufix || entry.prefix !== this.categoriesOriginalValues[catIdx].entries[entIdx].prefix;
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

  FormService.ɵfac = function FormService_Factory(t) {
    return new (t || FormService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_api__WEBPACK_IMPORTED_MODULE_2__.ApiService));
  };

  FormService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: FormService,
    factory: FormService.ɵfac,
    providedIn: 'root'
  });
  return FormService;
})();

/***/ }),

/***/ 89054:
/*!**********************************!*\
  !*** ./src/app/chapter/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChapterModule": () => (/* reexport safe */ _chapter_module__WEBPACK_IMPORTED_MODULE_0__.ChapterModule)
/* harmony export */ });
/* harmony import */ var _chapter_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chapter.module */ 39929);


/***/ }),

/***/ 63434:
/*!************************************************!*\
  !*** ./src/app/chapter/list/list.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListComponent": () => (/* binding */ ListComponent)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 92340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api */ 39354);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);






function ListComponent_ng_template_0_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 5)(1, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Import Chapter");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}

function ListComponent_ng_template_0_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 5)(1, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ListComponent_ng_template_0_div_5_Template_a_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return ctx_r6.updateChapters();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Update Chapters");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}

const _c0 = function (a1) {
  return ["/novel/", a1, "dictionary"];
};

function ListComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4)(1, "div", 5)(2, "a", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Dictionary");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, ListComponent_ng_template_0_div_4_Template, 3, 0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, ListComponent_ng_template_0_div_5_Template, 3, 0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c0, ctx_r1.idNovel));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.novel && ctx_r1.novel.driver == "manual");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.novel && ctx_r1.novel.driver != "manual");
  }
}

function ListComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](0);
  }
}

function ListComponent_ng_container_20_a_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ListComponent_ng_container_20_a_11_Template_a_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r17);
      const dictionary_r14 = restoredCtx.$implicit;
      const chapter_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return ctx_r15.openGT(chapter_r8, dictionary_r14);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const dictionary_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](dictionary_r14.language);
  }
}

function ListComponent_ng_container_20_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 16)(1, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "i", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}

function ListComponent_ng_container_20_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 19)(1, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}

const _c1 = function (a1, a2) {
  return ["/novel/", a1, a2];
};

function ListComponent_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "tr", 10)(2, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, ListComponent_ng_container_20_a_11_Template, 2, 1, "a", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, ListComponent_ng_container_20_ng_template_12_Template, 3, 0, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, ListComponent_ng_container_20_ng_template_14_Template, 3, 0, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const chapter_r8 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("title", ctx_r3.novel.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](chapter_r8.no);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](9, _c1, chapter_r8.idNovel, chapter_r8.no));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](chapter_r8.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](12, _c1, chapter_r8.idNovel, chapter_r8.no));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](chapter_r8.dateOriginalPost);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](15, _c1, chapter_r8.idNovel, chapter_r8.no));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](chapter_r8.dateOriginalRevision);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.dictionaries);
  }
}

let ListComponent = /*#__PURE__*/(() => {
  class ListComponent {
    constructor(router, route, api) {
      this.router = router;
      this.route = route;
      this.api = api;
      this.chapters = [];
      this.dictionaries = [];
    }

    ngOnInit() {
      this.idNovel = this.route.snapshot.params.idNovel;
      this.api.Novel.get({
        id: this.idNovel
      }).then(novel => {
        this.novel = novel;
        this.api.Dictionary.getAll({
          idNovel: this.idNovel
        }).then(dictionaries => {
          this.dictionaries = Object.values(dictionaries);
          this.api.Chapter.getAll({
            idNovel: this.idNovel
          }).then(chapters => {
            this.chapters = Object.values(chapters);
          });
        });
      });
    }

    openGT(chapter, dictionary) {
      let url = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.backendServer}/static/${this.idNovel}/${dictionary.id}/${chapter.no}/1`;
      url = 'https://translate.google.com/translate?sl=auto&tl=en&u=' + url;
      window.open(url);
    }

    updateChapters() {
      this.api.Chapter.autoUpdate({
        idNovel: this.idNovel
      }).then(res => {
        /**
         * Update the list too
         */
        this.api.Chapter.getAll({
          idNovel: this.idNovel
        }).then(chapters => {
          this.chapters = Object.values(chapters);
        });
      }, err => {
        console.log(err);
      });
    }

  }

  ListComponent.ɵfac = function ListComponent_Factory(t) {
    return new (t || ListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_api__WEBPACK_IMPORTED_MODULE_1__.ApiService));
  };

  ListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ListComponent,
    selectors: [["app-chapter-list"]],
    decls: 21,
    vars: 2,
    consts: [["actionButtons", ""], [4, "ngTemplateOutlet"], [1, "table", "is-striped", "is-hoverable", "is-fullwidth"], [4, "ngFor", "ngForOf"], [1, "columns", "actionButtons"], [1, "column"], [1, "button", "is-primary", 3, "routerLink"], ["class", "column", 4, "ngIf"], ["routerLink", "['/novel/',idNovel,'add']", 1, "button", "is-info"], [1, "button", "is-info", 3, "click"], [3, "title"], [3, "routerLink"], [3, "click", 4, "ngFor", "ngForOf"], ["success", ""], ["danger", ""], [3, "click"], [1, "button", "is-success"], [1, "icon", "is-small"], [1, "fas", "fa-check"], [1, "button", "is-danger"], [1, "fas", "fa-times"]],
    template: function ListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, ListComponent_ng_template_0_Template, 6, 5, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, ListComponent_ng_container_3_Template, 1, 0, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "table", 2)(5, "thead")(6, "tr")(7, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Number");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Title");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Date Created");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Date Updated");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Dictionary");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Google Translator");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](20, ListComponent_ng_container_20_Template, 16, 18, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      }

      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutlet", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.chapters);
      }
    },
    directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLinkWithHref, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgTemplateOutlet, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink],
    styles: [".columns[_ngcontent-%COMP%] {\n  margin: 5px;\n}\n\n.actionButtons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-align: center;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDQyxXQUFBO0FBQ0Q7O0FBQ0E7RUFDQyxrQkFBQTtFQUNBLFdBQUE7QUFFRCIsImZpbGUiOiJsaXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbHVtbnMge1xuXHRtYXJnaW46NXB4O1xufVxuLmFjdGlvbkJ1dHRvbnMgYSB7XG5cdHRleHQtYWxpZ246IGNlbnRlcjtcblx0d2lkdGg6MTAwJTtcbn1cbiJdfQ== */"]
  });
  return ListComponent;
})();

/***/ }),

/***/ 66061:
/*!******************************************************!*\
  !*** ./src/app/chapter/sidebar/sidebar.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SidebarComponent": () => (/* binding */ SidebarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 92340);
/* harmony import */ var _form_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../form.service */ 16822);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 14740);
/* harmony import */ var src_app_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/api */ 39354);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);











function SidebarComponent_div_0_li_2_option_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const option_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("value", option_r5.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](option_r5.language);
  }
}

function SidebarComponent_div_0_li_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li", 18)(1, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_li_2_Template_input_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r6.refreshTranslation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_li_2_Template_input_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r8.refreshOriginal();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "select", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SidebarComponent_div_0_li_2_Template_select_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r9.dictionarySelector = $event;
    })("change", function SidebarComponent_div_0_li_2_Template_select_change_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r10.dictionarySelected($event.target.value);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "option", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Choose a language");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, SidebarComponent_div_0_li_2_option_6_Template, 2, 2, "option", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx_r1.dictionarySelector);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.dictionaries);
  }
}

const _c0 = function (a0, a1, a2) {
  return {
    "changed": a0,
    "new": a1,
    "category-selected": a2
  };
};

function SidebarComponent_div_0_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "li")(2, "h1", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_ng_container_10_Template_h1_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r14);
      const i_r12 = restoredCtx.index;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r13.selectOpenCategory = i_r12;
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "input", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SidebarComponent_div_0_ng_container_10_Template_input_ngModelChange_3_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r14);
      const category_r11 = restoredCtx.$implicit;
      return category_r11.name = $event;
    })("ngModelChange", function SidebarComponent_div_0_ng_container_10_Template_input_ngModelChange_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r14);
      const category_r11 = restoredCtx.$implicit;
      const i_r12 = restoredCtx.index;
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r16.changeCategory(category_r11, i_r12);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const category_r11 = ctx.$implicit;
    const i_r12 = ctx.index;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction3"](3, _c0, category_r11.update == true, category_r11.id == null, ctx_r2.selectOpenCategory == i_r12));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate1"]("id", "category-", i_r12, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", category_r11.name);
  }
}

function SidebarComponent_div_0_ng_container_19_div_4_select_6_option_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const option_r27 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("value", option_r27.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](option_r27.name);
  }
}

function SidebarComponent_div_0_ng_container_19_div_4_select_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "select", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SidebarComponent_div_0_ng_container_19_div_4_select_6_Template_select_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r30);
      const entry_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      return entry_r21.sufix = $event;
    })("change", function SidebarComponent_div_0_ng_container_19_div_4_select_6_Template_select_change_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r30);
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      const entry_r21 = ctx_r32.$implicit;
      const j_r22 = ctx_r32.index;
      const i_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index;
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r31.changeEntry(entry_r21, i_r18, j_r22);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "option", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Select a Category for the suffix");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, SidebarComponent_div_0_ng_container_19_div_4_select_6_option_3_Template, 2, 2, "option", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    const j_r22 = ctx_r35.index;
    const entry_r21 = ctx_r35.$implicit;
    const i_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index;
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate2"]("id", "entry-", i_r18, "-", j_r22, "-sufix");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", entry_r21.sufix);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r24.categoriesOriginalValues);
  }
}

function SidebarComponent_div_0_ng_container_19_div_4_select_8_option_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const option_r37 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("value", option_r37.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](option_r37.name);
  }
}

function SidebarComponent_div_0_ng_container_19_div_4_select_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "select", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SidebarComponent_div_0_ng_container_19_div_4_select_8_Template_select_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r40);
      const entry_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      return entry_r21.prefix = $event;
    })("change", function SidebarComponent_div_0_ng_container_19_div_4_select_8_Template_select_change_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r40);
      const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      const entry_r21 = ctx_r42.$implicit;
      const j_r22 = ctx_r42.index;
      const i_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index;
      const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r41.changeEntry(entry_r21, i_r18, j_r22);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "option", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Select a Category for the Prefix");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, SidebarComponent_div_0_ng_container_19_div_4_select_8_option_3_Template, 2, 2, "option", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    const j_r22 = ctx_r45.index;
    const entry_r21 = ctx_r45.$implicit;
    const i_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index;
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate2"]("id", "entry-", i_r18, "-", j_r22, "-prefix");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", entry_r21.prefix);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r25.categoriesOriginalValues);
  }
}

const _c1 = function (a0, a1, a2) {
  return {
    "changed": a0,
    "deleted": a1,
    "new": a2
  };
};

const _c2 = function (a0, a1, a2, a3) {
  return {
    "fas": a0,
    "fa-angle-right": a1,
    "fa-angle-left": a2,
    "far fa-times-circle": a3
  };
};

const _c3 = function (a0, a1) {
  return {
    "entry-translation-half": a0,
    "entry-translation": a1
  };
};

function SidebarComponent_div_0_ng_container_19_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 32)(1, "input", 33, 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SidebarComponent_div_0_ng_container_19_div_4_Template_input_ngModelChange_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r47);
      const entry_r21 = restoredCtx.$implicit;
      return entry_r21.entryOriginal = $event;
    })("focus", function SidebarComponent_div_0_ng_container_19_div_4_Template_input_focus_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r47);
      const j_r22 = restoredCtx.index;
      const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
      return ctx_r48.selectedEntry = j_r22;
    })("ngModelChange", function SidebarComponent_div_0_ng_container_19_div_4_Template_input_ngModelChange_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r47);
      const entry_r21 = restoredCtx.$implicit;
      const j_r22 = restoredCtx.index;
      const i_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index;
      const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r49.changeEntry(entry_r21, i_r18, j_r22);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "label", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "i", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "input", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SidebarComponent_div_0_ng_container_19_div_4_Template_input_ngModelChange_5_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r47);
      const entry_r21 = restoredCtx.$implicit;
      return entry_r21.sefixButton = $event;
    })("change", function SidebarComponent_div_0_ng_container_19_div_4_Template_input_change_5_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r47);
      const entry_r21 = restoredCtx.$implicit;
      const j_r22 = restoredCtx.index;
      const i_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index;
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r52.activateSufix(entry_r21, i_r18, j_r22);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, SidebarComponent_div_0_ng_container_19_div_4_select_6_Template, 4, 4, "select", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "input", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SidebarComponent_div_0_ng_container_19_div_4_Template_input_ngModelChange_7_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r47);
      const entry_r21 = restoredCtx.$implicit;
      return entry_r21.entryTranslation = $event;
    })("focus", function SidebarComponent_div_0_ng_container_19_div_4_Template_input_focus_7_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r47);
      const j_r22 = restoredCtx.index;
      const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
      return ctx_r55.selectedEntry = j_r22;
    })("ngModelChange", function SidebarComponent_div_0_ng_container_19_div_4_Template_input_ngModelChange_7_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r47);
      const entry_r21 = restoredCtx.$implicit;
      const j_r22 = restoredCtx.index;
      const i_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index;
      const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r56.changeEntry(entry_r21, i_r18, j_r22);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, SidebarComponent_div_0_ng_container_19_div_4_select_8_Template, 4, 4, "select", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "input", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SidebarComponent_div_0_ng_container_19_div_4_Template_input_ngModelChange_9_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r47);
      const entry_r21 = restoredCtx.$implicit;
      return entry_r21.description = $event;
    })("focus", function SidebarComponent_div_0_ng_container_19_div_4_Template_input_focus_9_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r47);
      const j_r22 = restoredCtx.index;
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
      return ctx_r59.selectedEntry = j_r22;
    })("ngModelChange", function SidebarComponent_div_0_ng_container_19_div_4_Template_input_ngModelChange_9_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r47);
      const entry_r21 = restoredCtx.$implicit;
      const j_r22 = restoredCtx.index;
      const i_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index;
      const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r60.changeEntry(entry_r21, i_r18, j_r22);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "label", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "i", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "input", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SidebarComponent_div_0_ng_container_19_div_4_Template_input_change_12_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r47);
      const entry_r21 = restoredCtx.$implicit;
      const j_r22 = restoredCtx.index;
      const i_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index;
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      entry_r21.delete = true;
      return ctx_r62.changeEntry(entry_r21, i_r18, j_r22);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "label", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](14, "i", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "input", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SidebarComponent_div_0_ng_container_19_div_4_Template_input_change_15_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r47);
      const entry_r21 = restoredCtx.$implicit;
      const j_r22 = restoredCtx.index;
      const i_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index;
      const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      entry_r21.reset = true;
      return ctx_r64.changeEntry(entry_r21, i_r18, j_r22);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }

  if (rf & 2) {
    const entry_r21 = ctx.$implicit;
    const j_r22 = ctx.index;
    const i_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction3"](15, _c1, entry_r21.update == true, entry_r21.delete == true, entry_r21.id == null));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate2"]("id", "entry-", i_r18, "-", j_r22, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", entry_r21.entryOriginal);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction4"](19, _c2, entry_r21.sufix || entry_r21.prefix, entry_r21.sufix, entry_r21.prefix, !entry_r21.sufix && !entry_r21.prefix));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", entry_r21.sefixButton);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", entry_r21.sufix);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate2"]("id", "entry-", i_r18, "-", j_r22, "-trans");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction2"](24, _c3, entry_r21.sufix || entry_r21.prefix, !entry_r21.sufix && !entry_r21.prefix))("ngModel", entry_r21.entryTranslation);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", entry_r21.prefix);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate2"]("id", "entry-", i_r18, "-", j_r22, "-desc");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", entry_r21.description);
  }
}

const _c4 = function (a0) {
  return {
    "hidden": a0
  };
};

function SidebarComponent_div_0_ng_container_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r68 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "li", 16)(2, "div", 27, 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, SidebarComponent_div_0_ng_container_19_div_4_Template, 16, 27, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "input", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_ng_container_19_Template_input_click_6_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r68);
      const category_r17 = restoredCtx.$implicit;
      const i_r18 = restoredCtx.index;
      const ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r67.addEntry(category_r17, category_r17.id, i_r18);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const category_r17 = ctx.$implicit;
    const i_r18 = ctx.index;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](3, _c4, ctx_r3.selectOpenCategory != i_r18));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate1"]("id", "categoryDOM-", i_r18, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", category_r17.entries);
  }
}

function SidebarComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r70 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 3)(1, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, SidebarComponent_div_0_li_2_Template, 7, 2, "li", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "ul")(4, "li", 5)(5, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_Template_input_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r70);
      const ctx_r69 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return ctx_r69.saveModifications();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "input", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_Template_input_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r70);
      const ctx_r71 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return ctx_r71.openOutside(true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_Template_input_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r70);
      const ctx_r72 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return ctx_r72.openOutside(false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 9)(9, "ul", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, SidebarComponent_div_0_ng_container_10_Template, 4, 7, "ng-container", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "li")(12, "h1", 12)(13, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_Template_input_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r70);
      const ctx_r73 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return ctx_r73.addCategory();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 14)(15, "ul", 15)(16, "li", 16)(17, "p", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, " <- Select a category ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](19, SidebarComponent_div_0_ng_container_19_Template, 7, 5, "ng-container", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "ul")(21, "li", 5)(22, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_Template_input_click_22_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r70);
      const ctx_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return ctx_r74.saveModifications();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "input", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_Template_input_click_23_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r70);
      const ctx_r75 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return ctx_r75.openOutside(true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_Template_input_click_24_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r70);
      const ctx_r76 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return ctx_r76.openOutside(false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.dictionaries.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx_r0.saving);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.categories);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](6, _c4, ctx_r0.selectOpenCategory >= 0));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.categories);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx_r0.saving);
  }
}

let SidebarComponent = /*#__PURE__*/(() => {
  class SidebarComponent extends _form_service__WEBPACK_IMPORTED_MODULE_1__.FormService {
    constructor(api, route) {
      super(api);
      this.api = api;
      this.route = route;
      this.Sidebar2Chapter = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
      this.dictionaries = [];
      this.categories = [];
      this.dictionarySelector = '';
      this.shortcuts = [];
      this.selectOpenCategory = -1;
      this.selectedEntry = -1;

      this.getSelectedEntryType = inputId => {
        let explode = inputId.split('-');

        if (!explode[3]) {
          return '';
        } else {
          return '-' + explode[3];
        }
      };

      this.moveFocus = (id, output) => {
        let el = document.getElementById(id);

        if (el) {
          el.focus();
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
        } else {
          console.error(id);
        }
      };

      this.moveCurrentCategory = output => {
        let id = 'category-' + this.selectOpenCategory;
        this.moveFocus(id, output);
      };

      this.moveCurrentEntry = (entryType = '', output) => {
        let id = 'entry-' + this.selectOpenCategory + '-' + this.selectedEntry + entryType;
        this.moveFocus(id, output);
      };

      this.saving = false;
    }

    ngOnInit() {
      this.idNovel = this.route.snapshot.params.idNovel;
      this.api.Dictionary.getAll({
        idNovel: this.idNovel
      }).then(dictionaries => {
        this.dictionaries = dictionaries;
        this.dictionarySelector = dictionaries[0].id;
        this.dictionarySelected(this.dictionarySelector);
      });
    }

    changeEntryTarget(entry, i, j, target) {
      if (target) {
        const els = target.id.split('-');

        if (els[0] == 'entry') {
          switch (els[3]) {
            case 'sufix':
              entry.sufix = parseInt(target.value);
              break;

            case 'prefix':
              entry.prefix = parseInt(target.value);
              break;

            case 'desc':
              entry.description = target.value;
              break;

            case 'trans':
              entry.entryTranslation = target.value;
              break;

            default:
              entry.entryOriginal = target.value;
          }
        }
      }

      this.changeEntry(entry, i, j);
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

    dictionarySelected(idDictionary) {
      this.idDictionary = idDictionary;
      this.getCache();
    }

    getCache() {
      if (this.categories.length === 0) {
        this.api.Dictionary.getCache(this.idDictionary).then(status => {
          this.PrepareCacheThenTranslate(status);
        });
      } else {
        this.refreshTranslation();
      }
    }

    PrepareCacheThenTranslate(status) {
      if (status) {
        const loadedDictionary = new Promise((resolveDic, rejectDic) => {
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

    saveModifications() {
      this.saving = true;
      this.api.Dictionary.fullSave(this.idDictionary, this.categories).then(res => {
        this.categories = [];
        this.getCache();
        this.refreshTranslation();
        this.saving = false;
      }).catch(res => {
        this.saving = false;
        console.error(res);
      });
    }

    openOutside(translate) {
      const no = this.route.snapshot.params.noChapter;
      let url = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.backendServer}/static/${this.idNovel}/${this.idDictionary}/${no}/`;

      if (translate) {
        url = 'https://translate.google.com/translate?sl=auto&tl=en&u=' + url;
      }

      window.open(url);
    }

    textPointer(catIdx, entIdx) {
      this.selectOpenCategory = catIdx;
      this.selectedEntry = entIdx;
      setTimeout(() => {
        this.moveCurrentEntry('');
      }, 100);
    }

    activateSufix(entry, catIdx, entIdx) {
      switch (true) {
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

    ngAfterViewInit() {
      this.shortcuts.push({
        key: ["f5"],
        preventDefault: true,
        label: "Dictionary",
        description: "Refresh Translation",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          this.refreshTranslation();
        }
      }, {
        key: ["f4"],
        preventDefault: true,
        label: "Dictionary",
        description: "Refresh to Original",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          this.refreshOriginal();
        }
      }, {
        key: ["ctrl + s"],
        preventDefault: true,
        label: "Dictionary",
        description: "Save Modifications",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          this.saveModifications();
        }
      }, {
        key: ["ctrl + up", "ctrl + alt + up"],
        preventDefault: true,
        label: "Categories",
        description: "Category Up",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          this.selectedEntry = -1;

          if (this.selectOpenCategory > 0) {
            this.selectOpenCategory--;
          } else {
            this.selectOpenCategory = this.categories.length - 1;
          }

          this.moveCurrentCategory(output);
        }
      }, {
        key: ["ctrl + down", "ctrl + alt + down"],
        preventDefault: true,
        label: "Categories",
        description: "Category Down",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          this.selectedEntry = -1;

          if (this.selectOpenCategory < this.categories.length - 1) {
            this.selectOpenCategory++;
          } else {
            this.selectOpenCategory = 0;
          }

          this.moveCurrentCategory(output);
        }
      }, {
        key: ["ctrl + alt + plus", "ctrl + alt + n"],
        preventDefault: true,
        label: "Categories",
        description: "Add New Category",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          this.addCategory();
          this.selectOpenCategory = this.categories.length - 1;
          setTimeout(() => {
            this.moveCurrentCategory(output);
          }, 100);
        }
      }, {
        key: "alt + down",
        preventDefault: true,
        label: "Entries",
        description: "Move Down on Entry List",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          if (this.selectOpenCategory < 0) {
            this.selectOpenCategory = 0;
          }

          if (this.categories[this.selectOpenCategory].entries) {
            if (this.selectedEntry >= this.categories[this.selectOpenCategory].entries.length - 1) {
              this.selectedEntry = 0;
            } else {
              this.selectedEntry++;
            }

            let target = output.event.target;
            let entryType = target.id ? this.getSelectedEntryType(target.id) : '';

            if (entryType == '-sufix' && !this.categories[this.selectOpenCategory].entries[this.selectedEntry].sufix || entryType == '-prefix' && !this.categories[this.selectOpenCategory].entries[this.selectedEntry].prefix) {
              entryType = '-trans';
            }

            this.moveCurrentEntry(entryType, output);
          }
        }
      }, {
        key: "alt + up",
        preventDefault: true,
        label: "Entries",
        description: "Move Up on Entry List",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          if (this.selectOpenCategory < 0) {
            this.selectOpenCategory = 0;
          }

          if (this.categories[this.selectOpenCategory].entries) {
            if (this.selectedEntry <= 0) {
              this.selectedEntry = this.categories[this.selectOpenCategory].entries.length - 1;
            } else {
              this.selectedEntry--;
            }

            let target = output.event.target;
            let entryType = target.id ? this.getSelectedEntryType(target.id) : '';

            if (entryType == '-sufix' && !this.categories[this.selectOpenCategory].entries[this.selectedEntry].sufix || entryType == '-prefix' && !this.categories[this.selectOpenCategory].entries[this.selectedEntry].prefix) {
              entryType = '-trans';
            }

            this.moveCurrentEntry(entryType, output);
          }
        }
      }, {
        key: "alt + right",
        preventDefault: true,
        label: "Entries",
        description: "Move Right on Entry List",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          if (this.selectOpenCategory < 0) {
            return;
          }

          if (!this.categories[this.selectOpenCategory].entries) return;
          let target = output.event.target;
          if (target.id.indexOf('entry-') !== 0) return;
          let entryType = target.id ? this.getSelectedEntryType(target.id) : '';

          switch (entryType) {
            case '':
              if (this.categories[this.selectOpenCategory].entries[this.selectedEntry].sufix) {
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
      }, {
        key: "alt + left",
        preventDefault: true,
        label: "Entries",
        description: "Move Left on Entry List",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          if (this.selectOpenCategory < 0) {
            return;
          }

          if (!this.categories[this.selectOpenCategory].entries) return;
          let target = output.event.target;
          if (target.id.indexOf('entry-') !== 0) return;
          let entryType = target.id ? this.getSelectedEntryType(target.id) : '';

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
      }, {
        key: ["alt + home", "alt + 1"],
        preventDefault: true,
        label: "Entries",
        description: "Move to First Entry",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          if (this.selectOpenCategory < 0) {
            this.selectOpenCategory = 0;
          }

          if (this.categories[this.selectOpenCategory].entries) {
            this.selectedEntry = 0;
            let target = output.event.target;
            let entryType = target.id ? this.getSelectedEntryType(target.id) : '';
            this.moveCurrentEntry(entryType, output);
          }
        }
      }, {
        key: "alt + end",
        preventDefault: true,
        label: "Entries",
        description: "Move to Last Entry",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          if (this.selectOpenCategory < 0) {
            this.selectOpenCategory = 0;
          }

          if (this.categories[this.selectOpenCategory].entries) {
            this.selectedEntry = this.categories[this.selectOpenCategory].entries.length - 1;
            let target = output.event.target;
            let entryType = target.id ? this.getSelectedEntryType(target.id) : '';
            this.moveCurrentEntry(entryType, output);
          }
        }
      }, {
        key: ["alt + plus", "alt + insert", "alt + n"],
        preventDefault: true,
        label: "Entries",
        description: "Add New Entry",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          if (this.selectOpenCategory < 0) {
            return;
          }

          this.addEntry(this.categories[this.selectOpenCategory], this.categories[this.selectOpenCategory].id, this.selectOpenCategory);
          this.selectedEntry = this.categories[this.selectOpenCategory].entries.length - 1;
          setTimeout(() => {
            this.moveCurrentEntry('', output);
          }, 100);
        }
      }, {
        key: ["ctrl + d", "alt + d"],
        preventDefault: true,
        label: "Entries",
        description: "Duplicate Entry",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          if (this.selectOpenCategory < 0) {
            return;
          }

          if (this.selectedEntry < 0) {
            return;
          }

          this.duplicateEntry(this.categories[this.selectOpenCategory], this.categories[this.selectOpenCategory].id, this.selectOpenCategory, this.categories[this.selectOpenCategory].entries[this.selectedEntry]);
        }
      }, {
        key: ["alt + -", "alt + d"],
        preventDefault: true,
        label: "Entries",
        description: "Remove Entry",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          if (this.selectOpenCategory < 0) {
            return;
          }

          if (this.selectedEntry < 0) {
            return;
          }

          let entryform = this.categories[this.selectOpenCategory].entries[this.selectedEntry];
          entryform.delete = !entryform.delete;
        }
      }, {
        key: ["alt + *", "alt + r"],
        preventDefault: true,
        label: "Entries",
        description: "Return Entry to normal",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          if (this.selectOpenCategory < 0) {
            return;
          }

          if (this.selectedEntry < 0) {
            return;
          }

          let entryform = this.categories[this.selectOpenCategory].entries[this.selectedEntry];
          entryform.reset = true;
          this.changeEntry(entryform, this.selectOpenCategory, this.selectedEntry);
          setTimeout(() => {
            let target = output.event.target;
            let id = target.id;
            this.moveFocus(id);
          }, 100);
        }
      }, {
        key: ["alt + s"],
        preventDefault: true,
        label: "Entries",
        description: "Toggle Suffix/Prefix",
        allowIn: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.ContentEditable, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Input, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Select, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.AllowIn.Textarea],
        command: output => {
          if (this.selectOpenCategory < 0) {
            return;
          }

          if (this.selectedEntry < 0) {
            return;
          }

          let entryform = this.categories[this.selectOpenCategory].entries[this.selectedEntry];
          this.activateSufix(entryform, this.selectOpenCategory, this.selectedEntry);
        }
      }); //this.keyboard.select("ctrl + alt + u").subscribe(e => console.log(e));
    }

  }

  SidebarComponent.ɵfac = function SidebarComponent_Factory(t) {
    return new (t || SidebarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_api__WEBPACK_IMPORTED_MODULE_2__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute));
  };

  SidebarComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: SidebarComponent,
    selectors: [["app-chapter-sidebar"]],
    viewQuery: function SidebarComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.KeyboardShortcutsComponent, 5);
      }

      if (rf & 2) {
        let _t;

        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.keyboard = _t.first);
      }
    },
    outputs: {
      Sidebar2Chapter: "Sidebar2Chapter"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]],
    decls: 3,
    vars: 4,
    consts: [["class", "dictionaryList", 4, "ngIf"], [3, "shortcuts"], [3, "key", "title"], [1, "dictionaryList"], ["class", "dictionary-selector", 4, "ngIf"], [1, "dictionary-buttons"], ["type", "button", "value", "Save Modifications", 1, "button", "is-small", "is-danger", 3, "disabled", "click"], ["type", "button", "value", "Google Translate", 1, "button", "is-small", "is-info", 3, "click"], ["type", "button", "value", "Open Keyword Translated Raw", 1, "button", "is-small", "is-warning", 3, "click"], [1, "interactiveBox"], [1, "categories"], [4, "ngFor", "ngForOf"], [1, "categoryButtonRow"], ["type", "button", "value", "+ Add new Category", 1, "button", "is-small", "is-primary", 3, "click"], [1, "entries"], [1, "entries-container"], [3, "ngClass"], [1, "hint"], [1, "dictionary-selector"], ["type", "button", "value", "Refresh Translation", 1, "button", "is-small", "is-info", 3, "click"], ["type", "button", "value", "Refresh to Original", 1, "button", "is-small", "is-warning", 3, "click"], [1, "select", 3, "ngModel", "ngModelChange", "change"], ["value", "", "selected", "selected"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [3, "ngClass", "click"], ["type", "text", "placeholder", "Category Name", 1, "category-name", 3, "ngModel", "id", "ngModelChange"], [1, "category-entry-container", 3, "id"], ["categoryDOM", ""], ["class", "entry", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "entry-spacer"], ["type", "button", "value", "+ Add new Entry", 1, "addNewEntryButton", 3, "click"], [1, "entry", 3, "ngClass"], ["type", "text", "placeholder", "Original", 1, "entry-original", 3, "ngModel", "id", "ngModelChange", "focus"], ["entry", ""], [1, "sufixButton", "sidebarButton"], ["type", "checkbox", "title", "Toggle suffix/prefix on/off", 1, "hidden", 3, "ngModel", "ngModelChange", "change"], ["class", "select", 3, "ngModel", "id", "ngModelChange", "change", 4, "ngIf"], ["type", "text", "placeholder", "Translation", 3, "ngClass", "ngModel", "id", "ngModelChange", "focus"], ["type", "text", "placeholder", "Description", 1, "entry-description", 3, "ngModel", "id", "ngModelChange", "focus"], [1, "deleteButton", "sidebarButton"], [1, "fas", "fa-trash"], ["type", "checkbox", "title", "Delete", 1, "hidden", 3, "change"], [1, "resetButton", "sidebarButton"], [1, "fas", "fa-sync-alt"], ["type", "checkbox", "title", "Reset", 1, "hidden", 3, "change"], [1, "select", 3, "ngModel", "id", "ngModelChange", "change"], ["disabled", "disabled"]],
    template: function SidebarComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, SidebarComponent_div_0_Template, 25, 8, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "ng-keyboard-shortcuts", 1)(2, "ng-keyboard-shortcuts-help", 2);
      }

      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.dictionaries.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("shortcuts", ctx.shortcuts);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("key", "f1")("title", "Shortcut Keys");
      }
    },
    directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgSelectMultipleOption"], _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.CheckboxControlValueAccessor, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.KeyboardShortcutsComponent, ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_4__.KeyboardShortcutsHelpComponent],
    styles: [".dictionaryList[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow-y: hidden;\n}\n.dictionaryList[_ngcontent-%COMP%]    > ul[_ngcontent-%COMP%] {\n  flex-grow: 0;\n  flex-basis: 25px;\n  height: 30px;\n}\n.dictionaryList[_ngcontent-%COMP%]   .dictionary-selector[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  width: 100%;\n}\n.dictionaryList[_ngcontent-%COMP%]   .dictionary-selector[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  width: 33.3%;\n  height: 100%;\n}\n.dictionaryList[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  align-self: flex-end;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  overflow-y: hidden;\n  flex-grow: 1;\n  flex-basis: auto;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%] {\n  color: white;\n  background: rgba(255, 255, 255, 0.5);\n  float: left;\n  line-height: 1.4;\n  animation-duration: 0.05s;\n  animation-name: categoriesHide;\n  width: 50px;\n}\n@keyframes categoriesShow {\n  from {\n    width: 50px;\n  }\n  to {\n    width: 150px;\n  }\n}\n@keyframes categoriesHide {\n  from {\n    width: 150px;\n  }\n  to {\n    width: 50px;\n  }\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%]:hover {\n  animation-duration: 0.05s;\n  animation-name: categoriesShow;\n  width: 150px;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  height: 30px;\n  width: 100%;\n  background: #2f0050;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%]   h1.changed[_ngcontent-%COMP%] {\n  background: #009013;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%]   h1.new[_ngcontent-%COMP%] {\n  background: #000063;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%]   h1.categoryButtonRow[_ngcontent-%COMP%] {\n  background: #00d1b2;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%]   h1.categoryButtonRow[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  background: transparent;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%]   .category-name[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: 0px solid white;\n  color: white;\n  outline-width: 0px;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%]   .category-selected[_ngcontent-%COMP%] {\n  border-width: 2px 0px 2px 5px;\n  border-style: solid;\n  border-color: red;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  padding: left 10;\n  float: left;\n  overflow: hidden;\n  z-index: 1;\n  background-color: #5e009f;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .hint[_ngcontent-%COMP%] {\n  background: black;\n  color: white;\n  height: 100%;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%] {\n  height: 100%;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  height: 100%;\n  position: relative;\n  overflow-x: auto;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%] {\n  flex-direction: row;\n  overflow-y: auto;\n  overflow-x: hidden;\n  height: 100%;\n  height: calc(100% - 30px);\n  width: 100%;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 630px;\n  height: 25px;\n  display: flex;\n  flex-direction: row;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]:focus {\n  background-color: rgba(255, 255, 255, 0.3) !important;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: 0px solid white;\n  color: white;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   .entry-original[_ngcontent-%COMP%], .dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   .entry-translation[_ngcontent-%COMP%], .dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   .sidebarButton[_ngcontent-%COMP%], .dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   .select[_ngcontent-%COMP%] {\n  flex-grow: 0;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   .entry-original[_ngcontent-%COMP%] {\n  flex-basis: 100px;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   .entry-translation[_ngcontent-%COMP%], .dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   .entry-translation-half[_ngcontent-%COMP%] {\n  min-width: 30px;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   .entry-translation[_ngcontent-%COMP%] {\n  flex-basis: 150px;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   .entry-translation-half[_ngcontent-%COMP%] {\n  flex-basis: 75px;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   .entry-description[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   .select[_ngcontent-%COMP%] {\n  flex-basis: 75px;\n  max-width: 75px;\n  color: white;\n  background-color: black;\n  outline: 0px solid #000;\n  border: 0px solid #000;\n  height: 100%;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   .select[_ngcontent-%COMP%]:focus {\n  outline: 1px solid blue;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   .sufixButton[_ngcontent-%COMP%] {\n  color: pink;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   .deleteButton[_ngcontent-%COMP%] {\n  color: red;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   .resetButton[_ngcontent-%COMP%] {\n  color: blue;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   .sidebarButton[_ngcontent-%COMP%] {\n  flex-basis: 14px;\n  margin: 0px 8px;\n  text-align: center;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]:after {\n  clear: both;\n  content: \"\";\n  display: block;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]:nth-child(odd) {\n  background-color: #555;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]:nth-child(even) {\n  background-color: #888;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry.changed[_ngcontent-%COMP%] {\n  background-color: green;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry.new[_ngcontent-%COMP%] {\n  background-color: #000063;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .category-entry-container[_ngcontent-%COMP%]   .entry.deleted[_ngcontent-%COMP%] {\n  background-color: #480000;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .entry-spacer[_ngcontent-%COMP%] {\n  height: 200px;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .entries-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .addNewEntryButton[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0px;\n  left: 0px;\n  width: 100%;\n  height: 30px;\n  text-align: left;\n  border-width: 2px 0;\n  border-color: #009013;\n  background-color: #000;\n  color: #fff;\n}\n.dictionaryList[_ngcontent-%COMP%]   .hidden[_ngcontent-%COMP%] {\n  display: none;\n}\n.dictionaryList[_ngcontent-%COMP%]   .dictionary-buttons[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.dictionaryList[_ngcontent-%COMP%]   .dictionary-buttons[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  width: 33.3%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZGViYXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FBQ0o7QUFDSTtFQUNJLFlBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7QUFDUjtBQUVJO0VBQ0ksc0JBQUE7RUFDQSxXQUFBO0FBQVI7QUFFUTtFQUNJLFlBQUE7RUFDQSxZQUFBO0FBQVo7QUFJSTtFQUNJLG9CQUFBO0FBRlI7QUFLSTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FBSFI7QUFLUTtFQVVJLFlBQUE7RUFDQSxvQ0FBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUVBLHlCQUFBO0VBQ0EsOEJBQUE7RUFDQSxXQUFBO0FBYlo7QUFIWTtFQUNJO0lBQU8sV0FBQTtFQU1yQjtFQUxjO0lBQUssWUFBQTtFQVFuQjtBQUNGO0FBUFk7RUFDSTtJQUFPLFlBQUE7RUFVckI7RUFUYztJQUFLLFdBQUE7RUFZbkI7QUFDRjtBQURZO0VBQ0kseUJBQUE7RUFDQSw4QkFBQTtFQUNBLFlBQUE7QUFHaEI7QUFBWTtFQUNJLFlBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7QUFFaEI7QUFDWTtFQUNJLG1CQUFBO0FBQ2hCO0FBRVk7RUFDSSxtQkFBQTtBQUFoQjtBQUdZO0VBQ0ksbUJBQUE7QUFEaEI7QUFHZ0I7RUFDSSx1QkFBQTtBQURwQjtBQUtZO0VBQ0ksNkJBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFFQSxrQkFBQTtBQUpoQjtBQU9ZO0VBQ0ksNkJBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0FBTGhCO0FBU1E7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsVUFBQTtFQUNBLHlCQUFBO0FBUFo7QUFTWTtFQUNJLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QUFQaEI7QUFVWTtFQUNJLFlBQUE7QUFSaEI7QUFVZ0I7RUFDSSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQVJwQjtBQVVvQjtFQUNJLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLFdBQUE7QUFSeEI7QUFVd0I7RUFDSSxzQkFBQTtBQVI1QjtBQVd3QjtFQUNJLFdBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUFUNUI7QUFXNEI7RUFDSSxxREFBQTtBQVRoQztBQVk0QjtFQUNJLDZCQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0FBVmhDO0FBYzRCOzs7O0VBSUksWUFBQTtBQVpoQztBQWM0QjtFQUNJLGlCQUFBO0FBWmhDO0FBZTRCOztFQUVJLGVBQUE7QUFiaEM7QUFlNEI7RUFDSSxpQkFBQTtBQWJoQztBQWU0QjtFQUNJLGdCQUFBO0FBYmhDO0FBZ0I0QjtFQUNJLFlBQUE7QUFkaEM7QUFpQjRCO0VBQ0ksZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsdUJBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7QUFmaEM7QUFpQjRCO0VBQ0ksdUJBQUE7QUFmaEM7QUFpQjRCO0VBQ0ksV0FBQTtBQWZoQztBQWtCNEI7RUFDSSxVQUFBO0FBaEJoQztBQW1CNEI7RUFDSSxXQUFBO0FBakJoQztBQW1CNEI7RUFDSSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQWpCaEM7QUFxQndCO0VBQ0ksV0FBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0FBbkI1QjtBQXNCd0I7RUFDSSxzQkFBQTtBQXBCNUI7QUF1QndCO0VBQ0ksc0JBQUE7QUFyQjVCO0FBd0J3QjtFQUNJLHVCQUFBO0FBdEI1QjtBQXlCd0I7RUFDSSx5QkFBQTtBQXZCNUI7QUEwQndCO0VBQ0kseUJBQUE7QUF4QjVCO0FBNkJvQjtFQUNJLGFBQUE7QUEzQnhCO0FBOEJvQjtFQUNJLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtBQTVCeEI7QUFtQ0k7RUFDSSxhQUFBO0FBakNSO0FBb0NJO0VBQ0ksV0FBQTtBQWxDUjtBQW9DUTtFQUNJLFlBQUE7RUFDQSxZQUFBO0FBbENaIiwiZmlsZSI6InNpZGViYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGljdGlvbmFyeUxpc3Qge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgb3ZlcmZsb3cteTpoaWRkZW47XG5cbiAgICAmID4gdWwge1xuICAgICAgICBmbGV4LWdyb3c6IDA7XG4gICAgICAgIGZsZXgtYmFzaXM6IDI1cHg7XG4gICAgICAgIGhlaWdodDogMzBweDtcbiAgICB9XG5cbiAgICAuZGljdGlvbmFyeS1zZWxlY3RvciB7XG4gICAgICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgICAgICY+KiB7XG4gICAgICAgICAgICB3aWR0aDogMzMuMyU7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsaTpsYXN0LWNoaWxkIHtcbiAgICAgICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XG4gICAgfVxuXG4gICAgLmludGVyYWN0aXZlQm94IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgb3ZlcmZsb3cteTpoaWRkZW47XG4gICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgZmxleC1iYXNpczogYXV0bztcblxuICAgICAgICAuY2F0ZWdvcmllcyB7XG4gICAgICAgICAgICBAa2V5ZnJhbWVzIGNhdGVnb3JpZXNTaG93IHtcbiAgICAgICAgICAgICAgICBmcm9tIHsgd2lkdGg6IDUwcHg7IH1cbiAgICAgICAgICAgICAgICB0byB7IHdpZHRoOiAxNTBweDsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQGtleWZyYW1lcyBjYXRlZ29yaWVzSGlkZSB7XG4gICAgICAgICAgICAgICAgZnJvbSB7IHdpZHRoOiAxNTBweDsgfVxuICAgICAgICAgICAgICAgIHRvIHsgd2lkdGg6IDUwcHg7IH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMS40O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IDAuMDVzO1xuICAgICAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGNhdGVnb3JpZXNIaWRlO1xuICAgICAgICAgICAgd2lkdGg6IDUwcHg7XG5cbiAgICAgICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMC4wNXM7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGNhdGVnb3JpZXNTaG93O1xuICAgICAgICAgICAgICAgIHdpZHRoOjE1MHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBoMSB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICMyZjAwNTA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGgxLmNoYW5nZWQge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICMwMDkwMTM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGgxLm5ldyB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogIzAwMDA2MztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaDEuY2F0ZWdvcnlCdXR0b25Sb3cge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICMwMGQxYjI7XG5cbiAgICAgICAgICAgICAgICBpbnB1dCB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmNhdGVnb3J5LW5hbWUge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgIGJvcmRlcjogMHB4IHNvbGlkIHdoaXRlO1xuICAgICAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgICAgICAvL21hcmdpbi1sZWZ0OjE1cHg7XG4gICAgICAgICAgICAgICAgb3V0bGluZS13aWR0aDogMHB4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuY2F0ZWdvcnktc2VsZWN0ZWQge1xuICAgICAgICAgICAgICAgIGJvcmRlci13aWR0aDogMnB4IDBweCAycHggNXB4O1xuICAgICAgICAgICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiByZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAuZW50cmllcyB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIHBhZGRpbmc6IGxlZnQgMTA7XG4gICAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICB6LWluZGV4OjE7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWUwMDlmO1xuXG4gICAgICAgICAgICAuaGludCB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogYmxhY2s7XG4gICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgICAgIGhlaWdodDoxMDAlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuZW50cmllcy1jb250YWluZXIge1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcblxuICAgICAgICAgICAgICAgIGxpIHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICAgICAgICAgIG92ZXJmbG93LXg6IGF1dG87XG5cbiAgICAgICAgICAgICAgICAgICAgLmNhdGVnb3J5LWVudHJ5LWNvbnRhaW5lciB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjpyb3c7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAzMHB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOjEwMCU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3gtc2l6aW5nOmJvcmRlci1ib3g7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC5lbnRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluLXdpZHRoOjYzMHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDoyNXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYgKjpmb2N1c3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC4zKSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDBweCBzb2xpZCB3aGl0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmVudHJ5LW9yaWdpbmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lbnRyeS10cmFuc2xhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2lkZWJhckJ1dHRvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleC1ncm93OjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lbnRyeS1vcmlnaW5hbCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXgtYmFzaXM6IDEwMHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lbnRyeS10cmFuc2xhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZW50cnktdHJhbnNsYXRpb24taGFsZntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluLXdpZHRoOiAzMHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZW50cnktdHJhbnNsYXRpb24ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4LWJhc2lzOiAxNTBweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmVudHJ5LXRyYW5zbGF0aW9uLWhhbGYge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4LWJhc2lzOiA3NXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lbnRyeS1kZXNjcmlwdGlvbiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXgtZ3JvdzoxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3Qge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4LWJhc2lzOiA3NXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXgtd2lkdGg6IDc1cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOndoaXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0bGluZTogMHB4IHNvbGlkICMwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMHB4IHNvbGlkICMwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDoxMDAlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0OmZvY3VzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0bGluZTogMXB4IHNvbGlkIGJsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWZpeEJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBwaW5rO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWxldGVCdXR0b24ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogcmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXNldEJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBibHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2lkZWJhckJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXgtYmFzaXM6MTRweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAwcHggOHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC5lbnRyeTphZnRlciB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXI6IGJvdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLmVudHJ5Om50aC1jaGlsZChvZGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU1O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAuZW50cnk6bnRoLWNoaWxkKGV2ZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODg4O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAuZW50cnkuY2hhbmdlZCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC5lbnRyeS5uZXcge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwNjM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC5lbnRyeS5kZWxldGVkIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDgwMDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAuZW50cnktc3BhY2VyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjAwcHg7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAuYWRkTmV3RW50cnlCdXR0b24ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAwcHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwcHg7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMzBweDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXItd2lkdGg6IDJweCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiAjMDA5MDEzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiNmZmY7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuaGlkZGVuIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbiAgICAuZGljdGlvbmFyeS1idXR0b25zIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG5cbiAgICAgICAgJj4qIHtcbiAgICAgICAgICAgIHdpZHRoOiAzMy4zJTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0= */"]
  });
  return SidebarComponent;
})();

/***/ }),

/***/ 71670:
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ })

}]);
//# sourceMappingURL=src_app_chapter_index_ts.js.map