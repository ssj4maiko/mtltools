"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[803],{2803:(X,f,r)=>{r.r(f),r.d(f,{NovelModule:()=>W});var c=r(6895),p=r(4793),t=r(4650),m=r(6845);const h=function(){return["/novel/add"]};function x(n,i){1&n&&(t.TgZ(0,"div",9)(1,"div",10)(2,"a",11),t._uU(3,"Add Novel"),t.qZA()()()),2&n&&(t.xp6(2),t.Q6J("routerLink",t.DdM(1,h)))}function v(n,i){1&n&&t.GkF(0)}function C(n,i){1&n&&t._UZ(0,"i",25)}function Z(n,i){1&n&&t._UZ(0,"i",26)}function T(n,i){1&n&&t._UZ(0,"i",27)}function N(n,i){1&n&&t._UZ(0,"i",28)}const u=function(n){return["/novel/",n]},A=function(n){return["/novel/dictionary",n]},b=function(n){return["/novel/edit",n]};function y(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"tr",13)(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td",14),t._uU(4),t.qZA(),t.TgZ(5,"td",14),t._uU(6),t.qZA(),t.TgZ(7,"td",14),t._uU(8),t.qZA(),t.TgZ(9,"td",14),t._uU(10),t.qZA(),t.TgZ(11,"td"),t._uU(12),t.qZA(),t.TgZ(13,"td",15),t.YNc(14,C,1,0,"i",16),t.YNc(15,Z,1,0,"i",17),t.YNc(16,T,1,0,"i",18),t.YNc(17,N,1,0,"i",19),t.qZA(),t.TgZ(18,"td"),t._uU(19),t.qZA(),t.TgZ(20,"td")(21,"a",14),t._UZ(22,"i",20),t.qZA(),t.TgZ(23,"a",21),t.NdJ("click",function(){t.CHM(e);const l=t.oxw().$implicit;return t.oxw().updateChapters(l.id)}),t._UZ(24,"i",22),t.qZA(),t.TgZ(25,"a",14),t._UZ(26,"i",23),t.qZA(),t.TgZ(27,"a",21),t.NdJ("click",function(){t.CHM(e);const l=t.oxw().$implicit;return t.oxw().delete(l.id)}),t._UZ(28,"i",24),t.qZA()()()}if(2&n){const e=t.oxw().$implicit;t.s9C("title",e.nameOriginal),t.xp6(2),t.Oqu(e.id),t.xp6(1),t.Q6J("routerLink",t.VKq(18,u,e.id)),t.xp6(1),t.Oqu(e.code),t.xp6(1),t.Q6J("routerLink",t.VKq(20,u,e.id)),t.xp6(1),t.Oqu(e.nameCustom),t.xp6(1),t.Q6J("routerLink",t.VKq(22,u,e.id)),t.xp6(1),t.Oqu(e.nameOriginal),t.xp6(1),t.Q6J("routerLink",t.VKq(24,u,e.id)),t.xp6(1),t.Oqu(e.numberChapters),t.xp6(2),t.Oqu(e.driver),t.xp6(2),t.Q6J("ngIf",e.completed),t.xp6(1),t.Q6J("ngIf",!e.completed),t.xp6(1),t.Q6J("ngIf",e.flagR18),t.xp6(1),t.Q6J("ngIf",!e.flagR18),t.xp6(2),t.Oqu(e.addedBy),t.xp6(2),t.Q6J("routerLink",t.VKq(26,A,e.id)),t.xp6(4),t.Q6J("routerLink",t.VKq(28,b,e.id))}}function O(n,i){if(1&n&&(t.ynx(0),t.YNc(1,y,29,30,"tr",12),t.BQk()),2&n){const e=i.$implicit;t.xp6(1),t.Q6J("ngIf",e.show)}}function q(n,i){1&n&&(t.TgZ(0,"a",29)(1,"span",30),t._UZ(2,"i",31),t.qZA()())}function F(n,i){1&n&&(t.TgZ(0,"a",32)(1,"span",30),t._UZ(2,"i",33),t.qZA()())}let U=(()=>{class n{constructor(e){this.api=e,this.novels=[]}ngOnInit(){this.loadList()}loadList(){this.api.Novel.getAll().then(e=>{this.novels=Object.values(e)},e=>{console.log(e)})}updateChapters(e){this.api.Chapter.autoUpdate({idNovel:e}).then(o=>{console.log("Novel updated",o),this.api.Novel.get({id:e}).then(l=>{let a=!1;for(const d in this.novels)if(this.novels[d].id===l.id){this.novels[d]=l,a=!0;break}a||console.log("The novel was not found on the list? Impossible...")})},o=>{console.log(o)})}delete(e){confirm("Are you sure?")&&this.api.Novel.delete({id:e}).then(o=>{console.log(o),this.loadList()},o=>{console.log(o)})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(m.s))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-novel-list"]],decls:31,vars:2,consts:[["actionButtons",""],[4,"ngTemplateOutlet"],[1,"table","is-striped","is-hoverable","is-fullwidth"],[2,"text-align","center"],[2,"width","76px"],[2,"width","131px"],[4,"ngFor","ngForOf"],["success",""],["danger",""],[1,"columns","actionButtons"],[1,"column"],[1,"button","is-info",3,"routerLink"],[3,"title",4,"ngIf"],[3,"title"],[3,"routerLink"],[1,"status"],["class","fas fa-envelope has-text-success","title","Complete",4,"ngIf"],["class","fas fa-envelope-open-text has-text-info","title","Still going",4,"ngIf"],["class","fas fa-user-secret has-text-danger","title","R18",4,"ngIf"],["class","fas fa-user-secret has-text-grey-lighter","title","Everyone",4,"ngIf"],["title","Dictionaries",1,"fas","fa-book-open"],[3,"click"],["title","Update Chapters",1,"has-text-info","fas","fa-sync"],["title","Edit",1,"has-text-success","fas","fa-edit"],["title","Delete",1,"has-text-danger","fas","fa-trash"],["title","Complete",1,"fas","fa-envelope","has-text-success"],["title","Still going",1,"fas","fa-envelope-open-text","has-text-info"],["title","R18",1,"fas","fa-user-secret","has-text-danger"],["title","Everyone",1,"fas","fa-user-secret","has-text-grey-lighter"],[1,"button","is-success"],[1,"icon","is-small"],[1,"fas","fa-check"],[1,"button","is-danger"],[1,"fas","fa-times"]],template:function(e,o){if(1&e&&(t.YNc(0,x,4,2,"ng-template",null,0,t.W1O),t.TgZ(2,"div"),t.YNc(3,v,1,0,"ng-container",1),t.TgZ(4,"table",2)(5,"thead")(6,"tr")(7,"th"),t._uU(8,"ID"),t.qZA(),t.TgZ(9,"th"),t._uU(10,"Code"),t.qZA(),t.TgZ(11,"th"),t._uU(12,"Name"),t.qZA(),t.TgZ(13,"th"),t._uU(14,"Name Japanese"),t.qZA(),t.TgZ(15,"th"),t._uU(16,"Chapters"),t.qZA(),t.TgZ(17,"th",3),t._uU(18,"Driver"),t.qZA(),t.TgZ(19,"th",4),t._uU(20,"Status"),t.qZA(),t.TgZ(21,"th"),t._uU(22,"Added By"),t.qZA(),t.TgZ(23,"th",5),t._uU(24,"Actions"),t.qZA()()(),t.TgZ(25,"tbody"),t.YNc(26,O,2,1,"ng-container",6),t.YNc(27,q,3,0,"ng-template",null,7,t.W1O),t.YNc(29,F,3,0,"ng-template",null,8,t.W1O),t.qZA()()()),2&e){const l=t.MAs(1);t.xp6(3),t.Q6J("ngTemplateOutlet",l),t.xp6(23),t.Q6J("ngForOf",o.novels)}},directives:[p.yS,c.tP,c.sg,c.O5,p.rH],styles:[".table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(5), .table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(6), .table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(8){text-align:center}.table[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%]{margin:3px;font-size:20px;vertical-align:super;cursor:pointer}.columns[_ngcontent-%COMP%]{margin:5px}.actionButtons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-align:center;width:100%}"]}),n})();var s=r(4006),g=r(4868);class k{constructor(i){Object.assign(this,i)}}let _=(()=>{class n{constructor(e){this.formBuilder=e,this.selectDictionaries=[],this.selectDrivers=[],this.indexes=[],this.formGroup=e.group({id:[null],code:[null],nameOriginal:[null],nameCustom:[null],addedBy:[null],dictionary:[null],driver:[null],flagR18:[null],completed:[null],show:[null]})}loadMeta(e,o){this.selectDrivers=[];for(const l of Object.keys(e.drivers))this.selectDrivers.push(new g.Wx(l,e.drivers[l]));this.selectDictionaries=[];for(const l of Object.keys(o))this.selectDictionaries.push(new g.Wx(l+"",o[l].name,!1))}addForm(e,o,l,a){this.indexes.push(e),this.form.push(new g.Wi(e,o,l,a))}getForm(e){this.form=[],e&&this.addForm("id","","hidden"),this.addForm("code","Syosetsu code","text"),this.addForm("nameOriginal","Original Name","text"),this.addForm("nameCustom","Translated Name","text"),e&&this.addForm("addedBy","Added by","text"),this.addForm("dictionary","Dictionaries","multiselect",this.selectDictionaries),this.addForm("driver","Driver","select",this.selectDrivers),this.addForm("flagR18","R18?","checkbox"),this.addForm("completed","Completed?","checkbox"),this.addForm("show","Show on list?","checkbox")}setValues(e,o){const l=o.map(d=>d.id+""),a=new s.Oe(this.selectDictionaries.map(d=>(l.includes(d.value)&&d.setChecked(!0),d.control)));this.formGroup.setValue({id:e.id,code:e.code,nameOriginal:e.nameOriginal,nameCustom:e.nameCustom,addedBy:e.addedBy,dictionary:a,driver:e.driver,flagR18:e.flagR18,completed:e.completed,show:e.show})}getValues(e){const o={novel:null,dictionaries:null};o.novel=new k(this.formGroup.value),delete o.novel.dictionary;const l=this.indexes.indexOf("dictionary");if(o.dictionaries=this.form[l].getValues().map(a=>parseInt(a,10)),e&&e.length===o.dictionaries.length){const a=e.map(d=>d.id);JSON.stringify(a)===JSON.stringify(o.dictionaries)&&delete o.dictionaries}return o}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(s.qu))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();function J(n,i){if(1&n&&(t.ynx(0,null,12),t._UZ(2,"input",13),t.BQk()),2&n){const e=t.oxw().$implicit;t.xp6(2),t.s9C("formControlName",e.name)}}function w(n,i){if(1&n&&(t.ynx(0,null,14),t.TgZ(2,"label",15),t._UZ(3,"input",16),t._uU(4),t.qZA(),t.BQk()),2&n){const e=t.oxw().$implicit;t.xp6(3),t.s9C("formControlName",e.name),t.xp6(1),t.hij(" ",e.label," ")}}function Q(n,i){if(1&n&&(t.TgZ(0,"option",19),t._uU(1),t.qZA()),2&n){const e=i.$implicit;t.s9C("value",e.value),t.xp6(1),t.Oqu(e.label)}}function Y(n,i){if(1&n&&(t.ynx(0,null,14),t.TgZ(2,"label"),t._uU(3),t.qZA(),t.TgZ(4,"div",5)(5,"select",17),t.YNc(6,Q,2,2,"option",18),t.qZA()(),t.BQk()),2&n){const e=t.oxw().$implicit;t.xp6(3),t.Oqu(e.label),t.xp6(2),t.s9C("formControlName",e.name),t.xp6(1),t.Q6J("ngForOf",e.options)}}function S(n,i){if(1&n&&(t.TgZ(0,"p")(1,"label"),t._UZ(2,"input",21),t._uU(3),t.qZA()()),2&n){const e=i.$implicit;t.xp6(2),t.Q6J("formControl",e.control),t.xp6(1),t.hij(" ",e.label," ")}}function L(n,i){if(1&n&&(t.ynx(0,null,14),t.TgZ(2,"label"),t._uU(3),t.qZA(),t.TgZ(4,"div",5),t.YNc(5,S,4,2,"p",20),t.qZA(),t.BQk()),2&n){const e=t.oxw().$implicit;t.xp6(3),t.AsE("",e.label," - ",e.name,""),t.xp6(2),t.Q6J("ngForOf",e.options)}}function M(n,i){if(1&n&&(t.ynx(0,null,22),t.TgZ(2,"label",23),t._uU(3),t.qZA(),t.TgZ(4,"div",5),t._UZ(5,"input",24),t.qZA(),t.BQk()),2&n){const e=t.oxw().$implicit;t.xp6(2),t.s9C("for",e.name),t.xp6(1),t.Oqu(e.label),t.xp6(2),t.s9C("type",e.type),t.s9C("id",e.name),t.s9C("formControlName",e.name)}}function B(n,i){if(1&n&&(t.TgZ(0,"div",8),t.ynx(1,9),t.YNc(2,J,3,1,"ng-container",10),t.YNc(3,w,5,2,"ng-container",10),t.YNc(4,Y,7,3,"ng-container",10),t.YNc(5,L,6,3,"ng-container",10),t.YNc(6,M,6,5,"ng-container",11),t.BQk(),t.qZA()),2&n){const e=i.$implicit;t.xp6(1),t.Q6J("ngSwitch",e.type),t.xp6(1),t.Q6J("ngSwitchCase","hidden"),t.xp6(1),t.Q6J("ngSwitchCase","checkbox"),t.xp6(1),t.Q6J("ngSwitchCase","select"),t.xp6(1),t.Q6J("ngSwitchCase","multiselect")}}function D(n,i){if(1&n&&(t.ynx(0,null,12),t._UZ(2,"input",13),t.BQk()),2&n){const e=t.oxw().$implicit;t.xp6(2),t.s9C("formControlName",e.name)}}function P(n,i){if(1&n&&(t.ynx(0,null,14),t.TgZ(2,"label",15),t._UZ(3,"input",16),t._uU(4),t.qZA(),t.BQk()),2&n){const e=t.oxw().$implicit;t.xp6(3),t.s9C("formControlName",e.name),t.xp6(1),t.hij(" ",e.label," ")}}function $(n,i){if(1&n&&(t.TgZ(0,"option",19),t._uU(1),t.qZA()),2&n){const e=i.$implicit;t.s9C("value",e.value),t.xp6(1),t.Oqu(e.label)}}function I(n,i){if(1&n&&(t.ynx(0,null,14),t.TgZ(2,"label"),t._uU(3),t.qZA(),t.TgZ(4,"div",5)(5,"select",17),t.YNc(6,$,2,2,"option",18),t.qZA()(),t.BQk()),2&n){const e=t.oxw().$implicit;t.xp6(3),t.Oqu(e.label),t.xp6(2),t.s9C("formControlName",e.name),t.xp6(1),t.Q6J("ngForOf",e.options)}}function V(n,i){if(1&n&&(t.TgZ(0,"p")(1,"label"),t._UZ(2,"input",21),t._uU(3),t.qZA()()),2&n){const e=i.$implicit;t.xp6(2),t.Q6J("formControl",e.control),t.xp6(1),t.hij(" ",e.label," ")}}function j(n,i){if(1&n&&(t.ynx(0,null,14),t.TgZ(2,"label"),t._uU(3),t.qZA(),t.TgZ(4,"div",5),t.YNc(5,V,4,2,"p",20),t.qZA(),t.BQk()),2&n){const e=t.oxw().$implicit;t.xp6(3),t.AsE("",e.label," - ",e.name,""),t.xp6(2),t.Q6J("ngForOf",e.options)}}function R(n,i){if(1&n&&(t.ynx(0,null,22),t.TgZ(2,"label",23),t._uU(3),t.qZA(),t.TgZ(4,"div",5),t._UZ(5,"input",24),t.qZA(),t.BQk()),2&n){const e=t.oxw().$implicit;t.xp6(2),t.s9C("for",e.name),t.xp6(1),t.Oqu(e.label),t.xp6(2),t.s9C("type",e.type),t.s9C("id",e.name),t.s9C("formControlName",e.name)}}function G(n,i){if(1&n&&(t.TgZ(0,"div",8),t.ynx(1,9),t.YNc(2,D,3,1,"ng-container",10),t.YNc(3,P,5,2,"ng-container",10),t.YNc(4,I,7,3,"ng-container",10),t.YNc(5,j,6,3,"ng-container",10),t.YNc(6,R,6,5,"ng-container",11),t.BQk(),t.qZA()),2&n){const e=i.$implicit;t.xp6(1),t.Q6J("ngSwitch",e.type),t.xp6(1),t.Q6J("ngSwitchCase","hidden"),t.xp6(1),t.Q6J("ngSwitchCase","checkbox"),t.xp6(1),t.Q6J("ngSwitchCase","select"),t.xp6(1),t.Q6J("ngSwitchCase","multiselect")}}const z=[{path:"",component:U,data:{title:"List Novels",breadcrumb:"List"}},{path:"add",component:(()=>{class n extends _{constructor(e,o,l,a){super(a),this.router=e,this.route=o,this.api=l,this.formBuilder=a}ngOnInit(){this.formTitle="Add new Novel",Promise.all([this.api.Meta.get("drivers"),this.api.Dictionary.getAll()]).then(e=>{this.loadMeta(e[0],e[1]),this.getForm(!0)})}submitForm(e){const o=this.getValues();this.api.Novel.add({values:o}).then(l=>{this.router.navigate(["/novel/",l.id])},l=>{console.log(l)})}goBack(){this.router.navigate(["/novel"])}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(p.F0),t.Y36(p.gz),t.Y36(m.s),t.Y36(s.qu))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-novel-add"]],features:[t.qOj],decls:10,vars:3,consts:[[1,"form-content"],[1,"title"],[3,"formGroup","ngSubmit"],["class","field",4,"ngFor","ngForOf"],[1,"field","is-grouped"],[1,"control"],["type","submit","value","Submit",1,"button","is-link"],["value","Cancel",1,"button","is-danger",3,"click"],[1,"field"],[3,"ngSwitch"],[4,"ngSwitchCase"],[4,"ngSwitchDefault"],["tempHidden",""],["type","hidden",3,"formControlName"],["tempCheck",""],[1,"checkbox"],["type","checkbox",3,"formControlName"],[3,"formControlName"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[4,"ngFor","ngForOf"],["type","checkbox",3,"formControl"],["tempText",""],[1,"label",3,"for"],[1,"input",3,"type","id","formControlName"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"h1",1),t._uU(2),t.qZA(),t.TgZ(3,"form",2),t.NdJ("ngSubmit",function(){return o.submitForm(o.formGroup.value)}),t.YNc(4,B,7,5,"div",3),t.TgZ(5,"div",4)(6,"div",5),t._UZ(7,"input",6),t.qZA(),t.TgZ(8,"div",5)(9,"input",7),t.NdJ("click",function(){return o.goBack()}),t.qZA()()()()()),2&e&&(t.xp6(2),t.Oqu(o.formTitle),t.xp6(1),t.Q6J("formGroup",o.formGroup),t.xp6(1),t.Q6J("ngForOf",o.form))},directives:[s._Y,s.JL,s.sg,c.sg,c.RF,c.n9,s.Fj,s.JJ,s.u,s.Wl,s.EJ,s.YN,s.Kr,s.oH,c.ED],styles:[".form-content[_ngcontent-%COMP%]{padding:30px;border-radius:10px}"]}),n})(),data:{title:"Add New Novel",breadcrumb:"Add Novel"}},{path:"edit/:idNovel",component:(()=>{class n extends _{constructor(e,o,l,a){super(a),this.router=e,this.route=o,this.api=l,this.formBuilder=a}ngOnInit(){this.idNovel=this.route.snapshot.params.idNovel,this.formTitle="Edit Novel",Promise.all([this.api.Meta.get("drivers"),this.api.Novel.get({id:this.idNovel}),this.api.Dictionary.getAll({idNovel:this.idNovel}),this.api.Dictionary.getAll()]).then(e=>{this.novel=e[1],this.dictionaries=e[2],this.loadMeta(e[0],e[3]),this.setValues(e[1],e[2]),this.getForm(!1)})}submitForm(e){const o=this.getValues(this.dictionaries);this.api.Novel.update({id:this.idNovel,values:o}).then(l=>{this.goBack()},l=>{console.log(l)})}goBack(){this.router.navigate(["/novel"])}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(p.F0),t.Y36(p.gz),t.Y36(m.s),t.Y36(s.qu))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-novel-edit"]],features:[t.qOj],decls:10,vars:3,consts:[[1,"form-content"],[1,"title"],[3,"formGroup","ngSubmit"],["class","field",4,"ngFor","ngForOf"],[1,"field","is-grouped"],[1,"control"],["type","submit","value","Submit",1,"button","is-link"],["value","Cancel",1,"button","is-danger",3,"click"],[1,"field"],[3,"ngSwitch"],[4,"ngSwitchCase"],[4,"ngSwitchDefault"],["tempHidden",""],["type","hidden",3,"formControlName"],["tempCheck",""],[1,"checkbox"],["type","checkbox",3,"formControlName"],[3,"formControlName"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[4,"ngFor","ngForOf"],["type","checkbox",3,"formControl"],["tempText",""],[1,"label",3,"for"],[1,"input",3,"type","id","formControlName"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"h1",1),t._uU(2),t.qZA(),t.TgZ(3,"form",2),t.NdJ("ngSubmit",function(){return o.submitForm(o.formGroup.value)}),t.YNc(4,G,7,5,"div",3),t.TgZ(5,"div",4)(6,"div",5),t._UZ(7,"input",6),t.qZA(),t.TgZ(8,"div",5)(9,"input",7),t.NdJ("click",function(){return o.goBack()}),t.qZA()()()()()),2&e&&(t.xp6(2),t.Oqu(o.formTitle),t.xp6(1),t.Q6J("formGroup",o.formGroup),t.xp6(1),t.Q6J("ngForOf",o.form))},directives:[s._Y,s.JL,s.sg,c.sg,c.RF,c.n9,s.Fj,s.JJ,s.u,s.Wl,s.EJ,s.YN,s.Kr,s.oH,c.ED],styles:[".form-content[_ngcontent-%COMP%]{padding:30px;border-radius:10px}"]}),n})(),data:{title:"Edit Novel",breadcrumb:"Edit Novel"}},{path:":idNovel",loadChildren:()=>Promise.all([r.e(592),r.e(12)]).then(r.bind(r,4012)).then(n=>n.ChapterModule),data:{title:"View chapters",breadcrumb:"Chapters"}},{path:"**",redirectTo:""}];let H=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[c.ez,p.Bz.forChild(z)]]}),n})();var K=r(6920);let W=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[c.ez,H,p.Bz,s.u5,s.UX,K.uH]]}),n})()}}]);