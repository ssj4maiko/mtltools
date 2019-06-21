(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{Xt3p:function(l,n,u){"use strict";u.r(n);var t=u("CcnG"),i=function(){return function(){}}(),e=u("pMnS"),o=u("Ip0R"),s=u("gIcY"),r=u("XA42"),a=u("o4Jw"),c=u("b/G4"),b=t.qb({encapsulation:0,styles:[r.a],data:{}});function d(l){return t.Lb(0,[(l()(),t.sb(0,0,null,null,2,"div",[["class","jw-modal"]],null,null,null,null,null)),(l()(),t.sb(1,0,null,null,1,"div",[["class","jw-modal-body"]],null,null,null,null,null)),t.Db(null,0),(l()(),t.sb(3,0,null,null,0,"div",[["class","jw-modal-background"]],null,null,null,null,null))],null,null)}var g=u("yTNM"),h=function(){function l(l,n,u,t,i,e){this.router=l,this.route=n,this.api=u,this.formBuilder=t,this.modalService=i,this.papa=e,this.entries=[],this.categories=[],this.tmpResult=[]}return l.prototype.ngOnInit=function(){var l=this;this.idNovel=this.route.snapshot.params.idNovel,this.idDictionary=this.route.snapshot.params.idDictionary,this.idCategory=this.route.snapshot.params.idCategory,this.novel=this.api.Novel(this.idNovel),this.dictionary=this.api.Dictionary(this.idNovel,this.idDictionary),this.categories=Object.values(this.api.Categories(this.idDictionary)),this.entryForm=this.formBuilder.group({idCategory:"",entries:this.formBuilder.array([this.createItem()])}),this.novel?this.dictionaryList():this.api.getNovel(this.idNovel).subscribe(function(n){l.novel=l.api.Novel(l.idNovel),l.dictionaryList()},function(l){console.log(l)})},l.prototype.ngOnDestroy=function(){delete this.entries,delete this.novel,delete this.dictionary,delete this.categories,delete this.entries2Save,delete this.entryForm,delete this.entryArray,delete this.idCategory,delete this.idDictionary,delete this.idNovel,console.log("DESTROY!")},l.prototype.dictionaryList=function(){var l=this;this.dictionary?this.categoryList():this.api.getDictionaries(this.idNovel).subscribe(function(n){l.dictionary=l.api.Dictionary(l.idNovel,l.idDictionary),l.categoryList()},function(l){console.log(l)})},l.prototype.categoryList=function(){var l=this;this.categories.length?this.entryList():this.api.getCategories(this.idNovel,this.idDictionary).subscribe(function(n){l.categories=Object.values(l.api.Categories(l.idDictionary)),l.entryList()},function(l){console.log(l)})},l.prototype.entryList=function(){var l=this;this.api.getEntries(this.idDictionary,this.idCategory).subscribe(function(n){l.entries=Object.values(l.api.Entries(l.idCategory)),l.fillForm()},function(l){console.log(l)})},l.prototype.createItem=function(){var l=this.formBuilder.group({id:"",idCategory:this.idCategory,entryOriginal:"",entryTranslation:"",description:"",update:"",delete:"",reset:""});return this.entryArray&&this.onChanges(l,this.entryArray.length),l},l.prototype.addItem=function(){this.entryArray=this.entryForm.get("entries");var l=this.createItem();this.entryArray.push(l)},l.prototype.onChanges=function(l,n){var u,t=this,i=!1,e=0;l.valueChanges.subscribe(function(o){if(0===e)if(console.log(o),u||(u=t.api.Entry(t.idCategory,o.id),console.log(u)),o.reset&&(console.log("reset"),e=6,l.controls.reset.setValue(!1),l.controls.update.setValue(!1),l.controls.delete.setValue(!1),l.controls.idCategory.setValue(o.id?u.idCategory:""),l.controls.entryOriginal.setValue(o.id?u.entryOriginal:""),l.controls.entryTranslation.setValue(o.id?u.entryTranslation:""),l.controls.description.setValue(o.id?u.description:"")),o.id){var s=o.idCategory!=u.idCategory||o.entryOriginal!=u.entryOriginal||o.entryTranslation!=u.entryTranslation||o.description!=u.description||o.delete!=i;s!=o.update&&(e=1,l.controls.update.setValue(s)),o.delete&&(i=o.delete)}else o.delete&&t.entryArray.removeAt(n);else console.log("counter",e),--e})},l.prototype.fillForm=function(){this.entryForm.patchValue({idCategory:this.idCategory}),this.entryForm.setControl("entries",this.setExistingEntries(this.entries)),this.addItem()},l.prototype.setExistingEntries=function(l){var n=this,u=new s.e([]),t=null;return l.forEach(function(l){t=n.formBuilder.group({id:l.id,idCategory:l.idCategory,entryOriginal:l.entryOriginal,entryTranslation:l.entryTranslation,description:l.description,update:!1,delete:!1,reset:!1}),n.onChanges(t,u.length),u.push(t)}),this.entryArray=u,u},l.prototype.submitForm=function(){var l=this;console.log(this.entryForm.value),this.api.addEntries(this.idDictionary,this.idCategory,this.entryForm.value).subscribe(function(n){n.changes?l.api.getEntries(l.idDictionary,l.idCategory).subscribe(function(n){l.router.navigate(["/novel/dictionary/",l.idNovel,l.idDictionary])},function(l){console.log("Didn't move because: ",l)}):l.router.navigate(["/novel/dictionary/",l.idNovel,l.idDictionary])},function(l){console.log(l)})},l.prototype.openModal=function(l){this.modalService.open(l)},l.prototype.closeModal=function(l){this.modalService.close(l)},l.prototype.uploadFile=function(l){var n=this;this.file=l.target.files[0];var u=new FileReader;u.onload=function(l){n.papa.parse(u.result,{complete:function(l){n.tmpResult=l.data,n.openModal("confirm-import")}})},u.readAsText(this.file)},l.prototype.cancelImport=function(){this.tmpResult=[],this.closeModal("confirm-import")},l.prototype.commitImport=function(){var l,n=this;for(l=this.entryArray.value.length-1;l>-1;--l)if(""!=this.entryArray.value[l].id||""!=this.entryArray.value[l].idCategory||""!=this.entryArray.value[l].entryOriginal||""!=this.entryArray.value[l].entryTranslation||""!=this.entryArray.value[l].description){++l;break}this.tmpResult.forEach(function(u){var t=n.formBuilder.group({id:"",idCategory:n.idCategory,entryOriginal:u[0],entryTranslation:u[1],description:u[2],update:!1,delete:!1,reset:!1});n.entryArray.controls[l]?(n.onChanges(t,l),n.entryArray.controls[l]=t):(n.onChanges(t,n.entryArray.length),n.entryArray.push(t)),++l}),this.entryArray.controls[l]||this.addItem(),this.closeModal("confirm-import"),this.closeModal("import-list")},l}(),p=u("ZYCi"),m=u("a1DB"),y=t.qb({encapsulation:0,styles:[[".actionButtons[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%], .actionButtons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-align:center;width:100%}.hidden[_ngcontent-%COMP%]{display:none}.tableContent[_ngcontent-%COMP%]   .changed[_ngcontent-%COMP%]{background-color:green}.tableContent[_ngcontent-%COMP%]   .new[_ngcontent-%COMP%]{background-color:#00f}.tableContent[_ngcontent-%COMP%]   .deleted[_ngcontent-%COMP%]{background-color:red}"]],data:{}});function C(l){return t.Lb(0,[(l()(),t.sb(0,0,null,null,6,"tr",[],null,null,null,null,null)),(l()(),t.sb(1,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Kb(2,null,["",""])),(l()(),t.sb(3,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Kb(4,null,["",""])),(l()(),t.sb(5,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Kb(6,null,["",""]))],null,function(l,n){l(n,2,0,n.context.$implicit[0]),l(n,4,0,n.context.$implicit[1]),l(n,6,0,n.context.$implicit[2])})}function v(l){return t.Lb(0,[(l()(),t.sb(0,0,null,null,11,"table",[["class","table"]],null,null,null,null,null)),(l()(),t.sb(1,0,null,null,7,"thead",[],null,null,null,null,null)),(l()(),t.sb(2,0,null,null,6,"tr",[],null,null,null,null,null)),(l()(),t.sb(3,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Original"])),(l()(),t.sb(5,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Translated"])),(l()(),t.sb(7,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Description"])),(l()(),t.sb(9,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),t.hb(16777216,null,null,1,null,C)),t.rb(11,278528,null,0,o.i,[t.O,t.L,t.s],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,11,0,n.component.tmpResult)},null)}function f(l){return t.Lb(0,[(l()(),t.sb(0,0,null,null,3,"div",[["class","columns actionButtons"]],null,null,null,null,null)),(l()(),t.sb(1,0,null,null,2,"div",[["class","column"]],null,null,null,null,null)),(l()(),t.sb(2,0,null,null,1,"a",[["class","button is-info"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.openModal("import-list")&&t),t},null,null)),(l()(),t.Kb(-1,null,["Import List"]))],null,null)}function E(l){return t.Lb(0,[(l()(),t.sb(0,0,null,null,6,"div",[["class","columns actionButtons"]],null,null,null,null,null)),(l()(),t.sb(1,0,null,null,2,"div",[["class","column"]],null,null,null,null,null)),(l()(),t.sb(2,0,null,null,1,"button",[["class","button is-info"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.submitForm()&&t),t},null,null)),(l()(),t.Kb(-1,null,["Save"])),(l()(),t.sb(4,0,null,null,2,"div",[["class","column"]],null,null,null,null,null)),(l()(),t.sb(5,0,null,null,1,"a",[["class","button is-info"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.addItem()&&t),t},null,null)),(l()(),t.Kb(-1,null,["Add Entry"]))],null,null)}function D(l){return t.Lb(0,[(l()(),t.sb(0,0,null,null,0,null,null,null,null,null,null,null))],null,null)}function O(l){return t.Lb(0,[(l()(),t.sb(0,0,null,null,3,"option",[],null,null,null,null,null)),t.rb(1,147456,null,0,s.q,[t.k,t.D,[2,s.s]],{value:[0,"value"]},null),t.rb(2,147456,null,0,s.w,[t.k,t.D,[8,null]],{value:[0,"value"]},null),(l()(),t.Kb(3,null,["",""]))],function(l,n){l(n,1,0,t.wb(1,"",n.context.$implicit.id,"")),l(n,2,0,t.wb(1,"",n.context.$implicit.id,""))},function(l,n){l(n,3,0,n.context.$implicit.name)})}function T(l){return t.Lb(0,[(l()(),t.sb(0,0,null,null,67,null,null,null,null,null,null,null)),(l()(),t.sb(1,0,null,null,66,"tr",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],null,null,null,null)),t.Hb(512,null,o.u,o.v,[t.s,t.t,t.k,t.D]),t.rb(3,278528,null,0,o.h,[o.u],{ngClass:[0,"ngClass"]},null),t.Gb(4,{new:0,deleted:1,changed:2}),t.rb(5,212992,null,0,s.j,[[3,s.c],[8,null],[8,null]],{name:[0,"name"]},null),t.Hb(2048,null,s.c,null,[s.j]),t.rb(7,16384,null,0,s.o,[[4,s.c]],null,null),(l()(),t.sb(8,0,null,null,8,"td",[],null,null,null,null,null)),(l()(),t.sb(9,0,null,null,7,"select",[["formControlName","idCategory"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"change"],[null,"blur"]],function(l,n,u){var i=!0;return"change"===n&&(i=!1!==t.Eb(l,10).onChange(u.target.value)&&i),"blur"===n&&(i=!1!==t.Eb(l,10).onTouched()&&i),i},null,null)),t.rb(10,16384,null,0,s.s,[t.D,t.k],null,null),t.Hb(1024,null,s.l,function(l){return[l]},[s.s]),t.rb(12,671744,null,0,s.h,[[3,s.c],[8,null],[8,null],[6,s.l],[2,s.v]],{name:[0,"name"]},null),t.Hb(2048,null,s.m,null,[s.h]),t.rb(14,16384,null,0,s.n,[[4,s.m]],null,null),(l()(),t.hb(16777216,null,null,1,null,O)),t.rb(16,278528,null,0,o.i,[t.O,t.L,t.s],{ngForOf:[0,"ngForOf"]},null),(l()(),t.sb(17,0,null,null,18,"td",[],null,null,null,null,null)),(l()(),t.sb(18,0,null,null,5,"input",[["formControlName","id"],["type","hidden"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var i=!0;return"input"===n&&(i=!1!==t.Eb(l,19)._handleInput(u.target.value)&&i),"blur"===n&&(i=!1!==t.Eb(l,19).onTouched()&&i),"compositionstart"===n&&(i=!1!==t.Eb(l,19)._compositionStart()&&i),"compositionend"===n&&(i=!1!==t.Eb(l,19)._compositionEnd(u.target.value)&&i),i},null,null)),t.rb(19,16384,null,0,s.d,[t.D,t.k,[2,s.a]],null,null),t.Hb(1024,null,s.l,function(l){return[l]},[s.d]),t.rb(21,671744,null,0,s.h,[[3,s.c],[8,null],[8,null],[6,s.l],[2,s.v]],{name:[0,"name"]},null),t.Hb(2048,null,s.m,null,[s.h]),t.rb(23,16384,null,0,s.n,[[4,s.m]],null,null),(l()(),t.sb(24,0,null,null,5,"input",[["formControlName","update"],["type","hidden"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var i=!0;return"input"===n&&(i=!1!==t.Eb(l,25)._handleInput(u.target.value)&&i),"blur"===n&&(i=!1!==t.Eb(l,25).onTouched()&&i),"compositionstart"===n&&(i=!1!==t.Eb(l,25)._compositionStart()&&i),"compositionend"===n&&(i=!1!==t.Eb(l,25)._compositionEnd(u.target.value)&&i),i},null,null)),t.rb(25,16384,null,0,s.d,[t.D,t.k,[2,s.a]],null,null),t.Hb(1024,null,s.l,function(l){return[l]},[s.d]),t.rb(27,671744,null,0,s.h,[[3,s.c],[8,null],[8,null],[6,s.l],[2,s.v]],{name:[0,"name"]},null),t.Hb(2048,null,s.m,null,[s.h]),t.rb(29,16384,null,0,s.n,[[4,s.m]],null,null),(l()(),t.sb(30,0,null,null,5,"input",[["class","input"],["formControlName","entryOriginal"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var i=!0;return"input"===n&&(i=!1!==t.Eb(l,31)._handleInput(u.target.value)&&i),"blur"===n&&(i=!1!==t.Eb(l,31).onTouched()&&i),"compositionstart"===n&&(i=!1!==t.Eb(l,31)._compositionStart()&&i),"compositionend"===n&&(i=!1!==t.Eb(l,31)._compositionEnd(u.target.value)&&i),i},null,null)),t.rb(31,16384,null,0,s.d,[t.D,t.k,[2,s.a]],null,null),t.Hb(1024,null,s.l,function(l){return[l]},[s.d]),t.rb(33,671744,null,0,s.h,[[3,s.c],[8,null],[8,null],[6,s.l],[2,s.v]],{name:[0,"name"]},null),t.Hb(2048,null,s.m,null,[s.h]),t.rb(35,16384,null,0,s.n,[[4,s.m]],null,null),(l()(),t.sb(36,0,null,null,6,"td",[],null,null,null,null,null)),(l()(),t.sb(37,0,null,null,5,"input",[["class","input"],["formControlName","entryTranslation"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var i=!0;return"input"===n&&(i=!1!==t.Eb(l,38)._handleInput(u.target.value)&&i),"blur"===n&&(i=!1!==t.Eb(l,38).onTouched()&&i),"compositionstart"===n&&(i=!1!==t.Eb(l,38)._compositionStart()&&i),"compositionend"===n&&(i=!1!==t.Eb(l,38)._compositionEnd(u.target.value)&&i),i},null,null)),t.rb(38,16384,null,0,s.d,[t.D,t.k,[2,s.a]],null,null),t.Hb(1024,null,s.l,function(l){return[l]},[s.d]),t.rb(40,671744,null,0,s.h,[[3,s.c],[8,null],[8,null],[6,s.l],[2,s.v]],{name:[0,"name"]},null),t.Hb(2048,null,s.m,null,[s.h]),t.rb(42,16384,null,0,s.n,[[4,s.m]],null,null),(l()(),t.sb(43,0,null,null,6,"td",[],null,null,null,null,null)),(l()(),t.sb(44,0,null,null,5,"textarea",[["class","textarea"],["formControlName","description"],["rows","1"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var i=!0;return"input"===n&&(i=!1!==t.Eb(l,45)._handleInput(u.target.value)&&i),"blur"===n&&(i=!1!==t.Eb(l,45).onTouched()&&i),"compositionstart"===n&&(i=!1!==t.Eb(l,45)._compositionStart()&&i),"compositionend"===n&&(i=!1!==t.Eb(l,45)._compositionEnd(u.target.value)&&i),i},null,null)),t.rb(45,16384,null,0,s.d,[t.D,t.k,[2,s.a]],null,null),t.Hb(1024,null,s.l,function(l){return[l]},[s.d]),t.rb(47,671744,null,0,s.h,[[3,s.c],[8,null],[8,null],[6,s.l],[2,s.v]],{name:[0,"name"]},null),t.Hb(2048,null,s.m,null,[s.h]),t.rb(49,16384,null,0,s.n,[[4,s.m]],null,null),(l()(),t.sb(50,0,null,null,8,"td",[],null,null,null,null,null)),(l()(),t.sb(51,0,null,null,7,"label",[["class","icon  is-large"]],null,null,null,null,null)),(l()(),t.sb(52,0,null,null,0,"i",[["class","fas fa-exclamation-triangle"]],null,null,null,null,null)),(l()(),t.sb(53,0,null,null,5,"input",[["class","hidden"],["formControlName","reset"],["type","checkbox"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"change"],[null,"blur"]],function(l,n,u){var i=!0;return"change"===n&&(i=!1!==t.Eb(l,54).onChange(u.target.checked)&&i),"blur"===n&&(i=!1!==t.Eb(l,54).onTouched()&&i),i},null,null)),t.rb(54,16384,null,0,s.b,[t.D,t.k],null,null),t.Hb(1024,null,s.l,function(l){return[l]},[s.b]),t.rb(56,671744,null,0,s.h,[[3,s.c],[8,null],[8,null],[6,s.l],[2,s.v]],{name:[0,"name"]},null),t.Hb(2048,null,s.m,null,[s.h]),t.rb(58,16384,null,0,s.n,[[4,s.m]],null,null),(l()(),t.sb(59,0,null,null,8,"td",[],null,null,null,null,null)),(l()(),t.sb(60,0,null,null,7,"label",[["class","icon is-large"]],null,null,null,null,null)),(l()(),t.sb(61,0,null,null,0,"i",[["class","fas fa-times"]],null,null,null,null,null)),(l()(),t.sb(62,0,null,null,5,"input",[["class","hidden"],["formControlName","delete"],["type","checkbox"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"change"],[null,"blur"]],function(l,n,u){var i=!0;return"change"===n&&(i=!1!==t.Eb(l,63).onChange(u.target.checked)&&i),"blur"===n&&(i=!1!==t.Eb(l,63).onTouched()&&i),i},null,null)),t.rb(63,16384,null,0,s.b,[t.D,t.k],null,null),t.Hb(1024,null,s.l,function(l){return[l]},[s.b]),t.rb(65,671744,null,0,s.h,[[3,s.c],[8,null],[8,null],[6,s.l],[2,s.v]],{name:[0,"name"]},null),t.Hb(2048,null,s.m,null,[s.h]),t.rb(67,16384,null,0,s.n,[[4,s.m]],null,null)],function(l,n){var u=n.component,t=l(n,4,0,0==n.context.$implicit.controls.id.value,1==n.context.$implicit.controls.delete.value,1==n.context.$implicit.controls.update.value);l(n,3,0,t),l(n,5,0,n.context.index),l(n,12,0,"idCategory"),l(n,16,0,u.categories),l(n,21,0,"id"),l(n,27,0,"update"),l(n,33,0,"entryOriginal"),l(n,40,0,"entryTranslation"),l(n,47,0,"description"),l(n,56,0,"reset"),l(n,65,0,"delete")},function(l,n){l(n,1,0,t.Eb(n,7).ngClassUntouched,t.Eb(n,7).ngClassTouched,t.Eb(n,7).ngClassPristine,t.Eb(n,7).ngClassDirty,t.Eb(n,7).ngClassValid,t.Eb(n,7).ngClassInvalid,t.Eb(n,7).ngClassPending),l(n,9,0,t.Eb(n,14).ngClassUntouched,t.Eb(n,14).ngClassTouched,t.Eb(n,14).ngClassPristine,t.Eb(n,14).ngClassDirty,t.Eb(n,14).ngClassValid,t.Eb(n,14).ngClassInvalid,t.Eb(n,14).ngClassPending),l(n,18,0,t.Eb(n,23).ngClassUntouched,t.Eb(n,23).ngClassTouched,t.Eb(n,23).ngClassPristine,t.Eb(n,23).ngClassDirty,t.Eb(n,23).ngClassValid,t.Eb(n,23).ngClassInvalid,t.Eb(n,23).ngClassPending),l(n,24,0,t.Eb(n,29).ngClassUntouched,t.Eb(n,29).ngClassTouched,t.Eb(n,29).ngClassPristine,t.Eb(n,29).ngClassDirty,t.Eb(n,29).ngClassValid,t.Eb(n,29).ngClassInvalid,t.Eb(n,29).ngClassPending),l(n,30,0,t.Eb(n,35).ngClassUntouched,t.Eb(n,35).ngClassTouched,t.Eb(n,35).ngClassPristine,t.Eb(n,35).ngClassDirty,t.Eb(n,35).ngClassValid,t.Eb(n,35).ngClassInvalid,t.Eb(n,35).ngClassPending),l(n,37,0,t.Eb(n,42).ngClassUntouched,t.Eb(n,42).ngClassTouched,t.Eb(n,42).ngClassPristine,t.Eb(n,42).ngClassDirty,t.Eb(n,42).ngClassValid,t.Eb(n,42).ngClassInvalid,t.Eb(n,42).ngClassPending),l(n,44,0,t.Eb(n,49).ngClassUntouched,t.Eb(n,49).ngClassTouched,t.Eb(n,49).ngClassPristine,t.Eb(n,49).ngClassDirty,t.Eb(n,49).ngClassValid,t.Eb(n,49).ngClassInvalid,t.Eb(n,49).ngClassPending),l(n,53,0,t.Eb(n,58).ngClassUntouched,t.Eb(n,58).ngClassTouched,t.Eb(n,58).ngClassPristine,t.Eb(n,58).ngClassDirty,t.Eb(n,58).ngClassValid,t.Eb(n,58).ngClassInvalid,t.Eb(n,58).ngClassPending),l(n,62,0,t.Eb(n,67).ngClassUntouched,t.Eb(n,67).ngClassTouched,t.Eb(n,67).ngClassPristine,t.Eb(n,67).ngClassDirty,t.Eb(n,67).ngClassValid,t.Eb(n,67).ngClassInvalid,t.Eb(n,67).ngClassPending)})}function k(l){return t.Lb(0,[(l()(),t.sb(0,0,null,null,0,null,null,null,null,null,null,null))],null,null)}function I(l){return t.Lb(0,[(l()(),t.sb(0,0,null,null,23,"jw-modal",[["id","import-list"]],null,null,null,d,b)),t.rb(1,245760,null,0,a.a,[c.a,t.k],{id:[0,"id"]},null),(l()(),t.sb(2,0,null,0,1,"h1",[["class","h1"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Importing a file"])),(l()(),t.sb(4,0,null,0,3,"p",[],null,null,null,null,null)),(l()(),t.sb(5,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["File type"])),(l()(),t.Kb(-1,null,[": CSV"])),(l()(),t.sb(8,0,null,0,3,"p",[],null,null,null,null,null)),(l()(),t.sb(9,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Columns"])),(l()(),t.Kb(-1,null,[': "Original";"Translated";"Description"'])),(l()(),t.sb(12,0,null,0,3,"p",[],null,null,null,null,null)),(l()(),t.sb(13,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Instructions"])),(l()(),t.Kb(-1,null,[": Select the file and the imported data will be shown below before they are commited to the main screen. In case of error, check the file through a normal text editor and see if it follows the above style. Also, there is no header, so in case your file has it, you can manually delete it later "])),(l()(),t.sb(16,0,null,0,7,"div",[["class","columns actionButtons"]],null,null,null,null,null)),(l()(),t.sb(17,0,null,null,3,"div",[["class","column"]],null,null,null,null,null)),(l()(),t.sb(18,0,null,null,2,"label",[["class","button is-primary"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,[" Select File "])),(l()(),t.sb(20,0,null,null,0,"input",[["class","hidden"],["type","file"]],null,[[null,"change"]],function(l,n,u){var t=!0;return"change"===n&&(t=!1!==l.component.uploadFile(u)&&t),t},null,null)),(l()(),t.sb(21,0,null,null,2,"div",[["class","column"]],null,null,null,null,null)),(l()(),t.sb(22,0,null,null,1,"button",[["class","button is-danger"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.closeModal("import-list")&&t),t},null,null)),(l()(),t.Kb(-1,null,["Close"])),(l()(),t.sb(24,0,null,null,12,"jw-modal",[["id","confirm-import"]],null,null,null,d,b)),t.rb(25,245760,null,0,a.a,[c.a,t.k],{id:[0,"id"]},null),(l()(),t.sb(26,0,null,0,1,"h1",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Is this what you were looking for?"])),(l()(),t.hb(16777216,null,0,1,null,v)),t.rb(29,16384,null,0,o.j,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.sb(30,0,null,0,6,"div",[["class","columns actionButtons"]],null,null,null,null,null)),(l()(),t.sb(31,0,null,null,2,"div",[["class","column"]],null,null,null,null,null)),(l()(),t.sb(32,0,null,null,1,"button",[["class","button is-primary"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.commitImport()&&t),t},null,null)),(l()(),t.Kb(-1,null,["Yes"])),(l()(),t.sb(34,0,null,null,2,"div",[["class","column"]],null,null,null,null,null)),(l()(),t.sb(35,0,null,null,1,"button",[["class","button is-danger"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.cancelImport()&&t),t},null,null)),(l()(),t.Kb(-1,null,["No"])),(l()(),t.hb(0,[["actionButtons",2]],null,0,null,f)),(l()(),t.hb(0,[["footerButtons",2]],null,0,null,E)),(l()(),t.hb(16777216,null,null,1,null,D)),t.rb(40,540672,null,0,o.p,[t.O],{ngTemplateOutlet:[0,"ngTemplateOutlet"]},null),(l()(),t.sb(41,0,null,null,32,"div",[],null,null,null,null,null)),(l()(),t.sb(42,0,null,null,31,"form",[["id","entryForm"],["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(l,n,u){var i=!0,e=l.component;return"submit"===n&&(i=!1!==t.Eb(l,44).onSubmit(u)&&i),"reset"===n&&(i=!1!==t.Eb(l,44).onReset()&&i),"submit"===n&&(i=!1!==e.submitForm()&&i),i},null,null)),t.rb(43,16384,null,0,s.x,[],null,null),t.rb(44,540672,null,0,s.i,[[8,null],[8,null]],{form:[0,"form"]},null),t.Hb(2048,null,s.c,null,[s.i]),t.rb(46,16384,null,0,s.o,[[4,s.c]],null,null),(l()(),t.sb(47,0,null,null,5,"input",[["formControlName","idCategory"],["type","hidden"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var i=!0;return"input"===n&&(i=!1!==t.Eb(l,48)._handleInput(u.target.value)&&i),"blur"===n&&(i=!1!==t.Eb(l,48).onTouched()&&i),"compositionstart"===n&&(i=!1!==t.Eb(l,48)._compositionStart()&&i),"compositionend"===n&&(i=!1!==t.Eb(l,48)._compositionEnd(u.target.value)&&i),i},null,null)),t.rb(48,16384,null,0,s.d,[t.D,t.k,[2,s.a]],null,null),t.Hb(1024,null,s.l,function(l){return[l]},[s.d]),t.rb(50,671744,null,0,s.h,[[3,s.c],[8,null],[8,null],[6,s.l],[2,s.v]],{name:[0,"name"]},null),t.Hb(2048,null,s.m,null,[s.h]),t.rb(52,16384,null,0,s.n,[[4,s.m]],null,null),(l()(),t.sb(53,0,null,null,20,"table",[["class","table is-stripede is-fullwidth"]],null,null,null,null,null)),(l()(),t.sb(54,0,null,null,13,"thead",[],null,null,null,null,null)),(l()(),t.sb(55,0,null,null,12,"tr",[],null,null,null,null,null)),(l()(),t.sb(56,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Category"])),(l()(),t.sb(58,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Original"])),(l()(),t.sb(60,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Translated"])),(l()(),t.sb(62,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Description"])),(l()(),t.sb(64,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Reset"])),(l()(),t.sb(66,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Delete"])),(l()(),t.sb(68,0,null,null,5,"tbody",[["class","tableContent"],["formArrayName","entries"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],null,null,null,null)),t.rb(69,212992,null,0,s.f,[[3,s.c],[8,null],[8,null]],{name:[0,"name"]},null),t.Hb(2048,null,s.c,null,[s.f]),t.rb(71,16384,null,0,s.o,[[4,s.c]],null,null),(l()(),t.hb(16777216,null,null,1,null,T)),t.rb(73,278528,null,0,o.i,[t.O,t.L,t.s],{ngForOf:[0,"ngForOf"]},null),(l()(),t.hb(16777216,null,null,1,null,k)),t.rb(75,540672,null,0,o.p,[t.O],{ngTemplateOutlet:[0,"ngTemplateOutlet"]},null)],function(l,n){var u=n.component;l(n,1,0,"import-list"),l(n,25,0,"confirm-import"),l(n,29,0,u.tmpResult.length),l(n,40,0,t.Eb(n,37)),l(n,44,0,u.entryForm),l(n,50,0,"idCategory"),l(n,69,0,"entries"),l(n,73,0,u.entryForm.get("entries").controls),l(n,75,0,t.Eb(n,38))},function(l,n){l(n,42,0,t.Eb(n,46).ngClassUntouched,t.Eb(n,46).ngClassTouched,t.Eb(n,46).ngClassPristine,t.Eb(n,46).ngClassDirty,t.Eb(n,46).ngClassValid,t.Eb(n,46).ngClassInvalid,t.Eb(n,46).ngClassPending),l(n,47,0,t.Eb(n,52).ngClassUntouched,t.Eb(n,52).ngClassTouched,t.Eb(n,52).ngClassPristine,t.Eb(n,52).ngClassDirty,t.Eb(n,52).ngClassValid,t.Eb(n,52).ngClassInvalid,t.Eb(n,52).ngClassPending),l(n,68,0,t.Eb(n,71).ngClassUntouched,t.Eb(n,71).ngClassTouched,t.Eb(n,71).ngClassPristine,t.Eb(n,71).ngClassDirty,t.Eb(n,71).ngClassValid,t.Eb(n,71).ngClassInvalid,t.Eb(n,71).ngClassPending)})}function P(l){return t.Lb(0,[(l()(),t.sb(0,0,null,null,1,"app-list",[],null,[[null,"blur"]],function(l,n,u){var i=!0;return"blur"===n&&(i=!1!==t.Eb(l,1).onBlur(u)&&i),i},I,y)),t.rb(1,245760,null,0,h,[p.l,p.a,g.a,s.g,c.a,m.a],null,null)],function(l,n){l(n,1,0)},null)}var _=t.ob("app-list",h,P,{},{},[]),w={title:"List Entries"},K=function(){return function(){}}();u.d(n,"EntryModuleNgFactory",function(){return N});var N=t.pb(i,[],function(l){return t.Bb([t.Cb(512,t.j,t.ab,[[8,[e.a,_]],[3,t.j],t.x]),t.Cb(4608,o.l,o.k,[t.u,[2,o.x]]),t.Cb(4608,s.u,s.u,[]),t.Cb(4608,s.g,s.g,[]),t.Cb(1073742336,o.b,o.b,[]),t.Cb(1073742336,p.p,p.p,[[2,p.u],[2,p.l]]),t.Cb(1073742336,K,K,[]),t.Cb(1073742336,s.t,s.t,[]),t.Cb(1073742336,s.k,s.k,[]),t.Cb(1073742336,s.r,s.r,[]),t.Cb(1073742336,i,i,[]),t.Cb(1024,p.j,function(){return[[{path:"",component:h,data:w},{path:"**",redirectTo:""}]]},[])])})}}]);