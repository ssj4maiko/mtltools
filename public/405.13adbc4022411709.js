(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[405],{7405:(_t,ct,D)=>{"use strict";D.r(ct),D.d(ct,{EntryModule:()=>q});var Q=D(6895),H=D(4793),Y=D(3178),e=D(4650),M=D(4006);let it=(()=>{class a{constructor(t){this.formBuilder=t,this.indexes=[],this.entries=[]}createForm(t,i,r){this.formEntries=r.map(s=>new Y.y(s)),console.log(this.formEntries),this.addItem()}addItem(){this.formEntries.push(new Y.y(null,this.idCategory))}onChange(t,i){t.reset?this.formEntries[i]=this.entries[i]?new Y.y(this.entries[i]):new Y.y(null,this.idCategory):(t.delete?this.entries[i]?this.formEntries[i].delete=!0:this.formEntries.splice(i,1):this.formEntries[i].update=this.formEntries[i].id&&(this.formEntries[i].idCategory!==this.entries[i].idCategory||this.formEntries[i].entryOriginal!==this.entries[i].entryOriginal||this.formEntries[i].entryTranslation!==this.entries[i].entryTranslation||this.formEntries[i].description!==this.entries[i].description||this.formEntries[i].sufix!==this.entries[i].sufix||this.formEntries[i].prefix!==this.entries[i].prefix),this.checkIfNeedsToAutoAddAnExtraItem())}checkIfNeedsToAutoAddAnExtraItem(){const t=this.formEntries[this.formEntries.length-1];(t.entryOriginal||t.entryTranslation||t.description)&&this.addItem()}getValues(){return{entries:this.formEntries}}}return a.\u0275fac=function(t){return new(t||a)(e.LFG(M.qu))},a.\u0275prov=e.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})();var X=D(6845),dt=D(230),f=D(3028);let W=(()=>{let a=class{constructor(){this._papa=f}parse(t,i){return this._papa.parse(t,i)}unparse(t,i){return this._papa.unparse(t,i)}setLocalChunkSize(t){this._papa.LocalChunkSize=t}setRemoteChunkSize(t){this._papa.RemoteChunkSize=t}setDefaultDelimiter(t){this._papa.DefaultDelimiter=t}get badDelimiters(){return this._papa.BAD_DELIMITERS}get recordSeparator(){return this._papa.RECORD_SEP}get unitSeparator(){return this._papa.UNIT_SEP}get workersSupported(){return this._papa.WORKERS_SUPPORTED}};return a.\u0275fac=function(t){return new(t||a)},a.\u0275prov=(0,e.Yz7)({factory:function(){return new a},token:a,providedIn:"root"}),a})();function N(a,n){1&a&&(e.TgZ(0,"div",9),e._UZ(1,"div",10),e.qZA())}function V(a,n){if(1&a){const t=e.EpF();e.TgZ(0,"div",9)(1,"div",10)(2,"button",11),e.NdJ("click",function(){return e.CHM(t),e.oxw().submitForm()}),e._uU(3,"Save"),e.qZA()(),e.TgZ(4,"div",10)(5,"a",11),e.NdJ("click",function(){return e.CHM(t),e.oxw().addItem()}),e._uU(6,"Add Entry"),e.qZA()()()}}function tt(a,n){1&a&&e.GkF(0)}function G(a,n){if(1&a&&(e.TgZ(0,"option",23),e._uU(1),e.qZA()),2&a){const t=n.$implicit;e.s9C("value",t.id),e.xp6(1),e.Oqu(t.name)}}function et(a,n){if(1&a&&(e.TgZ(0,"option",23),e._uU(1),e.qZA()),2&a){const t=n.$implicit;e.s9C("value",t.id),e.xp6(1),e.Oqu(t.name)}}function ut(a,n){if(1&a&&(e.TgZ(0,"option",23),e._uU(1),e.qZA()),2&a){const t=n.$implicit;e.s9C("value",t.id),e.xp6(1),e.Oqu(t.name)}}const K=function(a,n,t){return{new:a,deleted:n,changed:t}};function rt(a,n){if(1&a){const t=e.EpF();e.ynx(0),e.TgZ(1,"tr",12)(2,"td")(3,"select",13),e.NdJ("change",function(){const r=e.CHM(t),s=r.$implicit,o=r.index;return e.oxw().onChange(s,o)})("ngModelChange",function(r){return e.CHM(t).$implicit.idCategory=r}),e.YNc(4,G,2,2,"option",14),e.qZA()(),e.TgZ(5,"td")(6,"input",15),e.NdJ("change",function(){const r=e.CHM(t),s=r.$implicit,o=r.index;return e.oxw().onChange(s,o)})("ngModelChange",function(r){return e.CHM(t).$implicit.id=r}),e.qZA(),e.TgZ(7,"input",15),e.NdJ("change",function(){const r=e.CHM(t),s=r.$implicit,o=r.index;return e.oxw().onChange(s,o)})("ngModelChange",function(r){return e.CHM(t).$implicit.update=r}),e.qZA(),e.TgZ(8,"input",16),e.NdJ("change",function(){const r=e.CHM(t),s=r.$implicit,o=r.index;return e.oxw().onChange(s,o)})("ngModelChange",function(r){return e.CHM(t).$implicit.entryOriginal=r}),e.qZA()(),e.TgZ(9,"td")(10,"select",13),e.NdJ("change",function(){const r=e.CHM(t),s=r.$implicit,o=r.index;return e.oxw().onChange(s,o)})("ngModelChange",function(r){return e.CHM(t).$implicit.sufix=r}),e.TgZ(11,"option",17),e._uU(12,"Not a Sufix"),e.qZA(),e.YNc(13,et,2,2,"option",14),e.qZA()(),e.TgZ(14,"td")(15,"input",16),e.NdJ("change",function(){const r=e.CHM(t),s=r.$implicit,o=r.index;return e.oxw().onChange(s,o)})("ngModelChange",function(r){return e.CHM(t).$implicit.entryTranslation=r}),e.qZA()(),e.TgZ(16,"td")(17,"select",13),e.NdJ("change",function(){const r=e.CHM(t),s=r.$implicit,o=r.index;return e.oxw().onChange(s,o)})("ngModelChange",function(r){return e.CHM(t).$implicit.prefix=r}),e.TgZ(18,"option",17),e._uU(19,"Not a Prefix"),e.qZA(),e.YNc(20,ut,2,2,"option",14),e.qZA()(),e.TgZ(21,"td")(22,"textarea",18),e.NdJ("change",function(){const r=e.CHM(t),s=r.$implicit,o=r.index;return e.oxw().onChange(s,o)})("ngModelChange",function(r){return e.CHM(t).$implicit.description=r}),e.qZA()(),e.TgZ(23,"td")(24,"label",19),e._UZ(25,"i",20),e.TgZ(26,"input",21),e.NdJ("change",function(){const r=e.CHM(t),s=r.$implicit,o=r.index;return e.oxw().onChange(s,o)})("ngModelChange",function(r){return e.CHM(t).$implicit.reset=r}),e.qZA()()(),e.TgZ(27,"td")(28,"label",19),e._UZ(29,"i",22),e.TgZ(30,"input",21),e.NdJ("change",function(){const r=e.CHM(t),s=r.$implicit,o=r.index;return e.oxw().onChange(s,o)})("ngModelChange",function(r){return e.CHM(t).$implicit.delete=r}),e.qZA()()()(),e.BQk()}if(2&a){const t=n.$implicit,i=n.index,r=e.oxw();e.xp6(1),e.Q6J("ngClass",e.kEZ(24,K,null==t.id,1==t.delete,1==t.update)),e.xp6(2),e.MGl("name","formEntries[",i,"].idCategory"),e.Q6J("ngModel",t.idCategory),e.xp6(1),e.Q6J("ngForOf",r.categories),e.xp6(2),e.MGl("name","formEntries[",i,"].id"),e.Q6J("ngModel",t.id),e.xp6(1),e.MGl("name","formEntries[",i,"].update"),e.Q6J("ngModel",t.update),e.xp6(1),e.MGl("name","formEntries[",i,"].entryOriginal"),e.Q6J("ngModel",t.entryOriginal),e.xp6(2),e.MGl("name","formEntries[",i,"].sufix"),e.Q6J("ngModel",t.sufix),e.xp6(3),e.Q6J("ngForOf",r.categories),e.xp6(2),e.MGl("name","formEntries[",i,"].entryTranslation"),e.Q6J("ngModel",t.entryTranslation),e.xp6(2),e.MGl("name","formEntries[",i,"].prefix"),e.Q6J("ngModel",t.prefix),e.xp6(3),e.Q6J("ngForOf",r.categories),e.xp6(2),e.MGl("name","formEntries[",i,"].description"),e.Q6J("ngModel",t.description),e.xp6(4),e.MGl("name","formEntries[",i,"].reset"),e.Q6J("ngModel",t.reset),e.xp6(4),e.MGl("name","formEntries[",i,"].delete"),e.Q6J("ngModel",t.delete)}}function ft(a,n){1&a&&e.GkF(0)}const lt=[{path:"",component:(()=>{class a extends it{constructor(t,i,r,s,o,h){super(s),this.router=t,this.route=i,this.api=r,this.formBuilder=s,this.modalService=o,this.papa=h,this.categories=[],this.tmpResult=[]}ngOnInit(){this.idDictionary=this.route.snapshot.params.idDictionary,this.idCategory=this.route.snapshot.params.idCategory,Promise.all([this.api.Dictionary.get({id:this.idDictionary}),this.api.Category.getAll({idDictionary:this.idDictionary}),this.api.Entry.getAll({idDictionary:this.idDictionary,idCategory:this.idCategory})]).then(t=>{this.api.Category.get({idDictionary:this.idDictionary,id:this.idCategory}).then(i=>{this.dictionary=t[0],this.categories=Object.values(t[1]),this.entries=Object.values(t[2]),this.createForm(this.idDictionary,this.idCategory,this.entries)})})}ngOnDestroy(){delete this.entries,delete this.dictionary,delete this.categories,delete this.formGroup,delete this.entryArray,delete this.idCategory,delete this.idDictionary,console.log("DESTROY!")}submitForm(){const t=this.getValues();this.api.Entry.saveByCategory({idDictionary:this.idDictionary,idCategory:this.idCategory,entries:t.entries}).then(i=>{i?this.router.navigate(["/dictionary/",this.idDictionary]):console.log("THERE WAS AN ERROR! (SubmitForm)")})}}return a.\u0275fac=function(t){return new(t||a)(e.Y36(H.F0),e.Y36(H.gz),e.Y36(X.s),e.Y36(M.qu),e.Y36(dt.Z),e.Y36(W))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-list"]],hostBindings:function(t,i){1&t&&e.NdJ("blur",function(s){return i.onBlur(s)})},features:[e.qOj],decls:31,vars:5,consts:[["actionButtons",""],["footerButtons",""],[4,"ngTemplateOutlet"],["id","formGroup",3,"submit"],["type","hidden","name","idDictionary",3,"ngModel","ngModelChange"],["type","hidden","name","idCategory",3,"ngModel","ngModelChange"],[1,"table","is-stripede","is-fullwidth"],[1,"tableContent"],[4,"ngFor","ngForOf"],[1,"columns","actionButtons"],[1,"column"],[1,"button","is-info",3,"click"],[3,"ngClass"],[3,"name","ngModel","change","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["type","hidden",3,"name","ngModel","change","ngModelChange"],["type","text",1,"input",3,"name","ngModel","change","ngModelChange"],["value","null"],["rows","1",1,"textarea",3,"name","ngModel","change","ngModelChange"],[1,"icon","is-large"],[1,"fas","fa-exclamation-triangle"],["type","checkbox","value","1",1,"hidden",3,"name","ngModel","change","ngModelChange"],[1,"fas","fa-times"],[3,"value"]],template:function(t,i){if(1&t&&(e.YNc(0,N,2,0,"ng-template",null,0,e.W1O),e.YNc(2,V,7,0,"ng-template",null,1,e.W1O),e.YNc(4,tt,1,0,"ng-container",2),e.TgZ(5,"div")(6,"form",3),e.NdJ("submit",function(){return i.submitForm()}),e.TgZ(7,"input",4),e.NdJ("ngModelChange",function(s){return i.idDictionary=s}),e.qZA(),e.TgZ(8,"input",5),e.NdJ("ngModelChange",function(s){return i.idCategory=s}),e.qZA(),e.TgZ(9,"table",6)(10,"thead")(11,"tr")(12,"th"),e._uU(13,"Category"),e.qZA(),e.TgZ(14,"th"),e._uU(15,"Original"),e.qZA(),e.TgZ(16,"th"),e._uU(17,"Suffix"),e.qZA(),e.TgZ(18,"th"),e._uU(19,"Translated"),e.qZA(),e.TgZ(20,"th"),e._uU(21,"Prefix"),e.qZA(),e.TgZ(22,"th"),e._uU(23,"Description"),e.qZA(),e.TgZ(24,"th"),e._uU(25,"Reset"),e.qZA(),e.TgZ(26,"th"),e._uU(27,"Delete"),e.qZA()()(),e.TgZ(28,"tbody",7),e.YNc(29,rt,31,28,"ng-container",8),e.qZA()()()(),e.YNc(30,ft,1,0,"ng-container",2)),2&t){const r=e.MAs(3);e.xp6(4),e.Q6J("ngTemplateOutlet",r),e.xp6(3),e.Q6J("ngModel",i.idDictionary),e.xp6(1),e.Q6J("ngModel",i.idCategory),e.xp6(21),e.Q6J("ngForOf",i.formEntries),e.xp6(1),e.Q6J("ngTemplateOutlet",r)}},directives:[Q.tP,M._Y,M.JL,M.F,M.Fj,M.JJ,M.On,Q.sg,Q.mk,M.EJ,M.YN,M.Kr,M.Wl],styles:[".actionButtons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .actionButtons[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{text-align:center;width:100%}.hidden[_ngcontent-%COMP%]{display:none}.tableContent[_ngcontent-%COMP%]   .changed[_ngcontent-%COMP%]{background-color:green}.tableContent[_ngcontent-%COMP%]   .new[_ngcontent-%COMP%]{background-color:#00f}.tableContent[_ngcontent-%COMP%]   .deleted[_ngcontent-%COMP%]{background-color:red}"]}),a})(),data:{title:"List Entries"}},{path:"**",redirectTo:""}];let st=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[[H.Bz.forChild(lt)],H.Bz]}),a})(),q=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[[Q.ez,st,M.u5,M.UX]]}),a})()},3028:function(_t,ct){var D,H;D=function Y(){"use strict";var e=typeof self<"u"?self:typeof window<"u"?window:void 0!==e?e:{},M=!e.document&&!!e.postMessage,it=M&&/blob:/i.test((e.location||{}).protocol),X={},dt=0,f={parse:function(n,t){var i=(t=t||{}).dynamicTyping||!1;if(a(i)&&(t.dynamicTypingFunction=i,i={}),t.dynamicTyping=i,t.transform=!!a(t.transform)&&t.transform,t.worker&&f.WORKERS_SUPPORTED){var r=function(){if(!f.WORKERS_SUPPORTED)return!1;var O,x,o=(O=e.URL||e.webkitURL||null,x=Y.toString(),f.BLOB_URL||(f.BLOB_URL=O.createObjectURL(new Blob(["(",x,")();"],{type:"text/javascript"})))),h=new e.Worker(o);return h.onmessage=ft,h.id=dt++,X[h.id]=h}();return r.userStep=t.step,r.userChunk=t.chunk,r.userComplete=t.complete,r.userError=t.error,t.step=a(t.step),t.chunk=a(t.chunk),t.complete=a(t.complete),t.error=a(t.error),delete t.worker,void r.postMessage({input:n,config:t,workerId:r.id})}var s=null;return"string"==typeof n?s=t.download?new V(t):new G(t):!0===n.readable&&a(n.read)&&a(n.on)?s=new et(t):(e.File&&n instanceof File||n instanceof Object)&&(s=new tt(t)),s.stream(n)},unparse:function(n,t){var i=!1,r=!0,s=",",o="\r\n",h='"',O=h+h,x=!1,u=null,T=!1;!function(){if("object"==typeof t){if("string"!=typeof t.delimiter||f.BAD_DELIMITERS.filter(function(c){return-1!==t.delimiter.indexOf(c)}).length||(s=t.delimiter),("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(i=t.quotes),"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(x=t.skipEmptyLines),"string"==typeof t.newline&&(o=t.newline),"string"==typeof t.quoteChar&&(h=t.quoteChar),"boolean"==typeof t.header&&(r=t.header),Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");u=t.columns}void 0!==t.escapeChar&&(O=t.escapeChar+h),("boolean"==typeof t.escapeFormulae||t.escapeFormulae instanceof RegExp)&&(T=t.escapeFormulae instanceof RegExp?t.escapeFormulae:/^[=+\-@\t\r].*$/)}}();var d=new RegExp(K(h),"g");if("string"==typeof n&&(n=JSON.parse(n)),Array.isArray(n)){if(!n.length||Array.isArray(n[0]))return P(null,n,x);if("object"==typeof n[0])return P(u||Object.keys(n[0]),n,x)}else if("object"==typeof n)return"string"==typeof n.data&&(n.data=JSON.parse(n.data)),Array.isArray(n.data)&&(n.fields||(n.fields=n.meta&&n.meta.fields||u),n.fields||(n.fields=Array.isArray(n.data[0])?n.fields:"object"==typeof n.data[0]?Object.keys(n.data[0]):[]),Array.isArray(n.data[0])||"object"==typeof n.data[0]||(n.data=[n.data])),P(n.fields||[],n.data||[],x);throw new Error("Unable to serialize unrecognized input");function P(c,C,S){var v="";"string"==typeof c&&(c=JSON.parse(c)),"string"==typeof C&&(C=JSON.parse(C));var R=Array.isArray(c)&&0<c.length,b=!Array.isArray(C[0]);if(R&&r){for(var w=0;w<c.length;w++)0<w&&(v+=s),v+=A(c[w],w);0<C.length&&(v+=o)}for(var l=0;l<C.length;l++){var m=R?c.length:C[l].length,y=!1,k=R?0===Object.keys(C[l]).length:0===C[l].length;if(S&&!R&&(y="greedy"===S?""===C[l].join("").trim():1===C[l].length&&0===C[l][0].length),"greedy"===S&&R){for(var _=[],g=0;g<m;g++)_.push(C[l][b?c[g]:g]);y=""===_.join("").trim()}if(!y){for(var p=0;p<m;p++)0<p&&!k&&(v+=s),v+=A(C[l][R&&b?c[p]:p],p);l<C.length-1&&(!S||0<m&&!k)&&(v+=o)}}return v}function A(c,C){if(null==c)return"";if(c.constructor===Date)return JSON.stringify(c).slice(1,25);var S=!1;T&&"string"==typeof c&&T.test(c)&&(c="'"+c,S=!0);var v=c.toString().replace(d,O);return(S=S||!0===i||"function"==typeof i&&i(c,C)||Array.isArray(i)&&i[C]||function(R,b){for(var w=0;w<b.length;w++)if(-1<R.indexOf(b[w]))return!0;return!1}(v,f.BAD_DELIMITERS)||-1<v.indexOf(s)||" "===v.charAt(0)||" "===v.charAt(v.length-1))?h+v+h:v}}};if(f.RECORD_SEP=String.fromCharCode(30),f.UNIT_SEP=String.fromCharCode(31),f.BYTE_ORDER_MARK="\ufeff",f.BAD_DELIMITERS=["\r","\n",'"',f.BYTE_ORDER_MARK],f.WORKERS_SUPPORTED=!M&&!!e.Worker,f.NODE_STREAM_INPUT=1,f.LocalChunkSize=10485760,f.RemoteChunkSize=5242880,f.DefaultDelimiter=",",f.Parser=rt,f.ParserHandle=ut,f.NetworkStreamer=V,f.FileStreamer=tt,f.StringStreamer=G,f.ReadableStreamStreamer=et,e.jQuery){var W=e.jQuery;W.fn.parse=function(n){var t=n.config||{},i=[];return this.each(function(o){if("INPUT"!==W(this).prop("tagName").toUpperCase()||"file"!==W(this).attr("type").toLowerCase()||!e.FileReader||!this.files||0===this.files.length)return!0;for(var h=0;h<this.files.length;h++)i.push({file:this.files[h],inputElem:this,instanceConfig:W.extend({},t)})}),r(),this;function r(){if(0!==i.length){var h,O,x,u=i[0];if(a(n.before)){var T=n.before(u.file,u.inputElem);if("object"==typeof T){if("abort"===T.action)return"AbortError",h=u.file,O=u.inputElem,x=T.reason,void(a(n.error)&&n.error({name:"AbortError"},h,O,x));if("skip"===T.action)return void s();"object"==typeof T.config&&(u.instanceConfig=W.extend(u.instanceConfig,T.config))}else if("skip"===T)return void s()}var d=u.instanceConfig.complete;u.instanceConfig.complete=function(P){a(d)&&d(P,u.file,u.inputElem),s()},f.parse(u.file,u.instanceConfig)}else a(n.complete)&&n.complete()}function s(){i.splice(0,1),r()}}}function N(n){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(t){var i=st(t);i.chunkSize=parseInt(i.chunkSize),t.step||t.chunk||(i.chunkSize=null),this._handle=new ut(i),(this._handle.streamer=this)._config=i}.call(this,n),this.parseChunk=function(t,i){if(this.isFirstChunk&&a(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(t);void 0!==r&&(t=r)}this.isFirstChunk=!1,this._halted=!1;var s=this._partialLine+t;this._partialLine="";var o=this._handle.parse(s,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var h=o.meta.cursor;this._finished||(this._partialLine=s.substring(h-this._baseIndex),this._baseIndex=h),o&&o.data&&(this._rowCount+=o.data.length);var O=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(it)e.postMessage({results:o,workerId:f.WORKER_ID,finished:O});else if(a(this._config.chunk)&&!i){if(this._config.chunk(o,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);o=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(o.data),this._completeResults.errors=this._completeResults.errors.concat(o.errors),this._completeResults.meta=o.meta),this._completed||!O||!a(this._config.complete)||o&&o.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),O||o&&o.meta.paused||this._nextChunk(),o}this._halted=!0},this._sendError=function(t){a(this._config.error)?this._config.error(t):it&&this._config.error&&e.postMessage({workerId:f.WORKER_ID,error:t,finished:!1})}}function V(n){var t;(n=n||{}).chunkSize||(n.chunkSize=f.RemoteChunkSize),N.call(this,n),this._nextChunk=M?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(i){this._input=i,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),M||(t.onload=q(this._chunkLoaded,this),t.onerror=q(this._chunkError,this)),t.open(this._config.downloadRequestBody?"POST":"GET",this._input,!M),this._config.downloadRequestHeaders){var i=this._config.downloadRequestHeaders;for(var r in i)t.setRequestHeader(r,i[r])}this._config.chunkSize&&t.setRequestHeader("Range","bytes="+this._start+"-"+(this._start+this._config.chunkSize-1));try{t.send(this._config.downloadRequestBody)}catch(o){this._chunkError(o.message)}M&&0===t.status&&this._chunkError()}},this._chunkLoaded=function(){var r;4===t.readyState&&(t.status<200||400<=t.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:t.responseText.length,this._finished=!this._config.chunkSize||this._start>=(null===(r=t.getResponseHeader("Content-Range"))?-1:parseInt(r.substring(r.lastIndexOf("/")+1))),this.parseChunk(t.responseText)))},this._chunkError=function(i){this._sendError(new Error(t.statusText||i))}}function tt(n){var t,i;(n=n||{}).chunkSize||(n.chunkSize=f.LocalChunkSize),N.call(this,n);var r=typeof FileReader<"u";this.stream=function(s){this._input=s,i=s.slice||s.webkitSlice||s.mozSlice,r?((t=new FileReader).onload=q(this._chunkLoaded,this),t.onerror=q(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var s=this._input;if(this._config.chunkSize){var o=Math.min(this._start+this._config.chunkSize,this._input.size);s=i.call(s,this._start,o)}var h=t.readAsText(s,this._config.encoding);r||this._chunkLoaded({target:{result:h}})},this._chunkLoaded=function(s){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(s.target.result)},this._chunkError=function(){this._sendError(t.error)}}function G(n){var t;N.call(this,n=n||{}),this.stream=function(i){return t=i,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var i,r=this._config.chunkSize;return r?(i=t.substring(0,r),t=t.substring(r)):(i=t,t=""),this._finished=!t,this.parseChunk(i)}}}function et(n){N.call(this,n=n||{});var t=[],i=!0,r=!1;this.pause=function(){N.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){N.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(s){this._input=s,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){r&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):i=!0},this._streamData=q(function(s){try{t.push("string"==typeof s?s:s.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(o){this._streamError(o)}},this),this._streamError=q(function(s){this._streamCleanUp(),this._sendError(s)},this),this._streamEnd=q(function(){this._streamCleanUp(),r=!0,this._streamData("")},this),this._streamCleanUp=q(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function ut(n){var t,i,r,s=Math.pow(2,53),o=-s,h=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,O=/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/,x=this,u=0,T=0,d=!1,P=!1,A=[],c={data:[],errors:[],meta:{}};if(a(n.step)){var C=n.step;n.step=function(l){if(c=l,R())v();else{if(v(),0===c.data.length)return;u+=l.data.length,n.preview&&u>n.preview?i.abort():(c.data=c.data[0],C(c,x))}}}function S(l){return"greedy"===n.skipEmptyLines?""===l.join("").trim():1===l.length&&0===l[0].length}function v(){return c&&r&&(w("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+f.DefaultDelimiter+"'"),r=!1),n.skipEmptyLines&&(c.data=c.data.filter(function(l){return!S(l)})),R()&&function(){if(c)if(Array.isArray(c.data[0])){for(var m=0;R()&&m<c.data.length;m++)c.data[m].forEach(l);c.data.splice(0,1)}else c.data.forEach(l);function l(y,k){a(n.transformHeader)&&(y=n.transformHeader(y,k)),A.push(y)}}(),function(){if(!c||!n.header&&!n.dynamicTyping&&!n.transform)return c;function l(y,k){var _,g=n.header?{}:[];for(_=0;_<y.length;_++){var E=_,p=y[_];n.header&&(E=_>=A.length?"__parsed_extra":A[_]),n.transform&&(p=n.transform(p,E)),p=b(E,p),"__parsed_extra"===E?(g[E]=g[E]||[],g[E].push(p)):g[E]=p}return n.header&&(_>A.length?w("FieldMismatch","TooManyFields","Too many fields: expected "+A.length+" fields but parsed "+_,T+k):_<A.length&&w("FieldMismatch","TooFewFields","Too few fields: expected "+A.length+" fields but parsed "+_,T+k)),g}var m=1;return!c.data.length||Array.isArray(c.data[0])?(c.data=c.data.map(l),m=c.data.length):c.data=l(c.data,0),n.header&&c.meta&&(c.meta.fields=A),T+=m,c}()}function R(){return n.header&&0===A.length}function b(l,m){return y=l,n.dynamicTypingFunction&&void 0===n.dynamicTyping[y]&&(n.dynamicTyping[y]=n.dynamicTypingFunction(y)),!0===(n.dynamicTyping[y]||n.dynamicTyping)?"true"===m||"TRUE"===m||"false"!==m&&"FALSE"!==m&&(function(k){if(h.test(k)){var _=parseFloat(k);if(o<_&&_<s)return!0}return!1}(m)?parseFloat(m):O.test(m)?new Date(m):""===m?null:m):m;var y}function w(l,m,y,k){var _={type:l,code:m,message:y};void 0!==k&&(_.row=k),c.errors.push(_)}this.parse=function(l,m,y){if(n.newline||(n.newline=function(E,p){E=E.substring(0,1048576);var B=new RegExp(K(p)+"([^]*?)"+K(p),"gm"),J=(E=E.replace(B,"")).split("\r"),F=E.split("\n");if(1===J.length||1<F.length&&F[0].length<J[0].length)return"\n";for(var U=0,I=0;I<J.length;I++)"\n"===J[I][0]&&U++;return U>=J.length/2?"\r\n":"\r"}(l,n.quoteChar||'"')),r=!1,n.delimiter)a(n.delimiter)&&(n.delimiter=n.delimiter(l),c.meta.delimiter=n.delimiter);else{var _=function(E,p,B,J,F){var j,U,I,L;F=F||[",","\t","|",";",f.RECORD_SEP,f.UNIT_SEP];for(var $=0;$<F.length;$++){var Z=F[$],nt=0,z=0,gt=0;I=void 0;for(var ot=new rt({comments:J,delimiter:Z,newline:p,preview:10}).parse(E),ht=0;ht<ot.data.length;ht++)if(B&&S(ot.data[ht]))gt++;else{var at=ot.data[ht].length;z+=at,void 0!==I?0<at&&(nt+=Math.abs(at-I),I=at):I=at}0<ot.data.length&&(z/=ot.data.length-gt),(void 0===U||nt<=U)&&(void 0===L||L<z)&&1.99<z&&(U=nt,j=Z,L=z)}return{successful:!!(n.delimiter=j),bestDelimiter:j}}(l,n.newline,n.skipEmptyLines,n.comments,n.delimitersToGuess);_.successful?n.delimiter=_.bestDelimiter:(r=!0,n.delimiter=f.DefaultDelimiter),c.meta.delimiter=n.delimiter}var g=st(n);return n.preview&&n.header&&g.preview++,t=l,i=new rt(g),c=i.parse(t,m,y),v(),d?{meta:{paused:!0}}:c||{meta:{paused:!1}}},this.paused=function(){return d},this.pause=function(){d=!0,i.abort(),t=a(n.chunk)?"":t.substring(i.getCharIndex())},this.resume=function(){x.streamer._halted?(d=!1,x.streamer.parseChunk(t,!0)):setTimeout(x.resume,3)},this.aborted=function(){return P},this.abort=function(){P=!0,i.abort(),c.meta.aborted=!0,a(n.complete)&&n.complete(c),t=""}}function K(n){return n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function rt(n){var t,i=(n=n||{}).delimiter,r=n.newline,s=n.comments,o=n.step,h=n.preview,O=n.fastMode,x=t=n.quoteChar??'"';if(void 0!==n.escapeChar&&(x=n.escapeChar),("string"!=typeof i||-1<f.BAD_DELIMITERS.indexOf(i))&&(i=","),s===i)throw new Error("Comment character same as delimiter");!0===s?s="#":("string"!=typeof s||-1<f.BAD_DELIMITERS.indexOf(s))&&(s=!1),"\n"!==r&&"\r"!==r&&"\r\n"!==r&&(r="\n");var u=0,T=!1;this.parse=function(d,P,A){if("string"!=typeof d)throw new Error("Input must be a string");var c=d.length,C=i.length,S=r.length,v=s.length,R=a(o),b=[],w=[],l=[],m=u=0;if(!d)return L();if(O||!1!==O&&-1===d.indexOf(t)){for(var y=d.split(r),k=0;k<y.length;k++){if(u+=(l=y[k]).length,k!==y.length-1)u+=r.length;else if(A)return L();if(!s||l.substring(0,v)!==s){if(R){if(b=[],F(l.split(i)),$(),T)return L()}else F(l.split(i));if(h&&h<=k)return b=b.slice(0,h),L(!0)}}return L()}for(var _=d.indexOf(i,u),g=d.indexOf(r,u),E=new RegExp(K(x)+K(t),"g"),p=d.indexOf(t,u);;)if(d[u]!==t)if(s&&0===l.length&&d.substring(u,u+v)===s){if(-1===g)return L();g=d.indexOf(r,u=g+S),_=d.indexOf(i,u)}else if(-1!==_&&(_<g||-1===g))l.push(d.substring(u,_)),_=d.indexOf(i,u=_+C);else{if(-1===g)break;if(l.push(d.substring(u,g)),I(g+S),R&&($(),T))return L();if(h&&b.length>=h)return L(!0)}else for(p=u,u++;;){if(-1===(p=d.indexOf(t,p+1)))return A||w.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:b.length,index:u}),U();if(p===c-1)return U(d.substring(u,p).replace(E,t));if(t!==x||d[p+1]!==x){if(t===x||0===p||d[p-1]!==x){-1!==_&&_<p+1&&(_=d.indexOf(i,p+1)),-1!==g&&g<p+1&&(g=d.indexOf(r,p+1));var B=j(-1===g?_:Math.min(_,g));if(d.substr(p+1+B,C)===i){l.push(d.substring(u,p).replace(E,t)),d[u=p+1+B+C]!==t&&(p=d.indexOf(t,u)),_=d.indexOf(i,u),g=d.indexOf(r,u);break}var J=j(g);if(d.substring(p+1+J,p+1+J+S)===r){if(l.push(d.substring(u,p).replace(E,t)),I(p+1+J+S),_=d.indexOf(i,u),p=d.indexOf(t,u),R&&($(),T))return L();if(h&&b.length>=h)return L(!0);break}w.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:b.length,index:u}),p++}}else p++}return U();function F(Z){b.push(Z),m=u}function j(Z){var nt=0;if(-1!==Z){var z=d.substring(p+1,Z);z&&""===z.trim()&&(nt=z.length)}return nt}function U(Z){return A||(void 0===Z&&(Z=d.substring(u)),l.push(Z),u=c,F(l),R&&$()),L()}function I(Z){u=Z,F(l),l=[],g=d.indexOf(r,u)}function L(Z){return{data:b,errors:w,meta:{delimiter:i,linebreak:r,aborted:T,truncated:!!Z,cursor:m+(P||0)}}}function $(){o(L()),b=[],w=[]}},this.abort=function(){T=!0},this.getCharIndex=function(){return u}}function ft(n){var t=n.data,i=X[t.workerId],r=!1;if(t.error)i.userError(t.error,t.file);else if(t.results&&t.results.data){var s={abort:function(){r=!0,pt(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:lt,resume:lt};if(a(i.userStep)){for(var o=0;o<t.results.data.length&&(i.userStep({data:t.results.data[o],errors:t.results.errors,meta:t.results.meta},s),!r);o++);delete t.results}else a(i.userChunk)&&(i.userChunk(t.results,s,t.file),delete t.results)}t.finished&&!r&&pt(t.workerId,t.results)}function pt(n,t){var i=X[n];a(i.userComplete)&&i.userComplete(t),i.terminate(),delete X[n]}function lt(){throw new Error("Not implemented.")}function st(n){if("object"!=typeof n||null===n)return n;var t=Array.isArray(n)?[]:{};for(var i in n)t[i]=st(n[i]);return t}function q(n,t){return function(){n.apply(t,arguments)}}function a(n){return"function"==typeof n}return it&&(e.onmessage=function(n){var t=n.data;if(void 0===f.WORKER_ID&&t&&(f.WORKER_ID=t.workerId),"string"==typeof t.input)e.postMessage({workerId:f.WORKER_ID,results:f.parse(t.input,t.config),finished:!0});else if(e.File&&t.input instanceof File||t.input instanceof Object){var i=f.parse(t.input,t.config);i&&e.postMessage({workerId:f.WORKER_ID,results:i,finished:!0})}}),(V.prototype=Object.create(N.prototype)).constructor=V,(tt.prototype=Object.create(N.prototype)).constructor=tt,(G.prototype=Object.create(G.prototype)).constructor=G,(et.prototype=Object.create(N.prototype)).constructor=et,f},void 0!==(H=D.apply(ct,[]))&&(_t.exports=H)}}]);