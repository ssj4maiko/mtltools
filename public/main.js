"use strict";
(self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || []).push([["main"],{

/***/ 13581:
/*!************************************!*\
  !*** ./src/app/_models/chapter.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Chapter": () => (/* binding */ Chapter)
/* harmony export */ });
class Chapter {
    constructor(init) {
        Object.assign(this, init);
    }
}


/***/ }),

/***/ 27783:
/*!***************************************!*\
  !*** ./src/app/_models/dictionary.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dictionary": () => (/* binding */ Dictionary),
/* harmony export */   "CacheDictionary": () => (/* binding */ CacheDictionary),
/* harmony export */   "returnFullSave": () => (/* binding */ returnFullSave)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);


class Dictionary {
    constructor(init) {
        Object.assign(this, init);
    }
    countCategories() {
        return this.count_categories ?? 0;
    }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional)()
], Dictionary.prototype, "changes", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional)()
], Dictionary.prototype, "novel", void 0);
class CacheDictionary {
}
class returnFullSave {
}


/***/ }),

/***/ 2414:
/*!***********************************************!*\
  !*** ./src/app/_models/dictionarycategory.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DictionaryCategory": () => (/* binding */ DictionaryCategory)
/* harmony export */ });
class DictionaryCategory {
    constructor(init, idDictionary) {
        if (init) {
            Object.assign(this, init);
        }
        if (idDictionary) {
            this.idDictionary = idDictionary;
        }
    }
}


/***/ }),

/***/ 93178:
/*!********************************************!*\
  !*** ./src/app/_models/dictionaryentry.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DictionaryEntry": () => (/* binding */ DictionaryEntry),
/* harmony export */   "EntryForm": () => (/* binding */ EntryForm)
/* harmony export */ });
class DictionaryEntry {
    constructor(init) {
        Object.assign(this, init);
    }
}
class EntryForm {
    constructor(init, idCategory) {
        if (init) {
            Object.assign(this, init);
        }
        if (idCategory) {
            this.idCategory = idCategory;
        }
    }
}


/***/ }),

/***/ 3027:
/*!**********************************!*\
  !*** ./src/app/_models/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Novel": () => (/* reexport safe */ _novel__WEBPACK_IMPORTED_MODULE_0__.Novel),
/* harmony export */   "Chapter": () => (/* reexport safe */ _chapter__WEBPACK_IMPORTED_MODULE_1__.Chapter),
/* harmony export */   "CacheDictionary": () => (/* reexport safe */ _dictionary__WEBPACK_IMPORTED_MODULE_2__.CacheDictionary),
/* harmony export */   "Dictionary": () => (/* reexport safe */ _dictionary__WEBPACK_IMPORTED_MODULE_2__.Dictionary),
/* harmony export */   "returnFullSave": () => (/* reexport safe */ _dictionary__WEBPACK_IMPORTED_MODULE_2__.returnFullSave),
/* harmony export */   "DictionaryCategory": () => (/* reexport safe */ _dictionarycategory__WEBPACK_IMPORTED_MODULE_3__.DictionaryCategory),
/* harmony export */   "DictionaryEntry": () => (/* reexport safe */ _dictionaryentry__WEBPACK_IMPORTED_MODULE_4__.DictionaryEntry),
/* harmony export */   "EntryForm": () => (/* reexport safe */ _dictionaryentry__WEBPACK_IMPORTED_MODULE_4__.EntryForm),
/* harmony export */   "NovelDictionary": () => (/* reexport safe */ _noveldictionary__WEBPACK_IMPORTED_MODULE_5__.NovelDictionary)
/* harmony export */ });
/* harmony import */ var _novel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./novel */ 83290);
/* harmony import */ var _chapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chapter */ 13581);
/* harmony import */ var _dictionary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dictionary */ 27783);
/* harmony import */ var _dictionarycategory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dictionarycategory */ 2414);
/* harmony import */ var _dictionaryentry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dictionaryentry */ 93178);
/* harmony import */ var _noveldictionary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./noveldictionary */ 30088);








/***/ }),

/***/ 83290:
/*!**********************************!*\
  !*** ./src/app/_models/novel.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Novel": () => (/* binding */ Novel)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);


class Novel {
    constructor(init) {
        Object.assign(this, init);
    }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional)()
], Novel.prototype, "dictionary", void 0);


/***/ }),

/***/ 30088:
/*!********************************************!*\
  !*** ./src/app/_models/noveldictionary.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NovelDictionary": () => (/* binding */ NovelDictionary)
/* harmony export */ });
class NovelDictionary {
    constructor(init) {
        Object.assign(this, init);
    }
}


/***/ }),

/***/ 4820:
/*!****************************************************!*\
  !*** ./src/app/_services/modal/modal.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalComponent": () => (/* binding */ ModalComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _modal_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.service */ 10230);


const _c0 = ["*"];
// https://jasonwatmore.com/post/2019/04/16/angular-7-custom-modal-window-dialog-box
class ModalComponent {
    constructor(modalService, el) {
        this.modalService = modalService;
        this.el = el;
        this.element = el.nativeElement;
    }
    ngOnInit() {
        let modal = this;
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }
        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);
        // close modal on background click
        this.element.addEventListener('click', function (e) {
            if (e.target.className === 'jw-modal') {
                modal.close();
            }
        });
        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }
    // remove self from modal service when component is destroyed
    ngOnDestroy() {
        this.modalService.remove(this.id);
        this.element.remove();
    }
    // open modal
    open() {
        this.element.style.display = 'block';
        document.body.classList.add('jw-modal-open');
    }
    // close modal
    close() {
        this.element.style.display = 'none';
        document.body.classList.remove('jw-modal-open');
    }
}
ModalComponent.ɵfac = function ModalComponent_Factory(t) { return new (t || ModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_modal_service__WEBPACK_IMPORTED_MODULE_0__.ModalService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef)); };
ModalComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ModalComponent, selectors: [["jw-modal"]], inputs: { id: "id" }, ngContentSelectors: _c0, decls: 4, vars: 0, consts: [[1, "jw-modal"], [1, "jw-modal-body"], [1, "jw-modal-background"]], template: function ModalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "div", 2);
    } }, styles: ["jw-modal[_ngcontent-%COMP%] {\n  \n  display: none;\n}\njw-modal[_ngcontent-%COMP%]   .jw-modal[_ngcontent-%COMP%] {\n  \n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  \n  z-index: 1000;\n  \n  overflow: auto;\n}\njw-modal[_ngcontent-%COMP%]   .jw-modal[_ngcontent-%COMP%]   .jw-modal-body[_ngcontent-%COMP%] {\n  padding: 20px 50px;\n  background: #fff;\n  \n  margin: 40px;\n}\njw-modal[_ngcontent-%COMP%]   .jw-modal-background[_ngcontent-%COMP%] {\n  \n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  \n  background-color: #000;\n  opacity: 0.75;\n  \n  z-index: 900;\n}\nbody.jw-modal-open[_ngcontent-%COMP%] {\n  \n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGFsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO2dDQUFBO0FBRUE7RUFDSSxpQ0FBQTtFQUNBLGFBQUE7QUFESjtBQUdJO0VBQ0ksOENBQUE7RUFDQSxlQUFBO0VBQ0EsTUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUVBLHFEQUFBO0VBQ0EsYUFBQTtFQUVBLHNDQUFBO0VBQ0EsY0FBQTtBQUhSO0FBS1E7RUFDSSxrQkFBQTtFQUNBLGdCQUFBO0VBRUEsZ0RBQUE7RUFDQSxZQUFBO0FBSlo7QUFRSTtFQUNJLCtDQUFBO0VBQ0EsZUFBQTtFQUNBLE1BQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFFQSw0QkFBQTtFQUNBLHNCQUFBO0VBQ0EsYUFBQTtFQUVBLCtEQUFBO0VBQ0EsWUFBQTtBQVJSO0FBWUE7RUFDSSw2RUFBQTtFQUNBLGdCQUFBO0FBVEoiLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnRlZCBieSBzdHlsZXMuc2Nzc1xuXG4vKiBNT0RBTCBTVFlMRVNcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuanctbW9kYWwge1xuICAgIC8qIG1vZGFscyBhcmUgaGlkZGVuIGJ5IGRlZmF1bHQgKi9cbiAgICBkaXNwbGF5OiBub25lO1xuXG4gICAgLmp3LW1vZGFsIHtcbiAgICAgICAgLyogbW9kYWwgY29udGFpbmVyIGZpeGVkIGFjcm9zcyB3aG9sZSBzY3JlZW4gKi9cbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGxlZnQ6IDA7XG5cbiAgICAgICAgLyogei1pbmRleCBtdXN0IGJlIGhpZ2hlciB0aGFuIC5qdy1tb2RhbC1iYWNrZ3JvdW5kICovXG4gICAgICAgIHotaW5kZXg6IDEwMDA7XG5cbiAgICAgICAgLyogZW5hYmxlcyBzY3JvbGxpbmcgZm9yIHRhbGwgbW9kYWxzICovXG4gICAgICAgIG92ZXJmbG93OiBhdXRvO1xuXG4gICAgICAgIC5qdy1tb2RhbC1ib2R5IHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDIwcHggNTBweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG5cbiAgICAgICAgICAgIC8qIG1hcmdpbiBleHBvc2VzIHBhcnQgb2YgdGhlIG1vZGFsIGJhY2tncm91bmQgKi9cbiAgICAgICAgICAgIG1hcmdpbjogNDBweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5qdy1tb2RhbC1iYWNrZ3JvdW5kIHtcbiAgICAgICAgLyogbW9kYWwgYmFja2dyb3VuZCBmaXhlZCBhY3Jvc3Mgd2hvbGUgc2NyZWVuICovXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuXG4gICAgICAgIC8qIHNlbWktdHJhbnNwYXJlbnQgYmxhY2sgICovXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XG4gICAgICAgIG9wYWNpdHk6IDAuNzU7XG5cbiAgICAgICAgLyogei1pbmRleCBtdXN0IGJlIGJlbG93IC5qdy1tb2RhbCBhbmQgYWJvdmUgZXZlcnl0aGluZyBlbHNlICAqL1xuICAgICAgICB6LWluZGV4OiA5MDA7XG4gICAgfVxufVxuXG5ib2R5Lmp3LW1vZGFsLW9wZW4ge1xuICAgIC8qIGJvZHkgb3ZlcmZsb3cgaXMgaGlkZGVuIHRvIGhpZGUgbWFpbiBzY3JvbGxiYXIgd2hlbiBtb2RhbCB3aW5kb3cgaXMgb3BlbiAqL1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG59XG4iXX0= */"] });


/***/ }),

/***/ 10230:
/*!**************************************************!*\
  !*** ./src/app/_services/modal/modal.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalService": () => (/* binding */ ModalService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 22560);

class ModalService {
    constructor() {
        this.modals = [];
    }
    add(modal) {
        // add modal to array of active modals
        this.modals.push(modal);
    }
    remove(id) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.id !== id);
    }
    open(id) {
        // open modal specified by id
        let modal = this.modals.filter(x => x.id === id)[0];
        modal.open();
    }
    close(id) {
        // close modal specified by id
        let modal = this.modals.filter(x => x.id === id)[0];
        modal.close();
    }
}
ModalService.ɵfac = function ModalService_Factory(t) { return new (t || ModalService)(); };
ModalService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ModalService, factory: ModalService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 98179:
/*!*************************************!*\
  !*** ./src/app/api/ajax.service.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AjaxService": () => (/* binding */ AjaxService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 64139);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 58987);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 88759);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 47418);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 92340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);






const httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders({
        'Content-Type': 'application/json'
    })
};
const apiUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.backendServer + '/api/';
class AjaxService {
    constructor(http) {
        this.http = http;
    }
    handleError(operation = 'operation', result) {
        return (error) => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(result);
        };
    }
    _call(params) {
        const type = params.type.toLowerCase();
        let HTTP = null;
        switch (type) {
            case 'get':
            case 'delete':
                HTTP = this.http[type](apiUrl + params.url);
                break;
            case 'post':
            case 'put':
                HTTP = this.http[type](apiUrl + params.url, params.content, httpOptions);
                break;
        }
        HTTP.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)((err, caught) => {
            console.error(err, caught);
            this.handleError(err);
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(caught);
        }));
        return HTTP;
    }
    _get(url) {
        return this._call({ type: 'get', url });
    }
    _post(url, content) {
        return this._call({ type: 'post', url, content });
    }
    _put(url, content) {
        return this._call({ type: 'put', url, content });
    }
    _delete(url) {
        return this._call({ type: 'delete', url });
    }
    DEBUG(...args) {
        console.log(args);
    }
}
AjaxService.ɵfac = function AjaxService_Factory(t) { return new (t || AjaxService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient)); };
AjaxService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: AjaxService, factory: AjaxService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 82524:
/*!************************************!*\
  !*** ./src/app/api/api.service.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiService": () => (/* binding */ ApiService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _novels_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./novels.service */ 23699);
/* harmony import */ var _chapters_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chapters.service */ 45901);
/* harmony import */ var _dictionaries_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dictionaries.service */ 68050);
/* harmony import */ var _categories_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./categories.service */ 80180);
/* harmony import */ var _entries_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entries.service */ 31885);
/* harmony import */ var _meta_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./meta.service */ 49305);







class ApiService {
    constructor(
    // private cacheService: CacheService
    Novel, Chapter, Dictionary, Category, Entry, Meta) {
        this.Novel = Novel;
        this.Chapter = Chapter;
        this.Dictionary = Dictionary;
        this.Category = Category;
        this.Entry = Entry;
        this.Meta = Meta;
        this.Novel.setApi(this);
        this.Chapter.setApi(this);
        this.Dictionary.setApi(this);
        this.Category.setApi(this);
        this.Entry.setApi(this);
    }
}
ApiService.ɵfac = function ApiService_Factory(t) { return new (t || ApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_novels_service__WEBPACK_IMPORTED_MODULE_0__.NovelsService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_chapters_service__WEBPACK_IMPORTED_MODULE_1__.ChaptersService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_dictionaries_service__WEBPACK_IMPORTED_MODULE_2__.DictionariesService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_categories_service__WEBPACK_IMPORTED_MODULE_3__.CategoriesService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_entries_service__WEBPACK_IMPORTED_MODULE_4__.EntriesService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_meta_service__WEBPACK_IMPORTED_MODULE_5__.MetaService)); };
ApiService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({ token: ApiService, factory: ApiService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 80180:
/*!*******************************************!*\
  !*** ./src/app/api/categories.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CategoriesService": () => (/* binding */ CategoriesService)
/* harmony export */ });
/* harmony import */ var _ajax_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajax.service */ 98179);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);


class CategoriesService extends _ajax_service__WEBPACK_IMPORTED_MODULE_0__.AjaxService {
    constructor() {
        super(...arguments);
        this.route = 'category/';
        this.items = [];
        this.hasAll = [];
        this.api = null;
    }
    setApi(api) {
        this.api = api;
    }
    set(items, idDictionary, force = false) {
        if (!this.items[idDictionary] || force) {
            this.items[idDictionary] = [];
        }
        for (const item of items) {
            this.items[idDictionary][item.id] = item;
            if (!this.items[idDictionary][item.id].entries) {
                this.items[idDictionary][item.id].entries = [];
            }
        }
        if (force) {
            this.hasAll[idDictionary] = true;
        }
    }
    has(params) {
        if (!params.id) {
            return !!(this.items[params.idDictionary]);
        }
        else {
            return !!(this.items[params.idDictionary] && this.items[params.idDictionary][params.id]);
        }
    }
    /**
     * Basic CRUD stuff here
     */
    get(params) {
        return new Promise((resolve, reject) => {
            if (this.items[params.idDictionary] && this.items[params.idDictionary][params.id]) {
                resolve(this.items[params.idDictionary][params.id]);
            }
            else {
                this._get(this.route + params.idDictionary + '/' + params.id)
                    .subscribe((item) => {
                    if (item) {
                        this.set([item], params.idDictionary);
                        resolve(item);
                    }
                    else {
                        reject('Invalid DictionaryCategory ' + params.id);
                    }
                });
            }
        });
    }
    getAll(params) {
        return new Promise((resolve, reject) => {
            if (this.hasAll[params.idDictionary]) {
                resolve(this.items[params.idDictionary]);
            }
            else {
                this._get(this.route + params.idDictionary + '/')
                    .subscribe((items) => {
                    this.hasAll[params.idDictionary] = true;
                    this.set(items, params.idDictionary);
                    resolve(this.items[params.idDictionary]);
                });
            }
        });
    }
    add(params) {
        return new Promise((resolve, reject) => {
            this._post(this.route + params.idDictionary + '/', params.category)
                .subscribe((item) => {
                if (item) {
                    this.set([item], params.idDictionary);
                    resolve(item);
                }
                else {
                    reject('Error on inserting category ' + params.category.name);
                }
            });
        });
    }
    update(params) {
        return new Promise((resolve, reject) => {
            this._put(this.route + params.idDictionary + '/' + params.id, params.category)
                .subscribe((item) => {
                if (item) {
                    this.set([item], params.idDictionary);
                    resolve(item);
                }
                else {
                    reject('Error on updating category ' + params.id);
                }
            });
        });
    }
    delete(params) {
        return new Promise((resolve, reject) => {
            this._delete(this.route + params.idDictionary + '/' + params.id)
                .subscribe((item) => {
                if (item) {
                    delete this.items[params.idDictionary][params.id];
                    resolve(true);
                }
                else {
                    reject('Error on deleting category ' + params.id);
                }
            });
        });
    }
}
CategoriesService.ɵfac = /*@__PURE__*/ function () { let ɵCategoriesService_BaseFactory; return function CategoriesService_Factory(t) { return (ɵCategoriesService_BaseFactory || (ɵCategoriesService_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](CategoriesService)))(t || CategoriesService); }; }();
CategoriesService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CategoriesService, factory: CategoriesService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 45901:
/*!*****************************************!*\
  !*** ./src/app/api/chapters.service.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChaptersService": () => (/* binding */ ChaptersService)
/* harmony export */ });
/* harmony import */ var _ajax_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajax.service */ 98179);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);


class ChaptersService extends _ajax_service__WEBPACK_IMPORTED_MODULE_0__.AjaxService {
    constructor() {
        super(...arguments);
        this.route = 'chapter/';
        this.items = [[]];
        this.hasAll = [false];
        this.api = null;
    }
    setApi(api) {
        this.api = api;
    }
    set(idNovel, items) {
        if (!this.items[idNovel]) {
            this.items[idNovel] = [];
        }
        if (items.length > 0) {
            for (const item of items) {
                this.items[idNovel][item.no] = item;
            }
        }
    }
    has(params) {
        if (!params.no) {
            return !!(this.items[params.idNovel]);
        }
        else {
            if (!params.text) {
                return !!(this.items[params.idNovel] && this.items[params.idNovel][params.no]);
            }
            else {
                return !!(this.items[params.idNovel]
                    && this.items[params.idNovel][params.no]
                    && this.items[params.idNovel][params.no].textOriginal);
            }
        }
    }
    /**
     * Basic CRUD stuff here. <params.text> is for when I need the texts available (Only used in Detail View)
     */
    get(params) {
        return new Promise((resolve, reject) => {
            if (this.has({ idNovel: params.idNovel, no: params.no, text: params.text })) {
                resolve(this.items[params.idNovel][params.no]);
            }
            else {
                this._get(this.route + params.idNovel + '/' + params.no)
                    .subscribe((item) => {
                    if (item) {
                        this.set(params.idNovel, [item]);
                        resolve(this.items[params.idNovel][params.no]);
                    }
                    else {
                        reject('Invalid Chapter on Novel ' + params.idNovel + ' / ' + params.no);
                    }
                });
            }
        });
    }
    getAll(params) {
        return new Promise((resolve, reject) => {
            if (this.hasAll[params.idNovel]) {
                resolve(this.items[params.idNovel]);
            }
            else {
                this._get(this.route + params.idNovel)
                    .subscribe((items) => {
                    if (items.length > 0) {
                        this.set(params.idNovel, items);
                        this.hasAll[params.idNovel] = true;
                        resolve(items);
                    }
                    else {
                        reject('No Chapters for Novel ' + params.idNovel);
                    }
                });
            }
        });
    }
    add(params) {
        return new Promise((resolve, reject) => {
            this._post(this.route, params.chapter)
                .subscribe((item) => {
                if (item) {
                    this.set(params.idNovel, [item]);
                    resolve(item);
                }
                else {
                    reject('Error on inserting chapter ' + params.idNovel);
                }
            });
        });
    }
    update(params) {
        return new Promise((resolve, reject) => {
            this._put(this.route + params.idNovel + '/' + params.no, params.chapter)
                .subscribe((item) => {
                if (item) {
                    this.set(params.idNovel, [item]);
                    resolve(item);
                }
                else {
                    reject('Error on updating chapter ' + params.no);
                }
            });
        });
    }
    delete(params) {
        return new Promise((resolve, reject) => {
            this._delete(this.route + params.idNovel + '/' + params.no)
                .subscribe((item) => {
                if (item) {
                    this.items[params.idNovel][params.no] = null;
                    resolve(true);
                }
                else {
                    reject('Error on deleting chapter ' + params.no);
                }
            });
        });
    }
    /**
     * More complex stuff starting here
     */
    // Lots of automated services here
    autoUpdate(params) {
        return new Promise((resolve, reject) => {
            this._get(this.route + 'autoUpdate/' + params.idNovel)
                .subscribe((novel) => {
                // If we already have a register, we should check if anything relevant was updated.
                if (this.api.Novel.has({ id: params.idNovel })) {
                    this.api.Novel
                        .get({ id: params.idNovel })
                        .then((novelCurrent) => {
                        // If there are more chapters, we update the novel folder, and point we don't have everything anymore
                        if (novel.numberChapters !== novelCurrent.numberChapters) {
                            this.api.Novel.set([novel]);
                            this.hasAll[params.idNovel] = false;
                            //  Then if we already have chapters in, we reload, otherwise, no need to do that.
                            if (this.has({ idNovel: params.idNovel })) {
                                this.getAll({ idNovel: params.idNovel })
                                    .then(_ => {
                                    resolve(true);
                                });
                            }
                            else {
                                resolve(true);
                            }
                        }
                        else {
                            resolve(false);
                        }
                    });
                }
                else {
                    this.api.Novel.set([novel]);
                    resolve(true);
                }
            });
        });
    }
}
ChaptersService.ɵfac = /*@__PURE__*/ function () { let ɵChaptersService_BaseFactory; return function ChaptersService_Factory(t) { return (ɵChaptersService_BaseFactory || (ɵChaptersService_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](ChaptersService)))(t || ChaptersService); }; }();
ChaptersService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ChaptersService, factory: ChaptersService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 68050:
/*!*********************************************!*\
  !*** ./src/app/api/dictionaries.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DictionariesService": () => (/* binding */ DictionariesService)
/* harmony export */ });
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_models */ 3027);
/* harmony import */ var _ajax_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ajax.service */ 98179);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);



class DictionariesService extends _ajax_service__WEBPACK_IMPORTED_MODULE_1__.AjaxService {
    constructor() {
        super(...arguments);
        this.route = 'dictionary/';
        this.items = [];
        this.hasAll = false;
        this.hasAllNovels = [];
        this.pivots = []; // pivots[idNovel] = idDictionary[]
        this.api = null;
        this.hasCache = [];
    }
    setApi(api) {
        this.api = api;
    }
    set(items, idNovel) {
        // If idNovel is being sent, I'm considering that it's sending all Dictionaries from one novel
        // Because there may be updates on a Novel, and the rule above, everytime idNovel is being sent
        // I will erase the pivots so that they are done again, releasing the detached dictionaries too
        if (idNovel) {
            this.pivots[idNovel] = [];
        }
        for (const item of items) {
            if (typeof item.novel !== 'undefined') {
                this.api.Novel.set(item.novel, item.id);
                delete (item.novel);
            }
            this.items[item.id] = new _models__WEBPACK_IMPORTED_MODULE_0__.Dictionary(item);
            if (idNovel) {
                this.pivots[idNovel].push(item.id);
            }
        }
        // As mentioned on the first comment, this way, if getAll by Novel is used, it just gets from cache
        if (idNovel) {
            this.hasAllNovels[idNovel] = true;
        }
    }
    has(params) {
        return !!(this.items[params.id]);
    }
    /**
     * Basic CRUD stuff here
     */
    get(params) {
        if (params.id) {
            return new Promise((resolve, reject) => {
                if (this.items[params.id]) {
                    resolve(this.items[params.id]);
                }
                else {
                    this._get(this.route + params.id)
                        .subscribe((item) => {
                        if (item) {
                            this.set([item]);
                            resolve(item);
                        }
                        else {
                            reject('Invalid Dictionary ' + params.id);
                        }
                    });
                }
            });
        }
    }
    getAll(params) {
        return new Promise((resolve, reject) => {
            // If we are looking only for all Dictionaries on one Novel, we don't need all
            const idNovel = params && params.idNovel ? params.idNovel : null;
            if (idNovel && this.hasAllNovels[idNovel]) {
                resolve(this.getDictionaryPivots(idNovel));
            }
            else 
            // If we are looking only for all Dictionaries, we do it here
            if (this.hasAll && !idNovel) {
                resolve(this.items);
            }
            else {
                this._get(this.route + (idNovel ? 'novel/' + idNovel : ''))
                    .subscribe((items) => {
                    if (items.length > 0) {
                        this.set(items, idNovel);
                        // Here we also set the different paths
                        if (!idNovel) {
                            this.hasAll = true;
                            resolve(this.items);
                        }
                        else {
                            resolve(this.getDictionaryPivots(idNovel));
                        }
                    }
                    else {
                        reject('No Dictionaries');
                    }
                });
            }
        });
    }
    add(params) {
        return new Promise((resolve, reject) => {
            this._post(this.route, params.values)
                .subscribe((item) => {
                if (item) {
                    this.set([item]);
                    resolve(item);
                }
                else {
                    reject('Error on inserting dictionary ' + params.values);
                }
            });
        });
    }
    update(params) {
        return new Promise((resolve, reject) => {
            this._put(this.route + params.id, params.values)
                .subscribe((item) => {
                if (item) {
                    this.set([item]);
                    resolve(item);
                }
                else {
                    reject('Error on updating dictionary ' + params.id);
                }
            });
        });
    }
    delete(params) {
        return new Promise((resolve, reject) => {
            this._delete(this.route + params.id)
                .subscribe((item) => {
                if (item) {
                    delete this.items[params.id];
                    resolve(true);
                }
                else {
                    reject('Error on deleting dictionary ' + params.id);
                }
            });
        });
    }
    getDictionaryPivots(idNovel) {
        if (!this.pivots[idNovel]) {
            return [];
        }
        else {
            const arr = [];
            for (const idDic of this.pivots[idNovel]) {
                arr.push(this.items[idDic]);
            }
            return arr;
        }
    }
    getCache(idDictionary) {
        return new Promise((resolve, reject) => {
            if (this.hasCache[idDictionary]) {
                resolve(true);
            }
            else {
                this._get('cache/dictionary/' + idDictionary)
                    .subscribe((cache) => {
                    this.hasCache[idDictionary] = true;
                    this.reworkCache(cache);
                    resolve(true);
                });
            }
        });
    }
    rebuildCache(idDictionary) {
        return new Promise((resolve, reject) => {
            this._put('cache/dictionary/' + idDictionary)
                .subscribe((cache) => {
                this.hasCache[idDictionary] = true;
                this.reworkCache(cache);
                resolve(true);
            });
        });
    }
    reworkCache(cache) {
        if (cache.dictionary_category) {
            this.api.Category.set(cache.dictionary_category, cache.id, true);
        }
        if (cache.dictionary_entry.length >= 0) {
            this.api.Entry.set(cache.id, null, cache.dictionary_entry, true);
        }
    }
    fullSave(idDictionary, categories) {
        return new Promise((resolve, reject) => {
            this._put('dictionary/fullSave/' + idDictionary, categories)
                .subscribe((returnFS) => {
                if (returnFS.changes) {
                    this.hasCache[idDictionary] = false;
                    console.log('full Save Dictionary.Service', this.items[idDictionary]);
                    this.items[idDictionary].dateRevision = returnFS.dateRevision;
                }
                resolve(true);
            });
        });
    }
}
DictionariesService.ɵfac = /*@__PURE__*/ function () { let ɵDictionariesService_BaseFactory; return function DictionariesService_Factory(t) { return (ɵDictionariesService_BaseFactory || (ɵDictionariesService_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetInheritedFactory"](DictionariesService)))(t || DictionariesService); }; }();
DictionariesService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: DictionariesService, factory: DictionariesService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 31885:
/*!****************************************!*\
  !*** ./src/app/api/entries.service.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EntriesService": () => (/* binding */ EntriesService)
/* harmony export */ });
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_models */ 3027);
/* harmony import */ var _ajax_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ajax.service */ 98179);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);



class EntriesService extends _ajax_service__WEBPACK_IMPORTED_MODULE_1__.AjaxService {
    constructor() {
        super(...arguments);
        this.route = 'entry/';
        this.items = [[[]]];
        this.hasAll = [[]];
        this.api = null;
    }
    setApi(api) {
        this.api = api;
    }
    setHasAll(idDictionary, idCategory, set = true) {
        if (!this.hasAll[idDictionary]) {
            this.hasAll[idDictionary] = [];
        }
        this.hasAll[idDictionary][idCategory] = set;
    }
    set(idDictionary, idCategory, items, force = false) {
        if (!this.items[idDictionary] || force) {
            this.items[idDictionary] = [[]];
        }
        if (idCategory) {
            if (!this.items[idDictionary][idCategory]) {
                this.items[idDictionary][idCategory] = [];
            }
            if (items.length > 0) {
                for (const item of items) {
                    this.items[idDictionary][idCategory][item.id] = new _models__WEBPACK_IMPORTED_MODULE_0__.DictionaryEntry(item);
                }
            }
            if (force) {
                this.setHasAll(idDictionary, idCategory);
            }
        }
        else {
            if (items.length > 0) {
                for (const item of items) {
                    if (!this.items[idDictionary][item.idCategory]) {
                        this.items[idDictionary][item.idCategory] = [];
                    }
                    this.items[idDictionary][item.idCategory][item.id] = new _models__WEBPACK_IMPORTED_MODULE_0__.DictionaryEntry(item);
                    if (force) {
                        this.setHasAll(idDictionary, item.idCategory);
                    }
                }
            }
        }
    }
    has(params) {
        if (!params.id) {
            return !!(this.items[params.idDictionary] && this.items[params.idDictionary][params.idCategory]);
        }
        else {
            return !!(this.items[params.idDictionary] && this.items[params.idDictionary][params.idCategory]
                && this.items[params.idDictionary][params.idCategory][params.id]);
        }
    }
    /**
     * Basic CRUD stuff here
     */
    get(params) {
        return new Promise((resolve, reject) => {
            if (this.items[params.idDictionary]
                && this.items[params.idDictionary][params.idCategory]
                && this.items[params.idDictionary][params.idCategory][params.id]) {
                resolve(this.items[params.idDictionary][params.idCategory][params.id]);
            }
            else {
                this._get(this.route + params.id)
                    .subscribe((item) => {
                    if (item) {
                        this.set(params.idDictionary, params.idCategory, [item]);
                        resolve(item);
                    }
                    else {
                        reject('Invalid DictionaryEntry ' + params.id);
                    }
                });
            }
        });
    }
    getAll(params) {
        return new Promise((resolve, reject) => {
            if (this.hasAll[params.idDictionary]
                && this.hasAll[params.idDictionary][params.idCategory]) {
                resolve(this.items[params.idDictionary][params.idCategory]);
            }
            else {
                this._get(this.route + [params.idDictionary, params.idCategory].join('/'))
                    .subscribe((items) => {
                    if (items.length >= 0) {
                        this.set(params.idDictionary, params.idCategory, items);
                        this.setHasAll(params.idDictionary, params.idCategory);
                        resolve(items);
                    }
                    else {
                        reject('No DictionaryEntrys');
                    }
                });
            }
        });
    }
    add(params) {
        return new Promise((resolve, reject) => {
            this._post(this.route, params.entry)
                .subscribe((item) => {
                if (item) {
                    this.set(params.idDictionary, params.idCategory, [item]);
                    resolve(item);
                }
                else {
                    reject('Error on inserting entry ' + params.entry.entryTranslation);
                }
            });
        });
    }
    update(params) {
        return new Promise((resolve, reject) => {
            this._put(this.route + params.id, params.entry)
                .subscribe((item) => {
                if (item) {
                    this.set(params.idDictionary, params.idCategory, [item]);
                    resolve(item);
                }
                else {
                    reject('Error on updating entry ' + params.id);
                }
            });
        });
    }
    delete(params) {
        return new Promise((resolve, reject) => {
            this._delete(this.route + params.id)
                .subscribe((item) => {
                if (item) {
                    this.items[params.idDictionary][params.idCategory][params.id] = null;
                    resolve(true);
                }
                else {
                    reject('Error on deleting entry ' + params.id);
                }
            });
        });
    }
    saveByCategory(params) {
        return new Promise((resolve, reject) => {
            this._put(this.route + [params.idDictionary, 'updatebycategory', params.idCategory].join('/'), params.entries)
                .subscribe((items) => {
                if (items) {
                    /**
                     * Because multiple categories may have been changed, the backend returns all affected categories
                     */
                    if (items.categories) {
                        items.categories.map((category) => {
                            this.setHasAll(category.idDictionary, category.id, false);
                            this.api.Category.set([category], category.idDictionary);
                        });
                    }
                    this.setHasAll(params.idDictionary, params.idCategory);
                    this.set(params.idDictionary, params.idCategory, items.entries, true);
                    resolve(true);
                }
                else {
                    reject('Error on updating entry ' + params.idCategory);
                }
            });
            return true;
        });
    }
}
EntriesService.ɵfac = /*@__PURE__*/ function () { let ɵEntriesService_BaseFactory; return function EntriesService_Factory(t) { return (ɵEntriesService_BaseFactory || (ɵEntriesService_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetInheritedFactory"](EntriesService)))(t || EntriesService); }; }();
EntriesService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: EntriesService, factory: EntriesService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 39354:
/*!******************************!*\
  !*** ./src/app/api/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiService": () => (/* reexport safe */ _api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService)
/* harmony export */ });
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 82524);



/***/ }),

/***/ 49305:
/*!*************************************!*\
  !*** ./src/app/api/meta.service.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MetaService": () => (/* binding */ MetaService)
/* harmony export */ });
/* harmony import */ var _ajax_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajax.service */ 98179);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);


class MetaService extends _ajax_service__WEBPACK_IMPORTED_MODULE_0__.AjaxService {
    constructor() {
        super(...arguments);
        this.route = 'meta/';
        this.items = [];
        this.api = null;
    }
    setApi(api) {
        this.api = api;
    }
    set(type, value) {
        this.items[type] = value;
    }
    has(type) {
        return !!(this.items[type]);
    }
    get(...params) {
        return new Promise((resolve, reject) => {
            this._post(this.route, { meta: params })
                .subscribe((items) => {
                resolve(items);
            });
        });
    }
}
MetaService.ɵfac = /*@__PURE__*/ function () { let ɵMetaService_BaseFactory; return function MetaService_Factory(t) { return (ɵMetaService_BaseFactory || (ɵMetaService_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](MetaService)))(t || MetaService); }; }();
MetaService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: MetaService, factory: MetaService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 23699:
/*!***************************************!*\
  !*** ./src/app/api/novels.service.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NovelsService": () => (/* binding */ NovelsService)
/* harmony export */ });
/* harmony import */ var _ajax_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajax.service */ 98179);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);


class NovelsService extends _ajax_service__WEBPACK_IMPORTED_MODULE_0__.AjaxService {
    constructor() {
        super(...arguments);
        this.route = 'novel/';
        this.items = [];
        this.hasAll = false;
        this.hasAllDictionaries = [];
        this.pivots = []; // pivots[idDictionary] = idNovel[]
        this.api = null;
    }
    setApi(api) {
        this.api = api;
    }
    set(items, idDictionary) {
        // Because there may be updates on a Novel, and the rule above, everytime idNovel is being sent
        // I will erase the pivots so that they are done again, releasing the atached dictionaries too
        if (idDictionary) {
            this.pivots[idDictionary] = [];
        }
        for (const item of items) {
            if (typeof item.dictionary !== 'undefined') {
                this.api.Dictionary.set(item.dictionary, item.id);
                delete (item.dictionary);
            }
            this.items[item.id] = item;
            if (idDictionary) {
                this.pivots[idDictionary].push(item.id);
            }
        }
        // As mentioned on the first comment, this way, if getAll by Novel is used, it just gets from cache
        if (idDictionary) {
            this.hasAllDictionaries[idDictionary] = true;
        }
    }
    has(params) {
        return !!(this.items[params.id]);
    }
    /**
     * Basic CRUD stuff here
     */
    get(params) {
        return new Promise((resolve, reject) => {
            if (this.items[params.id]) {
                resolve(this.items[params.id]);
            }
            else {
                this._get(this.route + params.id)
                    .subscribe((item) => {
                    if (item) {
                        this.set([item]);
                        resolve(item);
                    }
                    else {
                        reject('Invalid Novel ' + params.id);
                    }
                });
            }
        });
    }
    getAll(params) {
        return new Promise((resolve, reject) => {
            // If we are looking only for all Dictionaries on one Novel, we don't need all
            const idDictionary = params && params.idDictionary ? params.idDictionary : null;
            if (idDictionary && this.hasAllDictionaries[idDictionary]) {
                resolve(this.getNovelPivots(idDictionary));
            }
            else if (this.hasAll && !idDictionary) {
                resolve(this.items);
            }
            else {
                this._get(this.route + (idDictionary ? 'dictionary/' + idDictionary : ''))
                    .subscribe((items) => {
                    this.set(items, idDictionary);
                    // Here we also set the different paths
                    if (!idDictionary) {
                        this.hasAll = true;
                        resolve(this.items);
                    }
                    else {
                        resolve(this.getNovelPivots(idDictionary));
                    }
                });
            }
        });
    }
    add(params) {
        return new Promise((resolve, reject) => {
            this._post(this.route, params.values)
                .subscribe((item) => {
                if (item) {
                    this.set([item]);
                    resolve(item);
                }
                else {
                    reject('Error on inserting novel ' + params.values);
                }
            });
        });
    }
    update(params) {
        return new Promise((resolve, reject) => {
            this._put(this.route + params.id, params.values)
                .subscribe((item) => {
                if (item) {
                    this.set([item]);
                    resolve(item);
                }
                else {
                    reject('Error on updating novel ' + params.id);
                }
            });
        });
    }
    delete(params) {
        return new Promise((resolve, reject) => {
            this._delete(this.route + params.id)
                .subscribe((item) => {
                if (item) {
                    delete this.items[params.id];
                    resolve(true);
                }
                else {
                    reject('Error on deleting novel ' + params.id);
                }
            });
        });
    }
    getNovelPivots(idDictionary) {
        if (!this.pivots[idDictionary]) {
            return [];
        }
        else {
            const arr = [];
            for (const idNov of this.pivots[idDictionary]) {
                arr.push(this.items[idNov]);
            }
            return arr;
        }
    }
}
NovelsService.ɵfac = /*@__PURE__*/ function () { let ɵNovelsService_BaseFactory; return function NovelsService_Factory(t) { return (ɵNovelsService_BaseFactory || (ɵNovelsService_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](NovelsService)))(t || NovelsService); }; }();
NovelsService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: NovelsService, factory: NovelsService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 90158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 22560);



const routes = [
    {
        path: 'dashboard',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_cache_service_ts"), __webpack_require__.e("src_app_dashboard_index_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./dashboard */ 96998)).then(m => m.DashboardModule),
        data: { title: 'Dashboard', breadcrumb: 'Dashboard' }
    },
    {
        path: 'novel',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_novel_index_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./novel */ 42314)).then(m => m.NovelModule),
        data: { title: 'List Novels', breadcrumb: 'Novels' }
    },
    {
        path: 'dictionary',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_cache_service_ts"), __webpack_require__.e("default-src_app_dictionary_index_ts"), __webpack_require__.e("common")]).then(__webpack_require__.bind(__webpack_require__, /*! ./dictionary */ 84341)).then(m => m.DictionaryModule),
        data: { title: 'List Dictionaries', breadcrumb: 'Dictionaries' }
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forRoot(routes, { enableTracing: false })
        ], _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule] }); })();


/***/ }),

/***/ 55041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 92340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header/header.component */ 93482);




class AppComponent {
    constructor(router) {
        this.router = router;
        this.title = 'frontend';
        this.base = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.currentUrl;
        this.title = 'false';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router)); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, consts: [[1, "container"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } }, directives: [_header_header_component__WEBPACK_IMPORTED_MODULE_1__.HeaderComponent, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterOutlet], styles: [".container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNDLFdBQUE7RUFDQSxlQUFBO0FBQ0QiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lciB7XG5cdHdpZHRoOiAxMDAlO1xuXHRtYXgtd2lkdGg6IDEwMCU7XG59Il19 */", "jw-modal[_ngcontent-%COMP%] {\n  \n  display: none;\n}\njw-modal[_ngcontent-%COMP%]   .jw-modal[_ngcontent-%COMP%] {\n  \n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  \n  z-index: 1000;\n  \n  overflow: auto;\n}\njw-modal[_ngcontent-%COMP%]   .jw-modal[_ngcontent-%COMP%]   .jw-modal-body[_ngcontent-%COMP%] {\n  padding: 20px 50px;\n  background: #fff;\n  \n  margin: 40px;\n}\njw-modal[_ngcontent-%COMP%]   .jw-modal-background[_ngcontent-%COMP%] {\n  \n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  \n  background-color: #000;\n  opacity: 0.75;\n  \n  z-index: 900;\n}\nbody.jw-modal-open[_ngcontent-%COMP%] {\n  \n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGFsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO2dDQUFBO0FBRUE7RUFDSSxpQ0FBQTtFQUNBLGFBQUE7QUFESjtBQUdJO0VBQ0ksOENBQUE7RUFDQSxlQUFBO0VBQ0EsTUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUVBLHFEQUFBO0VBQ0EsYUFBQTtFQUVBLHNDQUFBO0VBQ0EsY0FBQTtBQUhSO0FBS1E7RUFDSSxrQkFBQTtFQUNBLGdCQUFBO0VBRUEsZ0RBQUE7RUFDQSxZQUFBO0FBSlo7QUFRSTtFQUNJLCtDQUFBO0VBQ0EsZUFBQTtFQUNBLE1BQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFFQSw0QkFBQTtFQUNBLHNCQUFBO0VBQ0EsYUFBQTtFQUVBLCtEQUFBO0VBQ0EsWUFBQTtBQVJSO0FBWUE7RUFDSSw2RUFBQTtFQUNBLGdCQUFBO0FBVEoiLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnRlZCBieSBzdHlsZXMuc2Nzc1xuXG4vKiBNT0RBTCBTVFlMRVNcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuanctbW9kYWwge1xuICAgIC8qIG1vZGFscyBhcmUgaGlkZGVuIGJ5IGRlZmF1bHQgKi9cbiAgICBkaXNwbGF5OiBub25lO1xuXG4gICAgLmp3LW1vZGFsIHtcbiAgICAgICAgLyogbW9kYWwgY29udGFpbmVyIGZpeGVkIGFjcm9zcyB3aG9sZSBzY3JlZW4gKi9cbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGxlZnQ6IDA7XG5cbiAgICAgICAgLyogei1pbmRleCBtdXN0IGJlIGhpZ2hlciB0aGFuIC5qdy1tb2RhbC1iYWNrZ3JvdW5kICovXG4gICAgICAgIHotaW5kZXg6IDEwMDA7XG5cbiAgICAgICAgLyogZW5hYmxlcyBzY3JvbGxpbmcgZm9yIHRhbGwgbW9kYWxzICovXG4gICAgICAgIG92ZXJmbG93OiBhdXRvO1xuXG4gICAgICAgIC5qdy1tb2RhbC1ib2R5IHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDIwcHggNTBweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG5cbiAgICAgICAgICAgIC8qIG1hcmdpbiBleHBvc2VzIHBhcnQgb2YgdGhlIG1vZGFsIGJhY2tncm91bmQgKi9cbiAgICAgICAgICAgIG1hcmdpbjogNDBweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5qdy1tb2RhbC1iYWNrZ3JvdW5kIHtcbiAgICAgICAgLyogbW9kYWwgYmFja2dyb3VuZCBmaXhlZCBhY3Jvc3Mgd2hvbGUgc2NyZWVuICovXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuXG4gICAgICAgIC8qIHNlbWktdHJhbnNwYXJlbnQgYmxhY2sgICovXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XG4gICAgICAgIG9wYWNpdHk6IDAuNzU7XG5cbiAgICAgICAgLyogei1pbmRleCBtdXN0IGJlIGJlbG93IC5qdy1tb2RhbCBhbmQgYWJvdmUgZXZlcnl0aGluZyBlbHNlICAqL1xuICAgICAgICB6LWluZGV4OiA5MDA7XG4gICAgfVxufVxuXG5ib2R5Lmp3LW1vZGFsLW9wZW4ge1xuICAgIC8qIGJvZHkgb3ZlcmZsb3cgaXMgaGlkZGVuIHRvIGhpZGUgbWFpbiBzY3JvbGxiYXIgd2hlbiBtb2RhbCB3aW5kb3cgaXMgb3BlbiAqL1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG59XG4iXX0= */"] });


/***/ }),

/***/ 36747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ 34497);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 58987);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 90158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 55041);
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header/header.component */ 93482);
/* harmony import */ var _services_modal_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_services/modal/modal.component */ 4820);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 19200);
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ 57817);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ 70655);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 22560);











_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_4__.library.add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__.fas);
class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ providers: [
        _services_modal_modal_component__WEBPACK_IMPORTED_MODULE_3__.ModalComponent,
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.BrowserModule,
            _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule,
            _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeModule, // Necessary for SVG
            //Papa,    // Necessary for CSV
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent,
        _header_header_component__WEBPACK_IMPORTED_MODULE_2__.HeaderComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.BrowserModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule,
        _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeModule] }); })();


/***/ }),

/***/ 93482:
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeaderComponent": () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 59151);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 53298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api */ 39354);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);






function HeaderComponent_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "li", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const breadcrumb_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", breadcrumb_r1.url);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("/ ", breadcrumb_r1.label, "");
} }
class HeaderComponent {
    constructor(router, activatedRoute, api) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.api = api;
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    }
    ngOnInit() {
        this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.filter)((event) => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__.NavigationEnd), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)()).subscribe((next) => {
            console.log('ROUTER', next, this.activatedRoute.root);
            this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
            this.renameLabels();
            console.log('ROUTER END');
        });
    }
    buildBreadCrumb(route, url = '', breadcrumbs = []) {
        // If no routeConfig is avalailable we are on the root path
        let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
        let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
        if (path === 'dashboard') {
            return [];
        }
        // If the route is dynamic route such as ':id', remove it
        // Nota that here, the id appears before the actions, thus, using "shift" instead of "pop"
        const lastRoutePart = path.split('/').shift();
        const isDynamicRoute = lastRoutePart.startsWith(':');
        let type = null;
        if (isDynamicRoute && !!route.snapshot) {
            const paramName = lastRoutePart.split(':')[1];
            path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
            label = route.snapshot.params[paramName]; // '_' + paramName + ':' + route.snapshot.params[paramName];
            type = paramName;
        }
        // In the routeConfig the complete path is not available,
        // so we rebuild it each time
        const nextUrl = path ? `${url}/${path}` : url;
        const breadcrumb = {
            label,
            url: nextUrl,
            type
        };
        // Only adding route with non-empty label
        const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
        if (route.firstChild) {
            // If we are not on our current path yet,
            // there will be more children to look after, to build our breadcumb
            return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
        }
        return newBreadcrumbs;
    }
    renameLabels() {
        const rememberVariables = {
            idNovel: null,
            idDictionary: null,
            idCategory: null,
            noChapter: null
        };
        console.log('header calls');
        this.breadcrumbs.forEach(el => {
            if (el.type) {
                rememberVariables[el.type] = parseInt(el.label, 10);
                el.label = '';
                switch (el.type) {
                    case 'idNovel':
                        this.api.Novel.get({ id: rememberVariables.idNovel })
                            .then(novel => {
                            el.label = 'Chapters: ' + novel.nameCustom;
                        });
                        break;
                    case 'idDictionary':
                        this.api.Dictionary.get({ id: rememberVariables.idDictionary })
                            .then(dictionary => {
                            el.label = 'Cat: ' + dictionary.name;
                        });
                        break;
                    case 'idCategory':
                        this.api.Category.get({ idDictionary: rememberVariables.idDictionary, id: rememberVariables.idCategory })
                            .then(category => {
                            el.label = 'Entries: ' + category.name;
                        });
                        break;
                    case 'noChapter':
                        this.api.Chapter.get({ idNovel: rememberVariables.idNovel, no: rememberVariables.noChapter })
                            .then(chapter => {
                            el.label = 'Chapter: ' + chapter.title;
                        });
                        break;
                }
            }
        });
        console.log('header calls end');
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_api__WEBPACK_IMPORTED_MODULE_0__.ApiService)); };
HeaderComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 7, vars: 1, consts: [["src", "assets/mtl_tools.png", "routerLink", "/", 1, "appName"], ["routerLink", "/dashboard", "routerLinkActive", "router-link-active"], [4, "ngFor", "ngForOf"], ["routerLinkActive", "router-link-active", 3, "routerLink"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "header");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "img", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Dashboard");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, HeaderComponent_ng_container_6_Template, 4, 2, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.breadcrumbs);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLinkActive, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf], styles: ["header[_ngcontent-%COMP%] {\n  background: #5e009f;\n  padding: 0px;\n  margin: 0px;\n  height: 100px;\n  cursor: pointer;\n}\nheader[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  float: left;\n}\nheader[_ngcontent-%COMP%]    > .appName[_ngcontent-%COMP%] {\n  height: 100%;\n}\nheader[_ngcontent-%COMP%]    > ul[_ngcontent-%COMP%] {\n  list-style: none;\n  height: 100%;\n  padding: 0px;\n  margin: 0px;\n}\nheader[_ngcontent-%COMP%]    > ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  height: 100%;\n  display: block;\n  float: left;\n  margin: 25px 0px 0px 20px;\n}\nheader[_ngcontent-%COMP%]    > ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  margin: auto;\n  height: 50px;\n  border-radius: 20px 20px 0px 20px;\n  color: #ffffff;\n}\nheader[_ngcontent-%COMP%]    > ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:after {\n  content: \"\";\n  display: block;\n  width: 0;\n  height: 0;\n  border: 13px solid transparent;\n  border-right-color: inherit;\n  position: absolute;\n  bottom: -14px;\n  right: -14px;\n  transform: rotate(-135deg);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNDLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDRyxhQUFBO0VBQ0EsZUFBQTtBQUNKO0FBQ0k7RUFDSSxXQUFBO0FBQ1I7QUFDSTtFQUNJLFlBQUE7QUFDUjtBQUNJO0VBQ0ksZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUFDUjtBQUNRO0VBQ0ksWUFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7QUFDWjtBQUNZO0VBQ0ksWUFBQTtFQUNBLFlBQUE7RUFDQSxpQ0FBQTtFQUNBLGNBQUE7QUFDaEI7QUFDZ0I7RUFDSSxXQUFBO0VBQ0EsY0FBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsOEJBQUE7RUFDQSwyQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSwwQkFBQTtBQUNwQiIsImZpbGUiOiJoZWFkZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJoZWFkZXIge1xuXHRiYWNrZ3JvdW5kOiAjNWUwMDlmO1xuXHRwYWRkaW5nOjBweDtcblx0bWFyZ2luOjBweDtcbiAgICBoZWlnaHQ6MTAwcHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICAgJiA+ICoge1xuICAgICAgICBmbG9hdDpsZWZ0O1xuICAgIH1cbiAgICAmID4gLmFwcE5hbWUge1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgfVxuICAgICYgPiB1bCB7XG4gICAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcGFkZGluZzowcHg7XG4gICAgICAgIG1hcmdpbjowcHg7XG5cbiAgICAgICAgJiBsaSB7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICBkaXNwbGF5OmJsb2NrO1xuICAgICAgICAgICAgZmxvYXQ6bGVmdDtcbiAgICAgICAgICAgIG1hcmdpbjogMjVweCAwcHggMHB4IDIwcHg7XG5cbiAgICAgICAgICAgICYgYSB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgICAgICAgICAgIGhlaWdodDo1MHB4O1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6MjBweCAyMHB4IDBweCAyMHB4O1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjZmZmZmZmO1xuXG4gICAgICAgICAgICAgICAgJjphZnRlciB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OmJsb2NrO1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMDtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAwO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDEzcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgICAgICBib3R0b206IC0xNHB4O1xuICAgICAgICAgICAgICAgICAgICByaWdodDogLTE0cHg7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0xMzVkZWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ== */"] });


/***/ }),

/***/ 92340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    currentUrl: 'http://mtltools.docker:800',
    backendServer: 'http://api.mtltools.docker:800',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 14431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 34497);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 36747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 92340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(14431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map