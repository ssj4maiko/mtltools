"use strict";
(self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || []).push([["default-src_app_dictionary_index_ts"],{

/***/ 58241:
/*!*************************************************!*\
  !*** ./src/app/dictionary/add/add.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddComponent": () => (/* binding */ AddComponent)
/* harmony export */ });
/* harmony import */ var _form_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../form.service */ 20152);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api */ 39354);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);







function AddComponent_div_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0, null, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const field_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("formControlName", field_r1.name);
  }
}

function AddComponent_div_4_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0, null, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "label", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const field_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("formControlName", field_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", field_r1.label, " ");
  }
}

function AddComponent_div_4_ng_container_4_option_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "option", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const option_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("value", option_r13.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](option_r13.label);
  }
}

function AddComponent_div_4_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0, null, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 5)(5, "select", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, AddComponent_div_4_ng_container_4_option_6_Template, 2, 2, "option", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const field_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](field_r1.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("formControlName", field_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", field_r1.options);
  }
}

function AddComponent_div_4_ng_container_5_p_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p")(1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const option_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControl", option_r17.control);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", option_r17.label, " ");
  }
}

function AddComponent_div_4_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0, null, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, AddComponent_div_4_ng_container_5_p_5_Template, 4, 2, "p", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const field_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", field_r1.label, " - ", field_r1.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", field_r1.options);
  }
}

function AddComponent_div_4_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0, null, 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "label", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const field_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("for", field_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](field_r1.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("type", field_r1.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("id", field_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("formControlName", field_r1.name);
  }
}

function AddComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](1, 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, AddComponent_div_4_ng_container_2_Template, 3, 1, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, AddComponent_div_4_ng_container_3_Template, 5, 2, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, AddComponent_div_4_ng_container_4_Template, 7, 3, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, AddComponent_div_4_ng_container_5_Template, 6, 3, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, AddComponent_div_4_ng_container_6_Template, 6, 5, "ng-container", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const field_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitch", field_r1.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitchCase", "hidden");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitchCase", "checkbox");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitchCase", "select");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitchCase", "multiselect");
  }
}

let AddComponent = /*#__PURE__*/(() => {
  class AddComponent extends _form_service__WEBPACK_IMPORTED_MODULE_0__.FormService {
    constructor(router, route, api, formBuilder) {
      super(formBuilder);
      this.router = router;
      this.route = route;
      this.api = api;
      this.formBuilder = formBuilder;
    }

    ngOnInit() {
      this.idNovel = this.route.snapshot.params.idNovel;
      this.idDictionary = this.route.snapshot.params.idDictionary;
      this.formTitle = 'Edit Dictionary';
      Promise.all([this.api.Meta.get('languages'), this.api.Dictionary.get({
        id: this.idDictionary
      }), this.api.Novel.getAll()]).then(values => {
        this.dictionary = values[1];
        this.novels = values[2];
        this.loadMeta(values[0], values[2]);

        if (this.idNovel) {
          this.api.Novel.get({
            id: this.idNovel
          }).then(novel => {
            this.setValues(null, [novel]);
          });
        }

        this.getForm(true);
      });
    }

    submitForm(form) {
      const values = this.getValues(this.novels);
      this.api.Dictionary.add({
        values
      }).then(res => {
        this.goBack();
      }, err => {
        console.log(err);
      });
    }

    LINK(idDictionary, action) {
      const base = [];

      if (this.idNovel) {
        base.push('novel');
        base.push(this.idNovel);
      }

      base.push('dictionary');

      if (action) {
        base.push(action);
      }

      if (idDictionary) {
        base.push(idDictionary);
      }

      this.router.navigate(base);
    }

    goBack() {
      this.LINK();
    }

  }

  AddComponent.ɵfac = function AddComponent_Factory(t) {
    return new (t || AddComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_api__WEBPACK_IMPORTED_MODULE_1__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder));
  };

  AddComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: AddComponent,
    selectors: [["app-dictionary-add"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
    decls: 10,
    vars: 3,
    consts: [[1, "form-content"], [1, "title"], [3, "formGroup", "ngSubmit"], ["class", "field", 4, "ngFor", "ngForOf"], [1, "field", "is-grouped"], [1, "control"], ["type", "submit", "value", "Submit", 1, "button", "is-link"], ["value", "Cancel", 1, "button", "is-danger", 3, "click"], [1, "field"], [3, "ngSwitch"], [4, "ngSwitchCase"], [4, "ngSwitchDefault"], ["tempHidden", ""], ["type", "hidden", 3, "formControlName"], ["tempCheck", ""], [1, "checkbox"], ["type", "checkbox", 3, "formControlName"], [3, "formControlName"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [4, "ngFor", "ngForOf"], ["type", "checkbox", 3, "formControl"], ["tempText", ""], [1, "label", 3, "for"], [1, "input", 3, "type", "id", "formControlName"]],
    template: function AddComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function AddComponent_Template_form_ngSubmit_3_listener() {
          return ctx.submitForm(ctx.formGroup.value);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, AddComponent_div_4_Template, 7, 5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 4)(6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 5)(9, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AddComponent_Template_input_click_9_listener() {
          return ctx.goBack();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      }

      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.formTitle);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.formGroup);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.form);
      }
    },
    directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgSwitchCase, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlDirective, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgSwitchDefault],
    styles: [".form-content[_ngcontent-%COMP%] {\n  padding: 30px;\n  border-radius: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7QUFDSiIsImZpbGUiOiJmb3JtLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tY29udGVudCB7XG4gICAgcGFkZGluZzozMHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG59XG4iXX0= */"]
  });
  return AddComponent;
})();

/***/ }),

/***/ 70991:
/*!*********************************************************!*\
  !*** ./src/app/dictionary/dictionary-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DictionaryRoutingModule": () => (/* binding */ DictionaryRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _list_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list/list.component */ 83795);
/* harmony import */ var _add_add_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add/add.component */ 58241);
/* harmony import */ var _edit_edit_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit/edit.component */ 81519);
/* harmony import */ var _diff_diff_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./diff/diff.component */ 62364);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);








const routes = [{
  path: '',
  component: _list_list_component__WEBPACK_IMPORTED_MODULE_0__.ListComponent,
  data: {
    title: 'List Dictionaries'
  }
}, {
  path: 'add',
  component: _add_add_component__WEBPACK_IMPORTED_MODULE_1__.AddComponent,
  data: {
    title: 'Add Dictionaries',
    breadcrumb: 'Add Dictionary'
  }
}, {
  path: 'edit/:idDictionary',
  component: _edit_edit_component__WEBPACK_IMPORTED_MODULE_2__.EditComponent,
  data: {
    title: 'Edit Dictionary',
    breadcrumb: 'Edit Dictionary'
  }
}, {
  path: 'diff/:idDictionary',
  component: _diff_diff_component__WEBPACK_IMPORTED_MODULE_3__.DiffComponent,
  data: {
    title: 'Diff Dictionary',
    breadcrumb: 'Diff'
  }
}, {
  path: ':idDictionary',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_category_index_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../category */ 98229)).then(m => m.CategoryModule),
  data: {
    title: 'View categories',
    breadcrumb: 'View Categories'
  }
}, {
  path: '**',
  redirectTo: ''
}];
let DictionaryRoutingModule = /*#__PURE__*/(() => {
  class DictionaryRoutingModule {}

  DictionaryRoutingModule.ɵfac = function DictionaryRoutingModule_Factory(t) {
    return new (t || DictionaryRoutingModule)();
  };

  DictionaryRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: DictionaryRoutingModule
  });
  DictionaryRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
  });
  return DictionaryRoutingModule;
})();

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](DictionaryRoutingModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
  });
})();

/***/ }),

/***/ 41260:
/*!*************************************************!*\
  !*** ./src/app/dictionary/dictionary.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DictionaryModule": () => (/* binding */ DictionaryModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _dictionary_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dictionary-routing.module */ 70991);
/* harmony import */ var _list_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list/list.component */ 83795);
/* harmony import */ var _add_add_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add/add.component */ 58241);
/* harmony import */ var _edit_edit_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit/edit.component */ 81519);
/* harmony import */ var _diff_diff_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./diff/diff.component */ 62364);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);








let DictionaryModule = /*#__PURE__*/(() => {
  class DictionaryModule {}

  DictionaryModule.ɵfac = function DictionaryModule_Factory(t) {
    return new (t || DictionaryModule)();
  };

  DictionaryModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
    type: DictionaryModule
  });
  DictionaryModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
    imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _dictionary_routing_module__WEBPACK_IMPORTED_MODULE_0__.DictionaryRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule]]
  });
  return DictionaryModule;
})();

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](DictionaryModule, {
    declarations: [_list_list_component__WEBPACK_IMPORTED_MODULE_1__.ListComponent, _add_add_component__WEBPACK_IMPORTED_MODULE_2__.AddComponent, _edit_edit_component__WEBPACK_IMPORTED_MODULE_3__.EditComponent, _diff_diff_component__WEBPACK_IMPORTED_MODULE_4__.DiffComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _dictionary_routing_module__WEBPACK_IMPORTED_MODULE_0__.DictionaryRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule]
  });
})();

/***/ }),

/***/ 62364:
/*!***************************************************!*\
  !*** ./src/app/dictionary/diff/diff.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DiffComponent": () => (/* binding */ DiffComponent)
/* harmony export */ });
/* harmony import */ var src_app_models_dictionaryentry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/_models/dictionaryentry */ 93178);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/api */ 39354);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);







function DiffComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 9)(1, "div", 10)(2, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DiffComponent_ng_template_0_Template_a_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return ctx_r5.saveList();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Save List");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
}

function DiffComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](0);
  }
}

function DiffComponent_option_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "option", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const dictionary_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("value", dictionary_r7.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](dictionary_r7.language);
  }
}

function DiffComponent_ng_container_32_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const entry2select_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r10.categoriesSelectedHash[ctx_r10.entriesSelected[ctx_r10.entry2SelectHash[entry2select_r8].selected].idCategory].name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r10.entriesSelected[ctx_r10.entry2SelectHash[entry2select_r8].selected].entryTranslation, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r10.entriesSelected[ctx_r10.entry2SelectHash[entry2select_r8].selected].entryOriginal, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r10.entriesSelected[ctx_r10.entry2SelectHash[entry2select_r8].selected].description, " ");
  }
}

function DiffComponent_ng_container_32_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, " - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, " - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}

function DiffComponent_ng_container_32_ng_container_7_option_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "option", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const category_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("value", category_r18.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](category_r18.name);
  }
}

function DiffComponent_ng_container_32_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "td")(2, "select", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function DiffComponent_ng_container_32_ng_container_7_Template_select_ngModelChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r20);
      const entry2select_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return ctx_r19.entries[ctx_r19.entry2SelectHash[entry2select_r8].entry].idCategory = $event;
    })("ngModelChange", function DiffComponent_ng_container_32_ng_container_7_Template_select_ngModelChange_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r20);
      const entry2select_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return ctx_r22.changeEntry(ctx_r22.entries[ctx_r22.entry2SelectHash[entry2select_r8].entry]);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, DiffComponent_ng_container_32_ng_container_7_option_3_Template, 2, 2, "option", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "td")(5, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function DiffComponent_ng_container_32_ng_container_7_Template_input_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r20);
      const entry2select_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return ctx_r24.entries[ctx_r24.entry2SelectHash[entry2select_r8].entry].entryTranslation = $event;
    })("ngModelChange", function DiffComponent_ng_container_32_ng_container_7_Template_input_ngModelChange_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r20);
      const entry2select_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return ctx_r26.changeEntry(ctx_r26.entries[ctx_r26.entry2SelectHash[entry2select_r8].entry]);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "td")(7, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function DiffComponent_ng_container_32_ng_container_7_Template_input_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r20);
      const entry2select_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return ctx_r28.entries[ctx_r28.entry2SelectHash[entry2select_r8].entry].entryOriginal = $event;
    })("ngModelChange", function DiffComponent_ng_container_32_ng_container_7_Template_input_ngModelChange_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r20);
      const entry2select_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return ctx_r30.changeEntry(ctx_r30.entries[ctx_r30.entry2SelectHash[entry2select_r8].entry]);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "td")(9, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function DiffComponent_ng_container_32_ng_container_7_Template_input_ngModelChange_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r20);
      const entry2select_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return ctx_r32.entries[ctx_r32.entry2SelectHash[entry2select_r8].entry].description = $event;
    })("ngModelChange", function DiffComponent_ng_container_32_ng_container_7_Template_input_ngModelChange_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r20);
      const entry2select_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return ctx_r34.changeEntry(ctx_r34.entries[ctx_r34.entry2SelectHash[entry2select_r8].entry]);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const entry2select_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r13.entries[ctx_r13.entry2SelectHash[entry2select_r8].entry].idCategory);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r13.categories);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r13.entries[ctx_r13.entry2SelectHash[entry2select_r8].entry].entryTranslation);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r13.entries[ctx_r13.entry2SelectHash[entry2select_r8].entry].entryOriginal);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r13.entries[ctx_r13.entry2SelectHash[entry2select_r8].entry].description);
  }
}

function DiffComponent_ng_container_32_ng_template_8_option_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "option", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const category_r38 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("value", category_r38.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](category_r38.name);
  }
}

function DiffComponent_ng_container_32_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td")(1, "select", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function DiffComponent_ng_container_32_ng_template_8_Template_select_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r41);
      const i_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().index;
      const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return ctx_r39.addEntry($event, i_r9);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "option", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Select a category to copy");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, DiffComponent_ng_container_32_ng_template_8_option_4_Template, 2, 2, "option", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, " - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, " - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, " - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r15.categories);
  }
}

const _c0 = function (a0, a1, a2) {
  return {
    "new": a0,
    "deleted": a1,
    "changed": a2
  };
};

function DiffComponent_ng_container_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "tr", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, DiffComponent_ng_container_32_ng_container_2_Template, 9, 4, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, DiffComponent_ng_container_32_ng_template_3_Template, 8, 0, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "|");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, DiffComponent_ng_container_32_ng_container_7_Template, 10, 5, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, DiffComponent_ng_container_32_ng_template_8_Template, 11, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const entry2select_r8 = ctx.$implicit;

    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](4);

    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](9);

    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction3"](5, _c0, ctx_r4.entry2SelectHash[entry2select_r8].entry && ctx_r4.entries[ctx_r4.entry2SelectHash[entry2select_r8].entry].id == 0, ctx_r4.entry2SelectHash[entry2select_r8].entry && ctx_r4.entries[ctx_r4.entry2SelectHash[entry2select_r8].entry].delete == true, ctx_r4.entry2SelectHash[entry2select_r8].entry && ctx_r4.entries[ctx_r4.entry2SelectHash[entry2select_r8].entry].update == true));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r4.entry2SelectHash[entry2select_r8] && ctx_r4.entry2SelectHash[entry2select_r8].selected)("ngIfElse", _r11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r4.entry2SelectHash[entry2select_r8] && ctx_r4.entry2SelectHash[entry2select_r8].entry != null)("ngIfElse", _r14);
  }
}

let DiffComponent = /*#__PURE__*/(() => {
  class DiffComponent {
    constructor(api, route, router) {
      this.api = api;
      this.route = route;
      this.router = router;
      this.dictionaries = [];
      this.categories = [];
      this.categoriesHash = {};
      this.entries = [];
      this.entriesOriginalValues = {};
      this.entry2SelectHash = {};
      this.entry2SelectHashKeys = [];
      this.categoriesSelected = [];
      this.categoriesSelectedHash = {};
      this.entriesSelected = [];
    }

    ngOnInit() {
      this.idNovel = this.route.snapshot.params.idNovel;
      this.idDictionary = this.route.snapshot.params.idDictionary;
      this.api.Dictionary.getAll({
        idNovel: this.idNovel
      }).then(dictionaries => {
        // this.novels = [novels];
        this.dictionaries = Object.values(dictionaries);
        this.getCache();
      }, error => {
        console.log(error);
      });
    }

    ngOnDestroy() {
      delete this.dictionaries;
      delete this.categories;
      delete this.categoriesHash;
      delete this.entries;
      delete this.idDictionary;
      delete this.entry2SelectHash;
      delete this.entry2SelectHashKeys;
      delete this.categoriesSelected;
      delete this.categoriesSelectedHash;
      delete this.entriesSelected;
      delete this.idDictionarySelected;
    }

    loadSelectedDictionary() {
      this.getSelectedCache();
    }

    changeEntry(entry) {
      if (entry.id > 0) {
        console.log('changeEntry', entry.id, entry.idCategory, entry);
        entry.update = entry.entryOriginal != this.entriesOriginalValues[entry.id].entryOriginal || entry.entryTranslation != this.entriesOriginalValues[entry.id].entryTranslation || !!entry.description && entry.description != this.entriesOriginalValues[entry.id].description || entry.idCategory != this.entriesOriginalValues[entry.id].idCategory;
      }
    }

    addEntry($event, i) {
      const idCategory = $event.target.value,
            selectedValues = this.entry2SelectHash[this.entry2SelectHashKeys[i]],
            selectedEntry = this.entriesSelected[selectedValues.selected],
            newEntry = new src_app_models_dictionaryentry__WEBPACK_IMPORTED_MODULE_0__.DictionaryEntry();
      newEntry.id = 0;
      newEntry.idCategory = idCategory;
      newEntry.entryOriginal = selectedEntry.entryOriginal;
      newEntry.entryTranslation = selectedEntry.entryTranslation;
      newEntry.description = selectedEntry.description;
      selectedValues.entry = this.entries.length;
      this.entries.push(newEntry);
    }

    saveList() {
      const tmpEntries = {},
            send = [];
      this.categories.forEach(category => {
        send.push(category);
        tmpEntries[category.id] = [];
      });
      this.entries.forEach(entry => {
        tmpEntries[entry.idCategory].push(entry);
      });
      send.forEach(sen => {
        sen.entries = tmpEntries[sen.id];
      });
      this.api.Dictionary.fullSave(this.idDictionary, send).then(status => {
        if (status) {
          this.categories = [];
          this.dictionaries = Object.values(this.api.Dictionary.getAll());
          this.router.navigate(['/novel/dictionary/']);
        }
      });
    }

    getCache() {
      if (this.categories.length == 0) {
        this.api.Dictionary.getCache(this.idDictionary).then(status => {
          this.categories = [];
          this.entries = [];
          this.api.Category.getAll({
            idDictionary: this.idDictionary
          }).then(categories => {
            this.categories = categories;
            this.categories.forEach(category => {
              this.categoriesHash[category.id] = {
                name: category.name
              };
              this.api.Entry.getAll({
                idDictionary: this.idDictionary,
                idCategory: category.id
              }).then(entries => {
                for (const i in entries) {
                  this.entry2SelectHash[entries[i].entryOriginal] = {
                    entry: this.entries.length,
                    selected: null
                  };
                  this.entries.push(entries[i]);
                  this.entriesOriginalValues[entries[i].id] = {
                    entryOriginal: '' + entries[i].entryOriginal,
                    entryTranslation: '' + entries[i].entryTranslation,
                    description: '' + entries[i].description,
                    idCategory: '' + entries[i].idCategory
                  };
                }
              });
            });
          });
          this.entry2SelectHashKeys = Object.keys(this.entry2SelectHash);
        });
      }
    }

    getSelectedCache() {
      this.api.Dictionary.getCache(this.idDictionarySelected).then(status => {
        this.categoriesSelected = [];
        this.entriesSelected = [];
        this.api.Category.getAll({
          idDictionary: this.idDictionarySelected
        }).then(categories => {
          this.categoriesSelected = categories;
        });
        this.categoriesSelected.forEach(category => {
          this.categoriesSelectedHash[category.id] = {
            name: category.name
          };
          this.api.Entry.getAll({
            idDictionary: this.idDictionarySelected,
            idCategory: category.id
          }).then(entries => {
            for (const i in entries) {
              if (!this.entry2SelectHash[entries[i].entryOriginal]) {
                this.entry2SelectHash[entries[i].entryOriginal] = {
                  entry: null,
                  selected: this.entriesSelected.length
                };
              } else {
                this.entry2SelectHash[entries[i].entryOriginal].selected = this.entriesSelected.length;
              }

              this.entriesSelected.push(entries[i]);
            }
          });
        });
        this.entry2SelectHashKeys = Object.keys(this.entry2SelectHash);
      });
    }

  }

  DiffComponent.ɵfac = function DiffComponent_Factory(t) {
    return new (t || DiffComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_api__WEBPACK_IMPORTED_MODULE_1__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
  };

  DiffComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: DiffComponent,
    selectors: [["app-diff"]],
    decls: 33,
    vars: 4,
    consts: [["actionButtons", ""], [4, "ngTemplateOutlet"], [1, "table", "is-stripede", "is-fullwidth", "tableContent"], ["colspan", "4"], [3, "ngModel", "ngModelChange", "change"], ["value", "", "selected", "selected"], [3, "value", 4, "ngFor", "ngForOf"], [1, "tableContent"], [4, "ngFor", "ngForOf"], [1, "columns", "actionButtons"], [1, "column"], [1, "button", "is-info", 3, "click"], [3, "value"], [3, "ngClass"], [4, "ngIf", "ngIfElse"], ["selectedEmpty", ""], ["nonAnEntry", ""], [3, "ngModel", "ngModelChange"], ["type", "text", 3, "ngModel", "ngModelChange"], [3, "change"], ["value", ""]],
    template: function DiffComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, DiffComponent_ng_template_0_Template, 4, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, DiffComponent_ng_container_2_Template, 1, 0, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div")(4, "table", 2)(5, "thead")(6, "tr")(7, "th", 3)(8, "select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function DiffComponent_Template_select_ngModelChange_8_listener($event) {
          return ctx.idDictionarySelected = $event;
        })("change", function DiffComponent_Template_select_change_8_listener() {
          return ctx.loadSelectedDictionary();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "option", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Select a Dictionary");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, DiffComponent_option_11_Template, 2, 2, "option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "tr")(13, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Original");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Translated");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Description");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Category");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "|");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, "Category");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "Original");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "Translated");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "Description");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "tbody", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](32, DiffComponent_ng_container_32_Template, 10, 9, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      }

      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutlet", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.idDictionarySelected);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.dictionaries);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.entry2SelectHashKeys);
      }
    },
    directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgTemplateOutlet, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgSelectMultipleOption"], _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor],
    styles: [".actionButtons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-align: center;\n  width: 100%;\n}\n\n.tableContent[_ngcontent-%COMP%]    > tbody[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]:nth-child(odd) {\n  background-color: #eee;\n}\n\n.tableContent[_ngcontent-%COMP%]    > tbody[_ngcontent-%COMP%]    > tr.changed[_ngcontent-%COMP%] {\n  background-color: #aFa;\n}\n\n.tableContent[_ngcontent-%COMP%]    > tbody[_ngcontent-%COMP%]    > tr.new[_ngcontent-%COMP%] {\n  background-color: #aaF;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpZmYuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDQyxrQkFBQTtFQUNBLFdBQUE7QUFDRDs7QUFHUTtFQUNJLHNCQUFBO0FBQVo7O0FBRVE7RUFDSSxzQkFBQTtBQUFaOztBQUVRO0VBQ0ksc0JBQUE7QUFBWiIsImZpbGUiOiJkaWZmLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFjdGlvbkJ1dHRvbnMgYSB7XG5cdHRleHQtYWxpZ246IGNlbnRlcjtcblx0d2lkdGg6MTAwJTtcbn1cbi50YWJsZUNvbnRlbnR7XG4gICAgJiA+IHRib2R5IHtcbiAgICAgICAgJiA+IHRyOm50aC1jaGlsZChvZGQpe1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojZWVlO1xuICAgICAgICB9XG4gICAgICAgICYgPiB0ci5jaGFuZ2VkIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6I2FGYTtcbiAgICAgICAgfVxuICAgICAgICAmID4gdHIubmV3IHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6I2FhRjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ== */"]
  });
  return DiffComponent;
})();

/***/ }),

/***/ 81519:
/*!***************************************************!*\
  !*** ./src/app/dictionary/edit/edit.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditComponent": () => (/* binding */ EditComponent)
/* harmony export */ });
/* harmony import */ var _form_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../form.service */ 20152);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api */ 39354);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);







function EditComponent_div_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0, null, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const field_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("formControlName", field_r1.name);
  }
}

function EditComponent_div_4_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0, null, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "label", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const field_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("formControlName", field_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", field_r1.label, " ");
  }
}

function EditComponent_div_4_ng_container_4_option_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "option", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const option_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("value", option_r13.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](option_r13.label);
  }
}

function EditComponent_div_4_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0, null, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 5)(5, "select", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, EditComponent_div_4_ng_container_4_option_6_Template, 2, 2, "option", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const field_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](field_r1.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("formControlName", field_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", field_r1.options);
  }
}

function EditComponent_div_4_ng_container_5_p_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p")(1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const option_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControl", option_r17.control);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", option_r17.label, " ");
  }
}

function EditComponent_div_4_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0, null, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, EditComponent_div_4_ng_container_5_p_5_Template, 4, 2, "p", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const field_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", field_r1.label, " - ", field_r1.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", field_r1.options);
  }
}

function EditComponent_div_4_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0, null, 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "label", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const field_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("for", field_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](field_r1.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("type", field_r1.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("id", field_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("formControlName", field_r1.name);
  }
}

function EditComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](1, 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, EditComponent_div_4_ng_container_2_Template, 3, 1, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, EditComponent_div_4_ng_container_3_Template, 5, 2, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, EditComponent_div_4_ng_container_4_Template, 7, 3, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, EditComponent_div_4_ng_container_5_Template, 6, 3, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, EditComponent_div_4_ng_container_6_Template, 6, 5, "ng-container", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const field_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitch", field_r1.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitchCase", "hidden");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitchCase", "checkbox");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitchCase", "select");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitchCase", "multiselect");
  }
}

let EditComponent = /*#__PURE__*/(() => {
  class EditComponent extends _form_service__WEBPACK_IMPORTED_MODULE_0__.FormService {
    constructor(router, route, api, formBuilder) {
      super(formBuilder);
      this.router = router;
      this.route = route;
      this.api = api;
      this.formBuilder = formBuilder;
    }

    ngOnInit() {
      this.idNovel = this.route.snapshot.params.idNovel;
      this.idDictionary = this.route.snapshot.params.idDictionary;
      this.formTitle = 'Edit Dictionary';
      Promise.all([this.api.Meta.get('languages'), this.api.Dictionary.get({
        id: this.idDictionary
      }), this.api.Novel.getAll()]).then(values => {
        this.api.Novel.getAll({
          idDictionary: this.idDictionary
        }).then(selectedNovels => {
          //console.log('SELECTED NOVELS', selectedNovels);
          this.dictionary = values[1];
          this.novels = values[2];
          this.loadMeta(values[0], values[2]);
          this.setValues(values[1], selectedNovels);
          this.getForm(false);
        });
      });
    }

    submitForm(form) {
      const values = this.getValues(this.novels); //console.log('submitForm',values);

      this.api.Dictionary.update({
        id: this.idDictionary,
        values
      }).then(res => {
        this.goBack();
      }, err => {
        console.log(err);
      });
    }

    goBack() {
      this.router.navigate(['/dictionary']);
    }

  }

  EditComponent.ɵfac = function EditComponent_Factory(t) {
    return new (t || EditComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_api__WEBPACK_IMPORTED_MODULE_1__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder));
  };

  EditComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: EditComponent,
    selectors: [["app-dictionary-edit"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
    decls: 10,
    vars: 3,
    consts: [[1, "form-content"], [1, "title"], [3, "formGroup", "ngSubmit"], ["class", "field", 4, "ngFor", "ngForOf"], [1, "field", "is-grouped"], [1, "control"], ["type", "submit", "value", "Submit", 1, "button", "is-link"], ["value", "Cancel", 1, "button", "is-danger", 3, "click"], [1, "field"], [3, "ngSwitch"], [4, "ngSwitchCase"], [4, "ngSwitchDefault"], ["tempHidden", ""], ["type", "hidden", 3, "formControlName"], ["tempCheck", ""], [1, "checkbox"], ["type", "checkbox", 3, "formControlName"], [3, "formControlName"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [4, "ngFor", "ngForOf"], ["type", "checkbox", 3, "formControl"], ["tempText", ""], [1, "label", 3, "for"], [1, "input", 3, "type", "id", "formControlName"]],
    template: function EditComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function EditComponent_Template_form_ngSubmit_3_listener() {
          return ctx.submitForm(ctx.formGroup.value);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, EditComponent_div_4_Template, 7, 5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 4)(6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 5)(9, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function EditComponent_Template_input_click_9_listener() {
          return ctx.goBack();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      }

      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.formTitle);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.formGroup);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.form);
      }
    },
    directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgSwitchCase, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlDirective, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgSwitchDefault],
    styles: [".form-content[_ngcontent-%COMP%] {\n  padding: 30px;\n  border-radius: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7QUFDSiIsImZpbGUiOiJmb3JtLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tY29udGVudCB7XG4gICAgcGFkZGluZzozMHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG59XG4iXX0= */"]
  });
  return EditComponent;
})();

/***/ }),

/***/ 20152:
/*!********************************************!*\
  !*** ./src/app/dictionary/form.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormService": () => (/* binding */ FormService)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _models_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_models/dictionary */ 27783);
/* harmony import */ var _models_formField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_models/formField */ 62828);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);





let FormService = /*#__PURE__*/(() => {
  class FormService {
    constructor(formBuilder) {
      this.formBuilder = formBuilder;
      this.selectNovels = [];
      this.selectLanguages = [];
      this.indexes = [];
      this.formGroup = formBuilder.group({
        id: [null],
        name: [null],
        language: [null],
        novel: [null]
      });
    }

    loadMeta(meta, novels) {
      this.selectLanguages = [];

      for (const value of Object.keys(meta.languages)) {
        this.selectLanguages.push(new _models_formField__WEBPACK_IMPORTED_MODULE_1__.Option(value, meta.languages[value]));
      }

      this.selectNovels = [];

      for (const value of Object.keys(novels)) {
        this.selectNovels.push(new _models_formField__WEBPACK_IMPORTED_MODULE_1__.Option(novels[value].id + '', novels[value].nameCustom, false));
      }
    }

    addForm(name, label, type, options) {
      this.indexes.push(name);
      this.form.push(new _models_formField__WEBPACK_IMPORTED_MODULE_1__.FormField(name, label, type, options));
    }

    getForm(insert) {
      this.form = [];

      if (insert) {
        this.addForm('id', '', 'hidden');
      }

      this.addForm('name', 'Name', 'text');
      this.addForm('language', 'Language', 'select', this.selectLanguages);
      this.addForm('novel', 'Novels', 'multiselect', this.selectNovels);
    }

    setValues(dictionary, novels) {
      const novValues = novels.map(nove => nove.id + '');
      const nov = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormArray(this.selectNovels.map(option => {
        if (novValues.includes(option.value)) {
          option.setChecked(true);
        }

        return option.control;
      }));

      if (dictionary) {
        this.formGroup.setValue({
          id: dictionary.id,
          name: dictionary.name,
          language: dictionary.language,
          novel: nov
        });
      }
    }

    getValues(novelsAlreadyThere) {
      const values2return = {
        dictionary: null,
        novels: null
      };
      values2return.dictionary = new _models_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary(this.formGroup.value); //console.log(values2return.dictionary);

      delete values2return.dictionary.novel;
      const novIndex = this.indexes.indexOf('novel');
      values2return.novels = this.form[novIndex].getValues().map(item => parseInt(item, 10));

      if (novelsAlreadyThere && novelsAlreadyThere.length === values2return.novels.length) {
        const dictValues = novelsAlreadyThere.map(item => item.id);

        if (JSON.stringify(dictValues) === JSON.stringify(values2return.novels)) {
          delete values2return.novels;
        }
      }

      return values2return;
    }

  }

  FormService.ɵfac = function FormService_Factory(t) {
    return new (t || FormService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder));
  };

  FormService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: FormService,
    factory: FormService.ɵfac,
    providedIn: 'root'
  });
  return FormService;
})();

/***/ }),

/***/ 84341:
/*!*************************************!*\
  !*** ./src/app/dictionary/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DictionaryModule": () => (/* reexport safe */ _dictionary_module__WEBPACK_IMPORTED_MODULE_0__.DictionaryModule)
/* harmony export */ });
/* harmony import */ var _dictionary_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dictionary.module */ 41260);


/***/ }),

/***/ 83795:
/*!***************************************************!*\
  !*** ./src/app/dictionary/list/list.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListComponent": () => (/* binding */ ListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api */ 39354);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 94666);





function ListComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 5)(1, "div", 6)(2, "a", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ListComponent_ng_template_0_Template_a_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return ctx_r4.LINK(null, "add");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Add Dictionary");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
}

function ListComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainer"](0);
  }
}

const _c0 = function () {
  return [];
};

function ListComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "tr")(2, "td", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ListComponent_ng_container_16_Template_td_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const dictionary_r6 = restoredCtx.$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return ctx_r7.LINK(dictionary_r6.id);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "td", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ListComponent_ng_container_16_Template_td_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const dictionary_r6 = restoredCtx.$implicit;
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return ctx_r9.LINK(dictionary_r6.id);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "td", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ListComponent_ng_container_16_Template_td_click_6_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const dictionary_r6 = restoredCtx.$implicit;
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return ctx_r10.LINK(dictionary_r6.id);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "td")(9, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ListComponent_ng_container_16_Template_a_click_9_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const dictionary_r6 = restoredCtx.$implicit;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return ctx_r11.LINK(dictionary_r6.id, "edit");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, " / ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ListComponent_ng_container_16_Template_a_click_12_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const dictionary_r6 = restoredCtx.$implicit;
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return ctx_r12.delete(dictionary_r6.id);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const dictionary_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](dictionary_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](dictionary_r6.language);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](dictionary_r6.countCategories());
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](4, _c0));
  }
}

let ListComponent = /*#__PURE__*/(() => {
  class ListComponent {
    constructor(router, route, api) {
      this.router = router;
      this.route = route;
      this.api = api;
      this.dictionaries = [];
      this.idNovel = null;
    }

    ngOnInit() {
      this.loadList();
    }

    loadList() {
      this.idNovel = this.route.snapshot.params.idNovel;
      this.api.Dictionary.getAll({
        idNovel: this.idNovel
      }).then(dictionaries => {
        // this.novels = [novels];
        this.dictionaries = Object.values(dictionaries);
      }, error => {
        console.log(error);
      });
    }

    LINK(idDictionary, action) {
      const base = [];

      if (this.idNovel) {
        base.push('novel');
        base.push(this.idNovel);
      }

      base.push('dictionary');

      if (action) {
        base.push(action);
      }

      if (idDictionary) {
        base.push(idDictionary);
      }

      console.log('LINK', base);
      this.router.navigate(base);
    }

    delete(idDictionary) {
      if (confirm('Are you sure?')) {
        this.api.Dictionary.delete({
          id: idDictionary
        }).then(_ => {
          // this.novels = [novels];
          this.loadList();
        }, error => {
          console.log(error);
        });
      }

      return true;
    }

  }

  ListComponent.ɵfac = function ListComponent_Factory(t) {
    return new (t || ListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_api__WEBPACK_IMPORTED_MODULE_0__.ApiService));
  };

  ListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: ListComponent,
    selectors: [["app-dictionary-list"]],
    decls: 17,
    vars: 2,
    consts: [["actionButtons", ""], [4, "ngTemplateOutlet"], [1, "table", "is-striped", "is-hoverable", "is-fullwidth"], [2, "width", "200px"], [4, "ngFor", "ngForOf"], [1, "columns", "actionButtons"], [1, "column"], [1, "button", "is-info", 3, "click"], [3, "click"], [1, "icon", "has-text-success", 3, "click"], [1, "fas", "fa-info-circle"], [1, "icon", "has-text-danger", 3, "routerLink", "click"], [1, "fas", "fa-ban"]],
    template: function ListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, ListComponent_ng_template_0_Template, 4, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, ListComponent_ng_container_3_Template, 1, 0, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "table", 2)(5, "thead")(6, "tr")(7, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Language");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "# of Categories");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Actions");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, ListComponent_ng_container_16_Template, 14, 5, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      }

      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.dictionaries);
      }
    },
    directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgTemplateOutlet, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLinkWithHref],
    styles: [".columns[_ngcontent-%COMP%] {\n  margin: 5px;\n}\n\n.actionButtons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-align: center;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDQyxXQUFBO0FBQ0Q7O0FBQ0E7RUFDQyxrQkFBQTtFQUNBLFdBQUE7QUFFRCIsImZpbGUiOiJsaXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbHVtbnMge1xuXHRtYXJnaW46NXB4O1xufVxuLmFjdGlvbkJ1dHRvbnMgYSB7XG5cdHRleHQtYWxpZ246IGNlbnRlcjtcblx0d2lkdGg6MTAwJTtcbn0iXX0= */"]
  });
  return ListComponent;
})();

/***/ })

}]);
//# sourceMappingURL=default-src_app_dictionary_index_ts.js.map