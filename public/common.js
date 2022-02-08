"use strict";
(self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || []).push([["common"],{

/***/ 62828:
/*!**************************************!*\
  !*** ./src/app/_models/formField.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Option": () => (/* binding */ Option),
/* harmony export */   "FormField": () => (/* binding */ FormField),
/* harmony export */   "Meta": () => (/* binding */ Meta)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ 2508);



let Option = class Option {
    constructor(value, label = null, checked = null) {
        this.value = value;
        this.label = label;
        this.checked = checked;
        if (!this.label) {
            this.label = this.value;
        }
        if (this.checked !== null) {
            this.control = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl(this.checked);
            this.control.setValue(this.checked);
        }
    }
    setChecked(checked) {
        this.control.setValue(checked);
    }
};
Option = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__param)(1, (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Optional)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__param)(2, (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Optional)())
], Option);

let FormField = class FormField {
    constructor(name, label, type, options = []) {
        this.name = name;
        this.label = label;
        this.type = type;
        this.options = options;
    }
    setOptions(options) {
        this.options = options;
    }
    getOption(value) {
        for (const opt of this.options) {
            if (opt.value === value) {
                return opt;
            }
        }
        return null;
    }
    getValues() {
        return this.options.filter((option) => {
            if (option.control.value) {
                return true;
            }
            return false;
        }).map(option => option.value);
    }
};
FormField = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__param)(3, (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Optional)())
], FormField);

class Meta {
    static drivers(drivers) {
        throw new Error('Method not implemented.');
    }
    static languages(languages) {
        throw new Error('Method not implemented.');
    }
}


/***/ })

}]);
//# sourceMappingURL=common.js.map