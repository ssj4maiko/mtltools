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





const routes = [
    {
        path: '',
        component: _list_list_component__WEBPACK_IMPORTED_MODULE_0__.ListComponent,
        data: { title: 'List Chapters' }
    },
    {
        path: 'dictionary',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_cache_service_ts"), __webpack_require__.e("default-src_app_dictionary_index_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../dictionary */ 84341)).then(m => m.DictionaryModule),
        data: { title: 'View dictionary', breadcrumb: 'Dictionaries' }
    },
    {
        path: ':noChapter',
        component: _detail_detail_component__WEBPACK_IMPORTED_MODULE_1__.DetailComponent
        // ,loadChildren: () => ChapterModule
        ,
        data: { title: 'View chapter', breadcrumb: 'View Chapter' }
    },
    {
        path: '**',
        redirectTo: ''
    }
];
class ChapterRoutingModule {
}
ChapterRoutingModule.ɵfac = function ChapterRoutingModule_Factory(t) { return new (t || ChapterRoutingModule)(); };
ChapterRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: ChapterRoutingModule });
ChapterRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ChapterRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);










class ChapterModule {
}
ChapterModule.ɵfac = function ChapterModule_Factory(t) { return new (t || ChapterModule)(); };
ChapterModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: ChapterModule });
ChapterModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _chapter_routing_module__WEBPACK_IMPORTED_MODULE_0__.ChapterRoutingModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ChapterModule, { declarations: [_list_list_component__WEBPACK_IMPORTED_MODULE_1__.ListComponent,
        _detail_detail_component__WEBPACK_IMPORTED_MODULE_2__.DetailComponent,
        _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_3__.SidebarComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _chapter_routing_module__WEBPACK_IMPORTED_MODULE_0__.ChapterRoutingModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule] }); })();
_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetComponentScope"](_detail_detail_component__WEBPACK_IMPORTED_MODULE_2__.DetailComponent, [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLinkWithHref, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgTemplateOutlet, _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_3__.SidebarComponent], []);


/***/ }),

/***/ 82319:
/*!****************************************************!*\
  !*** ./src/app/chapter/detail/detail.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DetailComponent": () => (/* binding */ DetailComponent)
/* harmony export */ });
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sidebar/sidebar.component */ 66061);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 34497);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api */ 39354);





const _c0 = function (a1, a2) { return ["/novel/", a1, a2]; };
function DetailComponent_ng_template_2_a_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Previous ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](1, _c0, ctx_r5.idNovel, ctx_r5.chapterPrevious.no));
} }
function DetailComponent_ng_template_2_a_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Next ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](1, _c0, ctx_r6.idNovel, ctx_r6.chapterNext.no));
} }
const _c1 = function (a1) { return ["/novel/", a1]; };
function DetailComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, DetailComponent_ng_template_2_a_2_Template, 2, 4, "a", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " Table of Contents ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, DetailComponent_ng_template_2_a_7_Template, 2, 4, "a", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.chapterPrevious);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c1, ctx_r1.idNovel));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.chapterNext);
} }
function DetailComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](0);
} }
function DetailComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "h1", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.renderedTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("innerHTML", ctx_r3.renderedText, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
} }
function DetailComponent_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](0);
} }
class DetailComponent {
    constructor(router, route, sanitized, api) {
        this.router = router;
        this.route = route;
        this.sanitized = sanitized;
        this.api = api;
        this.showSidebar = true;
    }
    ngOnInit() {
        this.loadedChapter = new Promise((resolve) => {
            this.loadedChapterResolve = resolve;
        });
        this.startContent();
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
        Promise.all([
            this.api.Novel.get({ id: this.idNovel }),
            this.api.Chapter.get({ idNovel: this.idNovel, no: this.noChapter, text: true })
        ]).then((values) => {
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
    translateText(categories) {
        // In case the dictionary comes first, then let it wait for the chapter
        this.loadedChapter.then(_ => {
            this.renderDataView();
            if (categories.length > 0) {
                const entries = [];
                categories.forEach(category => {
                    category.entries.forEach(entry => {
                        const length = entry.entryOriginal.length;
                        if (!entries[length]) {
                            entries[length] = [];
                        }
                        entries[length].push({
                            entryOriginal: entry.entryOriginal,
                            entryTranslation: entry.entryTranslation,
                            idEntry: entry.id,
                            idCategory: category.id,
                            category: category.name,
                        });
                    });
                });
                for (let i = entries.length; i > 0; --i) {
                    if (entries[i]) {
                        entries[i].forEach(entry => {
                            // console.log('Change ', entry.entryOriginal, entry.entryTranslation);
                            const regex = new RegExp(entry.entryOriginal, 'g');
                            this.renderedTitle = this.renderedTitle.replace(regex, '\[\[' + entry.entryTranslation + '\]\]');
                            this.renderedText = this.renderedText.replace(regex, '\[\[' + entry.entryTranslation + '\]\]');
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
            }
        });
    }
    toogleSidebar() {
        if (this.showSidebar)
            this.showSidebar = false;
        else
            this.showSidebar = true;
    }
}
DetailComponent.ɵfac = function DetailComponent_Factory(t) { return new (t || DetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_api__WEBPACK_IMPORTED_MODULE_1__.ApiService)); };
DetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: DetailComponent, selectors: [["app-chapter-detail"]], viewQuery: function DetailComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__.SidebarComponent, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.Sidebar = _t.first);
    } }, decls: 11, vars: 4, consts: [[1, "flexContent"], [1, "content"], ["controlButtons", ""], [4, "ngTemplateOutlet"], [4, "ngIf"], [1, "show-sidebar", 3, "click"], [1, "sidebar", 3, "hidden"], [3, "Sidebar2Chapter"], [1, "columns", "controlButtons"], [1, "column"], ["class", "button is-large is-primary", 3, "routerLink", 4, "ngIf"], [1, "button", "is-large", "is-primary", 3, "routerLink"], [1, "title"], [1, "novel-content", 3, "innerHTML"]], template: function DetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, DetailComponent_ng_template_2_Template, 8, 5, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, DetailComponent_ng_container_4_Template, 1, 0, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, DetailComponent_ng_container_5_Template, 5, 2, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, DetailComponent_ng_container_6_Template, 1, 0, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DetailComponent_Template_div_click_7_listener() { return ctx.toogleSidebar(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "AHHHHHHH");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "app-chapter-sidebar", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("Sidebar2Chapter", function DetailComponent_Template_app_chapter_sidebar_Sidebar2Chapter_10_listener($event) { return ctx.translateText($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutlet", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.chapter);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutlet", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("hidden", !ctx.showSidebar);
    } }, styles: [".controlButtons[_ngcontent-%COMP%] {\n  margin-top: 1px;\n}\n.controlButtons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: center;\n}\n.title[_ngcontent-%COMP%], .novel-content[_ngcontent-%COMP%] {\n  color: white;\n}\n.flexContent[_ngcontent-%COMP%] {\n  display: flexbox;\n  flex-direction: row;\n  width: 100%;\n  height: 100%;\n}\n.flexContent[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%] {\n  width: calc(100% - 500px);\n  height: 100%;\n}\n.flexContent[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n  z-index: 20;\n  width: 500px;\n  position: fixed;\n  height: 100%;\n  right: 0px;\n  top: 0px;\n  bottom: 0px;\n  overflow-y: auto;\n  background: #5e009f;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7QUFDSjtBQUFJO0VBQ0ksV0FBQTtFQUNBLGtCQUFBO0FBRVI7QUFDQTtFQUNJLFlBQUE7QUFFSjtBQUFBO0VBQ0ksZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBR0o7QUFGSTtFQUNJLHlCQUFBO0VBQ0EsWUFBQTtBQUlSO0FBRkk7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQUlSIiwiZmlsZSI6ImRldGFpbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250cm9sQnV0dG9uc3tcbiAgICBtYXJnaW4tdG9wOiAxcHg7XG4gICAgYXtcbiAgICAgICAgd2lkdGg6MTAwJTtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIH1cbn1cbi50aXRsZSwgLm5vdmVsLWNvbnRlbnR7XG4gICAgY29sb3I6IHdoaXRlO1xufVxuLmZsZXhDb250ZW50e1xuICAgIGRpc3BsYXk6IGZsZXhib3g7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgLmNvbnRlbnQge1xuICAgICAgICB3aWR0aDogY2FsYygxMDAlIC0gNTAwcHgpO1xuICAgICAgICBoZWlnaHQ6MTAwJTtcbiAgICB9XG4gICAgLnNpZGViYXIge1xuICAgICAgICB6LWluZGV4OiAyMDtcbiAgICAgICAgd2lkdGg6NTAwcHg7XG4gICAgICAgIHBvc2l0aW9uOmZpeGVkO1xuICAgICAgICBoZWlnaHQ6MTAwJTtcbiAgICAgICAgcmlnaHQ6IDBweDtcbiAgICAgICAgdG9wOiAwcHg7XG4gICAgICAgIGJvdHRvbTogMHB4O1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgICBiYWNrZ3JvdW5kOiAjNWUwMDlmO1xuICAgIH1cbn1cbiJdfQ== */"] });


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
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_models */ 3027);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api */ 39354);



class FormService {
    constructor(api) {
        this.api = api;
        this.categories = [];
        this.categoriesOriginalValues = [];
        this.indexes = [];
    }
    rebuildCache(resolveDic) {
        this.api.Category.getAll({ idDictionary: this.idDictionary })
            .then((categories) => {
            this.categories = Object.values(categories);
            const LoadedPromise = [];
            this.categories.forEach((category, categoryIndex) => {
                LoadedPromise.push(new Promise((resolveCat, rejectCat) => {
                    this.api.Entry.getAll({ idDictionary: this.idDictionary, idCategory: category.id })
                        .then((entries) => {
                        LoadedPromise.push(new Promise((resolveEnt, rejectEnt) => {
                            /**
                             * @var DictionaryEntry[] category.entries
                             */
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
    addEntry(category) {
        if (!category.entries) {
            category.entries = [];
        }
        category.entries.push(new _models__WEBPACK_IMPORTED_MODULE_0__.EntryForm());
    }
    addCategory() {
        this.categories.push(new _models__WEBPACK_IMPORTED_MODULE_0__.DictionaryCategory(null, this.idDictionary));
    }
    changeEntry(entry, catIdx, entIdx) {
        if (entry.reset) {
            if (this.categories[catIdx].entries[entIdx].id) {
                this.categories[catIdx].entries[entIdx] = new _models__WEBPACK_IMPORTED_MODULE_0__.EntryForm(this.categoriesOriginalValues[catIdx].entries[entIdx]);
            }
            else {
                this.categories[catIdx].entries[entIdx] = new _models__WEBPACK_IMPORTED_MODULE_0__.EntryForm(null, this.categories[catIdx].id);
            }
        }
        else {
            if (entry.delete) {
                if (!entry.id) {
                    this.categories[catIdx].entries.splice(entIdx, 1);
                }
            }
            else {
                if (entry.id) {
                    entry.update = entry.entryOriginal !== this.categoriesOriginalValues[catIdx].entries[entIdx].entryOriginal
                        || entry.entryTranslation !== this.categoriesOriginalValues[catIdx].entries[entIdx].entryTranslation
                        || entry.description !== this.categoriesOriginalValues[catIdx].entries[entIdx].description
                        || entry.idCategory !== this.categoriesOriginalValues[catIdx].entries[entIdx].idCategory;
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
FormService.ɵfac = function FormService_Factory(t) { return new (t || FormService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api__WEBPACK_IMPORTED_MODULE_1__.ApiService)); };
FormService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: FormService, factory: FormService.ɵfac, providedIn: 'root' });


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





function ListComponent_ng_template_0_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Import Chapter");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ListComponent_ng_template_0_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ListComponent_ng_template_0_div_5_Template_a_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r6.updateChapters(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Update Chapters");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
const _c0 = function (a1) { return ["/novel/", a1, "dictionary"]; };
function ListComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "a", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Dictionary");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, ListComponent_ng_template_0_div_4_Template, 3, 0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, ListComponent_ng_template_0_div_5_Template, 3, 0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c0, ctx_r1.idNovel));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.novel && ctx_r1.novel.driver == "manual");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.novel && ctx_r1.novel.driver != "manual");
} }
function ListComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](0);
} }
function ListComponent_ng_container_20_a_11_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ListComponent_ng_container_20_a_11_Template_a_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r17); const dictionary_r14 = restoredCtx.$implicit; const chapter_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit; const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r15.openGT(chapter_r8, dictionary_r14); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const dictionary_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](dictionary_r14.language);
} }
function ListComponent_ng_container_20_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "i", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ListComponent_ng_container_20_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
const _c1 = function (a1, a2) { return ["/novel/", a1, a2]; };
function ListComponent_ng_container_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "tr", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "td");
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
} if (rf & 2) {
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
} }
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
        this.api.Novel.get({ id: this.idNovel })
            .then(novel => {
            this.novel = novel;
            this.api.Dictionary.getAll({ idNovel: this.idNovel })
                .then(dictionaries => {
                this.dictionaries = Object.values(dictionaries);
                this.api.Chapter.getAll({ idNovel: this.idNovel })
                    .then(chapters => {
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
        this.api.Chapter.autoUpdate({ idNovel: this.idNovel })
            .then(res => {
            /**
             * Update the list too
             */
            this.api.Chapter.getAll({ idNovel: this.idNovel })
                .then(chapters => {
                this.chapters = Object.values(chapters);
            });
        }, err => {
            console.log(err);
        });
    }
}
ListComponent.ɵfac = function ListComponent_Factory(t) { return new (t || ListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_api__WEBPACK_IMPORTED_MODULE_1__.ApiService)); };
ListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ListComponent, selectors: [["app-chapter-list"]], decls: 21, vars: 2, consts: [["actionButtons", ""], [4, "ngTemplateOutlet"], [1, "table", "is-striped", "is-hoverable", "is-fullwidth"], [4, "ngFor", "ngForOf"], [1, "columns", "actionButtons"], [1, "column"], [1, "button", "is-primary", 3, "routerLink"], ["class", "column", 4, "ngIf"], ["routerLink", "['/novel/',idNovel,'add']", 1, "button", "is-info"], [1, "button", "is-info", 3, "click"], [3, "title"], [3, "routerLink"], [3, "click", 4, "ngFor", "ngForOf"], ["success", ""], ["danger", ""], [3, "click"], [1, "button", "is-success"], [1, "icon", "is-small"], [1, "fas", "fa-check"], [1, "button", "is-danger"], [1, "fas", "fa-times"]], template: function ListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, ListComponent_ng_template_0_Template, 6, 5, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, ListComponent_ng_container_2_Template, 1, 0, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "table", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "th");
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
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](20, ListComponent_ng_container_20_Template, 16, 18, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutlet", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.chapters);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLinkWithHref, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgTemplateOutlet, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink], styles: [".actionButtons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-align: center;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDQyxrQkFBQTtFQUNBLFdBQUE7QUFDRCIsImZpbGUiOiJsaXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFjdGlvbkJ1dHRvbnMgYSB7XG5cdHRleHQtYWxpZ246IGNlbnRlcjtcblx0d2lkdGg6MTAwJTtcbn1cbiJdfQ== */"] });


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
/* harmony import */ var src_app_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/api */ 39354);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);








function SidebarComponent_div_0_li_2_option_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("value", option_r5.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](option_r5.language);
} }
function SidebarComponent_div_0_li_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "select", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SidebarComponent_div_0_li_2_Template_select_ngModelChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r6.dictionarySelector = $event; })("change", function SidebarComponent_div_0_li_2_Template_select_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r8.dictionarySelected($event.target.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Choose a language");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, SidebarComponent_div_0_li_2_option_4_Template, 2, 2, "option", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_li_2_Template_input_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r9.refreshTranslation(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_li_2_Template_input_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r10.refreshOriginal(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx_r1.dictionarySelector);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.dictionaries);
} }
const _c0 = function (a0, a1, a2) { return { "changed": a0, "new": a1, "category-selected": a2 }; };
function SidebarComponent_div_0_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "h1", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_ng_container_10_Template_h1_click_2_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r14); const i_r12 = restoredCtx.index; const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r13.selectOpenCategory = i_r12; });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SidebarComponent_div_0_ng_container_10_Template_input_ngModelChange_3_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r14); const category_r11 = restoredCtx.$implicit; return category_r11.name = $event; })("ngModelChange", function SidebarComponent_div_0_ng_container_10_Template_input_ngModelChange_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r14); const category_r11 = restoredCtx.$implicit; const i_r12 = restoredCtx.index; const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r16.changeCategory(category_r11, i_r12); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const category_r11 = ctx.$implicit;
    const i_r12 = ctx.index;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction3"](2, _c0, category_r11.update == true, category_r11.id == null, ctx_r2.selectOpenCategory == i_r12));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", category_r11.name);
} }
const _c1 = function (a0, a1, a2) { return { "changed": a0, "deleted": a1, "new": a2 }; };
function SidebarComponent_div_0_ng_container_18_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "input", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SidebarComponent_div_0_ng_container_18_div_2_Template_input_ngModelChange_1_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r23); const entry_r20 = restoredCtx.$implicit; return entry_r20.entryOriginal = $event; })("ngModelChange", function SidebarComponent_div_0_ng_container_18_div_2_Template_input_ngModelChange_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r23); const entry_r20 = restoredCtx.$implicit; const j_r21 = restoredCtx.index; const i_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index; const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r24.changeEntry(entry_r20, i_r18, j_r21); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "input", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SidebarComponent_div_0_ng_container_18_div_2_Template_input_ngModelChange_2_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r23); const entry_r20 = restoredCtx.$implicit; return entry_r20.entryTranslation = $event; })("ngModelChange", function SidebarComponent_div_0_ng_container_18_div_2_Template_input_ngModelChange_2_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r23); const entry_r20 = restoredCtx.$implicit; const j_r21 = restoredCtx.index; const i_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index; const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r27.changeEntry(entry_r20, i_r18, j_r21); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SidebarComponent_div_0_ng_container_18_div_2_Template_input_ngModelChange_3_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r23); const entry_r20 = restoredCtx.$implicit; return entry_r20.description = $event; })("ngModelChange", function SidebarComponent_div_0_ng_container_18_div_2_Template_input_ngModelChange_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r23); const entry_r20 = restoredCtx.$implicit; const j_r21 = restoredCtx.index; const i_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index; const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r30.changeEntry(entry_r20, i_r18, j_r21); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "label", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "input", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SidebarComponent_div_0_ng_container_18_div_2_Template_input_ngModelChange_6_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r23); const entry_r20 = restoredCtx.$implicit; return entry_r20.delete = $event; })("change", function SidebarComponent_div_0_ng_container_18_div_2_Template_input_change_6_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r23); const entry_r20 = restoredCtx.$implicit; const j_r21 = restoredCtx.index; const i_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index; const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r33.changeEntry(entry_r20, i_r18, j_r21); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "label", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "i", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SidebarComponent_div_0_ng_container_18_div_2_Template_input_ngModelChange_9_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r23); const entry_r20 = restoredCtx.$implicit; return entry_r20.reset = $event; })("change", function SidebarComponent_div_0_ng_container_18_div_2_Template_input_change_9_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r23); const entry_r20 = restoredCtx.$implicit; const j_r21 = restoredCtx.index; const i_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index; const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r36.changeEntry(entry_r20, i_r18, j_r21); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "input", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function SidebarComponent_div_0_ng_container_18_div_2_Template_input_ngModelChange_10_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r23); const entry_r20 = restoredCtx.$implicit; return entry_r20.idCategory = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const entry_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction3"](7, _c1, entry_r20.update == true, entry_r20.delete == true, entry_r20.id == null));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", entry_r20.entryOriginal);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", entry_r20.entryTranslation);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", entry_r20.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", entry_r20.delete);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", entry_r20.reset);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", entry_r20.idCategory);
} }
const _c2 = function (a0) { return { "hidden": a0 }; };
function SidebarComponent_div_0_ng_container_18_Template(rf, ctx) { if (rf & 1) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "li", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, SidebarComponent_div_0_ng_container_18_div_2_Template, 11, 11, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_ng_container_18_Template_input_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r40); const category_r17 = restoredCtx.$implicit; const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r39.addEntry(category_r17, category_r17.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const category_r17 = ctx.$implicit;
    const i_r18 = ctx.index;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](2, _c2, ctx_r3.selectOpenCategory != i_r18));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", category_r17.entries);
} }
function SidebarComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, SidebarComponent_div_0_li_2_Template, 7, 2, "li", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "li", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "input", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_Template_input_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r42); const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r41.saveModifications(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "input", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_Template_input_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r42); const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r43.openOutside(true); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_Template_input_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r42); const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r44.openOutside(false); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "ul", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, SidebarComponent_div_0_ng_container_10_Template, 4, 6, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "h1", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "input", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_Template_input_click_13_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r42); const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r45.addCategory(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "ul", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "li", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, " <- Select a category ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](18, SidebarComponent_div_0_ng_container_18_Template, 4, 4, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "li", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "input", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_Template_input_click_21_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r42); const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r46.saveModifications(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "input", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_Template_input_click_22_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r42); const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r47.openOutside(true); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SidebarComponent_div_0_Template_input_click_23_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r42); const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r48.openOutside(false); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.dictionaries.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.categories);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](4, _c2, ctx_r0.selectOpenCategory != null));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.categories);
} }
class SidebarComponent extends _form_service__WEBPACK_IMPORTED_MODULE_1__.FormService {
    constructor(api, route) {
        super(api);
        this.api = api;
        this.route = route;
        this.Sidebar2Chapter = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
        this.dictionaries = [];
        this.categories = [];
        this.dictionarySelector = '';
    }
    ngOnInit() {
        this.idNovel = this.route.snapshot.params.idNovel;
        this.api.Dictionary.getAll({ idNovel: this.idNovel })
            .then((dictionaries) => {
            this.dictionaries = dictionaries;
            this.dictionarySelector = dictionaries[0].id;
            this.dictionarySelected(this.dictionarySelector);
        });
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
            this.api.Dictionary.getCache(this.idDictionary)
                .then((status) => {
                this.PrepareCacheThenTranslate(status);
            });
        }
        else {
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
        this.api.Dictionary.fullSave(this.idDictionary, this.categories)
            .then(res => {
            this.categories = [];
            this.getCache();
            this.refreshTranslation();
            console.log(res);
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
}
SidebarComponent.ɵfac = function SidebarComponent_Factory(t) { return new (t || SidebarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_api__WEBPACK_IMPORTED_MODULE_2__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute)); };
SidebarComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: SidebarComponent, selectors: [["app-chapter-sidebar"]], outputs: { Sidebar2Chapter: "Sidebar2Chapter" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]], decls: 1, vars: 1, consts: [["class", "dictionaryList", 4, "ngIf"], [1, "dictionaryList"], ["class", "dictionary-selector", 4, "ngIf"], [1, "dictionary-buttons"], ["type", "button", "value", "Save Modifications", 1, "button", "is-small", "is-danger", 3, "click"], ["type", "button", "value", "Google Translate", 1, "button", "is-small", "is-info", 3, "click"], ["type", "button", "value", "Open Keyword Translated Raw", 1, "button", "is-small", "is-warning", 3, "click"], [1, "interactiveBox"], [1, "categories"], [4, "ngFor", "ngForOf"], [1, "categoryButtonRow"], ["type", "button", "value", "+ Add new Category", 1, "button", "is-small", "is-primary", 3, "click"], [1, "entries"], [3, "ngClass"], [1, "hint"], [1, "dictionary-selector"], [1, "select", 3, "ngModel", "ngModelChange", "change"], ["value", "", "selected", "selected"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "button", "value", "Refresh Translation", 1, "button", "is-small", "is-info", 3, "click"], ["type", "button", "value", "Refresh to Original", 1, "button", "is-small", "is-warning", 3, "click"], [3, "value"], [3, "ngClass", "click"], ["type", "text", "placeholder", "Category Name", 1, "category-name", 3, "ngModel", "ngModelChange"], [3, "ngClass", 4, "ngFor", "ngForOf"], ["type", "button", "value", "+ Add new Entry", 3, "click"], ["type", "text", "placeholder", "Original", 1, "entry-original", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Translation", 1, "entry-translation", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Description", 1, "entry-description", 3, "ngModel", "ngModelChange"], [1, "deleteButton"], [1, "fas", "fa-trash"], ["type", "checkbox", "title", "Delete", 1, "hidden", 3, "ngModel", "ngModelChange", "change"], [1, "resetButton"], [1, "fas", "fa-sync-alt"], ["type", "checkbox", "title", "Reset", 1, "hidden", 3, "ngModel", "ngModelChange", "change"], ["type", "hidden", 3, "ngModel", "ngModelChange"]], template: function SidebarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, SidebarComponent_div_0_Template, 24, 6, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.dictionaries.length > 0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵNgSelectMultipleOption"], _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.CheckboxControlValueAccessor], styles: [".dictionaryList[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.dictionaryList[_ngcontent-%COMP%]   .dictionary-selector[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  width: 100%;\n}\n.dictionaryList[_ngcontent-%COMP%]   .dictionary-selector[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  width: 33.3%;\n  height: 100%;\n}\n.dictionaryList[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  align-self: flex-end;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  height: 500px;\n  flex: 1 1 auto;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%] {\n  color: white;\n  background: rgba(255, 255, 255, 0.5);\n  width: 30%;\n  float: left;\n  line-height: 1.4;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  height: 30px;\n  width: 100%;\n  background: #2f0050;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%]   h1.changed[_ngcontent-%COMP%] {\n  background: #009013;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%]   h1.new[_ngcontent-%COMP%] {\n  background: #000063;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%]   h1.categoryButtonRow[_ngcontent-%COMP%] {\n  background: #00d1b2;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%]   h1.categoryButtonRow[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  background: transparent;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%]   .category-name[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: 0px solid white;\n  color: white;\n  outline-width: 0px;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .categories[_ngcontent-%COMP%]   .category-selected[_ngcontent-%COMP%] {\n  border-width: 2px 0px 2px 5px;\n  border-style: solid;\n  border-color: red;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%] {\n  width: 70%;\n  height: 100%;\n  padding: left 10;\n  overflow-y: auto;\n  float: left;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   .hint[_ngcontent-%COMP%] {\n  background: black;\n  color: white;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:after {\n  clear: both;\n  content: \"\";\n  display: block;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(odd) {\n  background-color: #555;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(even) {\n  background-color: #888;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   div.changed[_ngcontent-%COMP%] {\n  background-color: green;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   div.new[_ngcontent-%COMP%] {\n  background-color: #000063;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   div.deleted[_ngcontent-%COMP%] {\n  background-color: #480000;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: 0px solid white;\n  color: white;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .entry-original[_ngcontent-%COMP%] {\n  width: 50%;\n  float: left;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .entry-translation[_ngcontent-%COMP%] {\n  width: 50%;\n  float: left;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .entry-description[_ngcontent-%COMP%] {\n  width: 80%;\n  float: left;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .deleteButton[_ngcontent-%COMP%] {\n  color: red;\n  margin: 0px 8px;\n}\n.dictionaryList[_ngcontent-%COMP%]   .interactiveBox[_ngcontent-%COMP%]   .entries[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .resetButton[_ngcontent-%COMP%] {\n  color: blue;\n  margin: 0px 8px;\n}\n.dictionaryList[_ngcontent-%COMP%]   .hidden[_ngcontent-%COMP%] {\n  display: none;\n}\n.dictionaryList[_ngcontent-%COMP%]   .dictionary-buttons[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.dictionaryList[_ngcontent-%COMP%]   .dictionary-buttons[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  width: 33.3%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZGViYXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQUNKO0FBQ0k7RUFDSSxzQkFBQTtFQUNBLFdBQUE7QUFDUjtBQUNRO0VBQ0ksWUFBQTtFQUNBLFlBQUE7QUFDWjtBQUVJO0VBQ0ksb0JBQUE7QUFBUjtBQUVJO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7QUFBUjtBQUVRO0VBQ0ksWUFBQTtFQUNBLG9DQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtBQUFaO0FBRVk7RUFDSSxZQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0FBQWhCO0FBRVk7RUFDSSxtQkFBQTtBQUFoQjtBQUVZO0VBQ0ksbUJBQUE7QUFBaEI7QUFFWTtFQUNJLG1CQUFBO0FBQWhCO0FBQ2dCO0VBQ0ksdUJBQUE7QUFDcEI7QUFFWTtFQUNJLDZCQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBRUEsa0JBQUE7QUFEaEI7QUFHWTtFQUNJLDZCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQURoQjtBQUlRO0VBQ0ksVUFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtBQUZaO0FBR1k7RUFDSSxpQkFBQTtFQUNBLFlBQUE7QUFEaEI7QUFJZ0I7RUFDSSxXQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7QUFGcEI7QUFJZ0I7RUFDSSxzQkFBQTtBQUZwQjtBQUlnQjtFQUNJLHNCQUFBO0FBRnBCO0FBSWdCO0VBQ0ksdUJBQUE7QUFGcEI7QUFJZ0I7RUFDSSx5QkFBQTtBQUZwQjtBQUlnQjtFQUNJLHlCQUFBO0FBRnBCO0FBS2dCO0VBQ0ksNkJBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7QUFIcEI7QUFLZ0I7RUFDSSxVQUFBO0VBQ0EsV0FBQTtBQUhwQjtBQUtnQjtFQUNJLFVBQUE7RUFDQSxXQUFBO0FBSHBCO0FBS2dCO0VBQ0ksVUFBQTtFQUNBLFdBQUE7QUFIcEI7QUFLZ0I7RUFDSSxVQUFBO0VBQ0EsZUFBQTtBQUhwQjtBQUtnQjtFQUNJLFdBQUE7RUFDQSxlQUFBO0FBSHBCO0FBUUk7RUFDSSxhQUFBO0FBTlI7QUFRSTtFQUNJLFdBQUE7QUFOUjtBQVFRO0VBQ0ksWUFBQTtFQUNBLFlBQUE7QUFOWiIsImZpbGUiOiJzaWRlYmFyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmRpY3Rpb25hcnlMaXN0IHtcbiAgICB3aWR0aDoxMDAlO1xuICAgIGhlaWdodDoxMDAlO1xuICAgIGRpc3BsYXk6ZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gICAgLmRpY3Rpb25hcnktc2VsZWN0b3J7XG4gICAgICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XG4gICAgICAgIHdpZHRoOjEwMCU7XG5cbiAgICAgICAgJj4qe1xuICAgICAgICAgICAgd2lkdGg6IDMzLjMlO1xuICAgICAgICAgICAgaGVpZ2h0OjEwMCU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGk6bGFzdC1jaGlsZCB7XG4gICAgICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xuICAgIH1cbiAgICAuaW50ZXJhY3RpdmVCb3ggeyAgIFxuICAgICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGhlaWdodDo1MDBweDtcbiAgICAgICAgZmxleDogMSAxIGF1dG87XG5cbiAgICAgICAgLmNhdGVnb3JpZXMge1xuICAgICAgICAgICAgY29sb3I6d2hpdGU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuNSk7XG4gICAgICAgICAgICB3aWR0aDozMCU7XG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNDtcblxuICAgICAgICAgICAgaDEge1xuICAgICAgICAgICAgICAgIGhlaWdodDozMHB4O1xuICAgICAgICAgICAgICAgIHdpZHRoOjEwMCU7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogIzJmMDA1MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGgxLmNoYW5nZWQge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICMwMDkwMTM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoMS5uZXcge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICMwMDAwNjM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoMS5jYXRlZ29yeUJ1dHRvblJvdyB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogIzAwZDFiMjtcbiAgICAgICAgICAgICAgICBpbnB1dCB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5jYXRlZ29yeS1uYW1lIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgIGJvcmRlcjowcHggc29saWQgd2hpdGU7XG4gICAgICAgICAgICAgICAgY29sb3I6d2hpdGU7XG4gICAgICAgICAgICAgICAgLy9tYXJnaW4tbGVmdDoxNXB4O1xuICAgICAgICAgICAgICAgIG91dGxpbmUtd2lkdGg6IDBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5jYXRlZ29yeS1zZWxlY3RlZCB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXdpZHRoOiAycHggMHB4IDJweCA1cHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgICAgICAgICBib3JkZXItY29sb3I6IHJlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAuZW50cmllcyB7XG4gICAgICAgICAgICB3aWR0aDo3MCU7XG4gICAgICAgICAgICBoZWlnaHQ6MTAwJTtcbiAgICAgICAgICAgIHBhZGRpbmc6IGxlZnQgMTA7XG4gICAgICAgICAgICBvdmVyZmxvdy15OmF1dG87XG4gICAgICAgICAgICBmbG9hdDpsZWZ0O1xuICAgICAgICAgICAgLmhpbnQge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGJsYWNrO1xuICAgICAgICAgICAgICAgIGNvbG9yOndoaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGkge1xuICAgICAgICAgICAgICAgIGRpdjphZnRlciB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyOmJvdGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6XCJcIjtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTpibG9jaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGl2Om50aC1jaGlsZChvZGQpe1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiM1NTU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRpdjpudGgtY2hpbGQoZXZlbil7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6Izg4ODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGl2LmNoYW5nZWQge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOmdyZWVuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkaXYubmV3IHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojMDAwMDYzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkaXYuZGVsZXRlZCB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IzQ4MDAwMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbnB1dCB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6MHB4IHNvbGlkIHdoaXRlO1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjp3aGl0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLmVudHJ5LW9yaWdpbmFse1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDo1MCU7XG4gICAgICAgICAgICAgICAgICAgIGZsb2F0OmxlZnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC5lbnRyeS10cmFuc2xhdGlvbntcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6NTAlO1xuICAgICAgICAgICAgICAgICAgICBmbG9hdDpsZWZ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAuZW50cnktZGVzY3JpcHRpb257XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOjgwJTtcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQ6bGVmdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLmRlbGV0ZUJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOnJlZDtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOjBweCA4cHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC5yZXNldEJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOmJsdWU7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjowcHggOHB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAuaGlkZGVuIHtcbiAgICAgICAgZGlzcGxheTpub25lO1xuICAgIH1cbiAgICAuZGljdGlvbmFyeS1idXR0b25zIHtcbiAgICAgICAgd2lkdGg6MTAwJTtcblxuICAgICAgICAmPip7XG4gICAgICAgICAgICB3aWR0aDogMzMuMyU7XG4gICAgICAgICAgICBoZWlnaHQ6MTAwJTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ== */"] });


/***/ })

}]);
//# sourceMappingURL=src_app_chapter_index_ts.js.map