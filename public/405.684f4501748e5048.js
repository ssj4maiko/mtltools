(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[405],{7405:(_t,at,I)=>{"use strict";I.r(at),I.d(at,{EntryModule:()=>dt});var Y=I(6895),j=I(4793),W=I(3178),n=I(4650),T=I(4006);let rt=(()=>{class u{constructor(r){this.formBuilder=r,this.indexes=[],this.entries=[]}createForm(r,e,t){this.formEntries=t.map(i=>new W.y(i)),console.log(this.formEntries),this.addItem()}addItem(){this.formEntries.push(new W.y(null,this.idCategory))}onChange(r,e){r.reset?this.formEntries[e]=this.entries[e]?new W.y(this.entries[e]):new W.y(null,this.idCategory):(r.delete?this.entries[e]?this.formEntries[e].delete=!0:this.formEntries.splice(e,1):this.formEntries[e].update=this.formEntries[e].id&&(this.formEntries[e].idCategory!==this.entries[e].idCategory||this.formEntries[e].entryOriginal!==this.entries[e].entryOriginal||this.formEntries[e].entryTranslation!==this.entries[e].entryTranslation||this.formEntries[e].description!==this.entries[e].description),this.checkIfNeedsToAutoAddAnExtraItem())}checkIfNeedsToAutoAddAnExtraItem(){const r=this.formEntries[this.formEntries.length-1];(r.entryOriginal||r.entryTranslation||r.description)&&this.addItem()}getValues(){return{entries:this.formEntries}}}return u.\u0275fac=function(r){return new(r||u)(n.LFG(T.qu))},u.\u0275prov=n.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),u})();var V=I(6845),ft=I(230),l=I(3028);let K=(()=>{let u=class{constructor(){this._papa=l}parse(r,e){return this._papa.parse(r,e)}unparse(r,e){return this._papa.unparse(r,e)}setLocalChunkSize(r){this._papa.LocalChunkSize=r}setRemoteChunkSize(r){this._papa.RemoteChunkSize=r}setDefaultDelimiter(r){this._papa.DefaultDelimiter=r}get badDelimiters(){return this._papa.BAD_DELIMITERS}get recordSeparator(){return this._papa.RECORD_SEP}get unitSeparator(){return this._papa.UNIT_SEP}get workersSupported(){return this._papa.WORKERS_SUPPORTED}};return u.\u0275fac=function(r){return new(r||u)},u.\u0275prov=(0,n.Yz7)({factory:function(){return new u},token:u,providedIn:"root"}),u})();function J(u,m){1&u&&(n.TgZ(0,"div",9),n._UZ(1,"div",10),n.qZA())}function tt(u,m){if(1&u){const r=n.EpF();n.TgZ(0,"div",9)(1,"div",10)(2,"button",11),n.NdJ("click",function(){return n.CHM(r),n.oxw().submitForm()}),n._uU(3,"Save"),n.qZA()(),n.TgZ(4,"div",10)(5,"a",11),n.NdJ("click",function(){return n.CHM(r),n.oxw().addItem()}),n._uU(6,"Add Entry"),n.qZA()()()}}function et(u,m){1&u&&n.GkF(0)}function G(u,m){if(1&u&&(n.TgZ(0,"option",22),n._uU(1),n.qZA()),2&u){const r=m.$implicit;n.s9C("value",r.id),n.xp6(1),n.Oqu(r.name)}}const nt=function(u,m,r){return{new:u,deleted:m,changed:r}};function ct(u,m){if(1&u){const r=n.EpF();n.ynx(0),n.TgZ(1,"tr",12)(2,"td")(3,"select",13),n.NdJ("change",function(){const t=n.CHM(r),i=t.$implicit,s=t.index;return n.oxw().onChange(i,s)})("ngModelChange",function(t){return n.CHM(r).$implicit.idCategory=t}),n.YNc(4,G,2,2,"option",14),n.qZA()(),n.TgZ(5,"td")(6,"input",15),n.NdJ("change",function(){const t=n.CHM(r),i=t.$implicit,s=t.index;return n.oxw().onChange(i,s)})("ngModelChange",function(t){return n.CHM(r).$implicit.id=t}),n.qZA(),n.TgZ(7,"input",15),n.NdJ("change",function(){const t=n.CHM(r),i=t.$implicit,s=t.index;return n.oxw().onChange(i,s)})("ngModelChange",function(t){return n.CHM(r).$implicit.update=t}),n.qZA(),n.TgZ(8,"input",16),n.NdJ("change",function(){const t=n.CHM(r),i=t.$implicit,s=t.index;return n.oxw().onChange(i,s)})("ngModelChange",function(t){return n.CHM(r).$implicit.entryOriginal=t}),n.qZA()(),n.TgZ(9,"td")(10,"input",16),n.NdJ("change",function(){const t=n.CHM(r),i=t.$implicit,s=t.index;return n.oxw().onChange(i,s)})("ngModelChange",function(t){return n.CHM(r).$implicit.entryTranslation=t}),n.qZA()(),n.TgZ(11,"td")(12,"textarea",17),n.NdJ("change",function(){const t=n.CHM(r),i=t.$implicit,s=t.index;return n.oxw().onChange(i,s)})("ngModelChange",function(t){return n.CHM(r).$implicit.description=t}),n.qZA()(),n.TgZ(13,"td")(14,"label",18),n._UZ(15,"i",19),n.TgZ(16,"input",20),n.NdJ("change",function(){const t=n.CHM(r),i=t.$implicit,s=t.index;return n.oxw().onChange(i,s)})("ngModelChange",function(t){return n.CHM(r).$implicit.reset=t}),n.qZA()()(),n.TgZ(17,"td")(18,"label",18),n._UZ(19,"i",21),n.TgZ(20,"input",20),n.NdJ("change",function(){const t=n.CHM(r),i=t.$implicit,s=t.index;return n.oxw().onChange(i,s)})("ngModelChange",function(t){return n.CHM(r).$implicit.delete=t}),n.qZA()()()(),n.BQk()}if(2&u){const r=m.$implicit,e=m.index,t=n.oxw();n.xp6(1),n.Q6J("ngClass",n.kEZ(18,nt,null==r.id,1==r.delete,1==r.update)),n.xp6(2),n.MGl("name","formEntries[",e,"].idCategory"),n.Q6J("ngModel",r.idCategory),n.xp6(1),n.Q6J("ngForOf",t.categories),n.xp6(2),n.MGl("name","formEntries[",e,"].id"),n.Q6J("ngModel",r.id),n.xp6(1),n.MGl("name","formEntries[",e,"].update"),n.Q6J("ngModel",r.update),n.xp6(1),n.MGl("name","formEntries[",e,"].entryOriginal"),n.Q6J("ngModel",r.entryOriginal),n.xp6(2),n.MGl("name","formEntries[",e,"].entryTranslation"),n.Q6J("ngModel",r.entryTranslation),n.xp6(2),n.MGl("name","formEntries[",e,"].description"),n.Q6J("ngModel",r.description),n.xp6(4),n.MGl("name","formEntries[",e,"].reset"),n.Q6J("ngModel",r.reset),n.xp6(4),n.MGl("name","formEntries[",e,"].delete"),n.Q6J("ngModel",r.delete)}}function X(u,m){1&u&&n.GkF(0)}const pt=[{path:"",component:(()=>{class u extends rt{constructor(r,e,t,i,s,o){super(i),this.router=r,this.route=e,this.api=t,this.formBuilder=i,this.modalService=s,this.papa=o,this.categories=[],this.tmpResult=[]}ngOnInit(){this.idDictionary=this.route.snapshot.params.idDictionary,this.idCategory=this.route.snapshot.params.idCategory,Promise.all([this.api.Dictionary.get({id:this.idDictionary}),this.api.Category.getAll({idDictionary:this.idDictionary}),this.api.Entry.getAll({idDictionary:this.idDictionary,idCategory:this.idCategory})]).then(r=>{this.api.Category.get({idDictionary:this.idDictionary,id:this.idCategory}).then(e=>{this.dictionary=r[0],this.categories=Object.values(r[1]),this.entries=Object.values(r[2]),this.createForm(this.idDictionary,this.idCategory,this.entries)})})}ngOnDestroy(){delete this.entries,delete this.dictionary,delete this.categories,delete this.formGroup,delete this.entryArray,delete this.idCategory,delete this.idDictionary,console.log("DESTROY!")}submitForm(){const r=this.getValues();this.api.Entry.saveByCategory({idDictionary:this.idDictionary,idCategory:this.idCategory,entries:r.entries}).then(e=>{e?this.router.navigate(["/dictionary/",this.idDictionary]):console.log("THERE WAS AN ERROR! (SubmitForm)")})}}return u.\u0275fac=function(r){return new(r||u)(n.Y36(j.F0),n.Y36(j.gz),n.Y36(V.s),n.Y36(T.qu),n.Y36(ft.Z),n.Y36(K))},u.\u0275cmp=n.Xpm({type:u,selectors:[["app-list"]],hostBindings:function(r,e){1&r&&n.NdJ("blur",function(i){return e.onBlur(i)})},features:[n.qOj],decls:27,vars:5,consts:[["actionButtons",""],["footerButtons",""],[4,"ngTemplateOutlet"],["id","formGroup",3,"submit"],["type","hidden","name","idDictionary",3,"ngModel","ngModelChange"],["type","hidden","name","idCategory",3,"ngModel","ngModelChange"],[1,"table","is-stripede","is-fullwidth"],[1,"tableContent"],[4,"ngFor","ngForOf"],[1,"columns","actionButtons"],[1,"column"],[1,"button","is-info",3,"click"],[3,"ngClass"],[3,"name","ngModel","change","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["type","hidden",3,"name","ngModel","change","ngModelChange"],["type","text",1,"input",3,"name","ngModel","change","ngModelChange"],["rows","1",1,"textarea",3,"name","ngModel","change","ngModelChange"],[1,"icon","is-large"],[1,"fas","fa-exclamation-triangle"],["type","checkbox","value","1",1,"hidden",3,"name","ngModel","change","ngModelChange"],[1,"fas","fa-times"],[3,"value"]],template:function(r,e){if(1&r&&(n.YNc(0,J,2,0,"ng-template",null,0,n.W1O),n.YNc(2,tt,7,0,"ng-template",null,1,n.W1O),n.YNc(4,et,1,0,"ng-container",2),n.TgZ(5,"div")(6,"form",3),n.NdJ("submit",function(){return e.submitForm()}),n.TgZ(7,"input",4),n.NdJ("ngModelChange",function(i){return e.idDictionary=i}),n.qZA(),n.TgZ(8,"input",5),n.NdJ("ngModelChange",function(i){return e.idCategory=i}),n.qZA(),n.TgZ(9,"table",6)(10,"thead")(11,"tr")(12,"th"),n._uU(13,"Category"),n.qZA(),n.TgZ(14,"th"),n._uU(15,"Original"),n.qZA(),n.TgZ(16,"th"),n._uU(17,"Translated"),n.qZA(),n.TgZ(18,"th"),n._uU(19,"Description"),n.qZA(),n.TgZ(20,"th"),n._uU(21,"Reset"),n.qZA(),n.TgZ(22,"th"),n._uU(23,"Delete"),n.qZA()()(),n.TgZ(24,"tbody",7),n.YNc(25,ct,21,22,"ng-container",8),n.qZA()()()(),n.YNc(26,X,1,0,"ng-container",2)),2&r){const t=n.MAs(3);n.xp6(4),n.Q6J("ngTemplateOutlet",t),n.xp6(3),n.Q6J("ngModel",e.idDictionary),n.xp6(1),n.Q6J("ngModel",e.idCategory),n.xp6(17),n.Q6J("ngForOf",e.formEntries),n.xp6(1),n.Q6J("ngTemplateOutlet",t)}},directives:[Y.tP,T._Y,T.JL,T.F,T.Fj,T.JJ,T.On,Y.sg,Y.mk,T.EJ,T.YN,T.Kr,T.Wl],styles:[".actionButtons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .actionButtons[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{text-align:center;width:100%}.hidden[_ngcontent-%COMP%]{display:none}.tableContent[_ngcontent-%COMP%]   .changed[_ngcontent-%COMP%]{background-color:green}.tableContent[_ngcontent-%COMP%]   .new[_ngcontent-%COMP%]{background-color:#00f}.tableContent[_ngcontent-%COMP%]   .deleted[_ngcontent-%COMP%]{background-color:red}"]}),u})(),data:{title:"List Entries"}},{path:"**",redirectTo:""}];let ht=(()=>{class u{}return u.\u0275fac=function(r){return new(r||u)},u.\u0275mod=n.oAB({type:u}),u.\u0275inj=n.cJS({imports:[[j.Bz.forChild(pt)],j.Bz]}),u})(),dt=(()=>{class u{}return u.\u0275fac=function(r){return new(r||u)},u.\u0275mod=n.oAB({type:u}),u.\u0275inj=n.cJS({imports:[[Y.ez,ht,T.u5,T.UX]]}),u})()},3028:function(_t,at){var I,j;I=function W(){"use strict";var n=typeof self<"u"?self:typeof window<"u"?window:void 0!==n?n:{},T=!n.document&&!!n.postMessage,rt=T&&/blob:/i.test((n.location||{}).protocol),V={},ft=0,l={parse:function(e,t){var i=(t=t||{}).dynamicTyping||!1;if(r(i)&&(t.dynamicTypingFunction=i,i={}),t.dynamicTyping=i,t.transform=!!r(t.transform)&&t.transform,t.worker&&l.WORKERS_SUPPORTED){var s=function(){if(!l.WORKERS_SUPPORTED)return!1;var A,x,p=(A=n.URL||n.webkitURL||null,x=W.toString(),l.BLOB_URL||(l.BLOB_URL=A.createObjectURL(new Blob(["(",x,")();"],{type:"text/javascript"})))),g=new n.Worker(p);return g.onmessage=pt,g.id=ft++,V[g.id]=g}();return s.userStep=t.step,s.userChunk=t.chunk,s.userComplete=t.complete,s.userError=t.error,t.step=r(t.step),t.chunk=r(t.chunk),t.complete=r(t.complete),t.error=r(t.error),delete t.worker,void s.postMessage({input:e,config:t,workerId:s.id})}var o=null;return"string"==typeof e?o=t.download?new tt(t):new G(t):!0===e.readable&&r(e.read)&&r(e.on)?o=new nt(t):(n.File&&e instanceof File||e instanceof Object)&&(o=new et(t)),o.stream(e)},unparse:function(e,t){var i=!1,s=!0,o=",",p="\r\n",g='"',A=g+g,x=!1,c=null,b=!1;!function(){if("object"==typeof t){if("string"!=typeof t.delimiter||l.BAD_DELIMITERS.filter(function(a){return-1!==t.delimiter.indexOf(a)}).length||(o=t.delimiter),("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(i=t.quotes),"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(x=t.skipEmptyLines),"string"==typeof t.newline&&(p=t.newline),"string"==typeof t.quoteChar&&(g=t.quoteChar),"boolean"==typeof t.header&&(s=t.header),Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");c=t.columns}void 0!==t.escapeChar&&(A=t.escapeChar+g),("boolean"==typeof t.escapeFormulae||t.escapeFormulae instanceof RegExp)&&(b=t.escapeFormulae instanceof RegExp?t.escapeFormulae:/^[=+\-@\t\r].*$/)}}();var d=new RegExp(X(g),"g");if("string"==typeof e&&(e=JSON.parse(e)),Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return U(null,e,x);if("object"==typeof e[0])return U(c||Object.keys(e[0]),e,x)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||c),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),U(e.fields||[],e.data||[],x);throw new Error("Unable to serialize unrecognized input");function U(a,v,L){var k="";"string"==typeof a&&(a=JSON.parse(a)),"string"==typeof v&&(v=JSON.parse(v));var S=Array.isArray(a)&&0<a.length,O=!Array.isArray(v[0]);if(S&&s){for(var R=0;R<a.length;R++)0<R&&(k+=o),k+=D(a[R],R);0<v.length&&(k+=p)}for(var h=0;h<v.length;h++){var C=S?a.length:v[h].length,E=!1,w=S?0===Object.keys(v[h]).length:0===v[h].length;if(L&&!S&&(E="greedy"===L?""===v[h].join("").trim():1===v[h].length&&0===v[h][0].length),"greedy"===L&&S){for(var _=[],y=0;y<C;y++)_.push(v[h][O?a[y]:y]);E=""===_.join("").trim()}if(!E){for(var f=0;f<C;f++)0<f&&!w&&(k+=o),k+=D(v[h][S&&O?a[f]:f],f);h<v.length-1&&(!L||0<C&&!w)&&(k+=p)}}return k}function D(a,v){if(null==a)return"";if(a.constructor===Date)return JSON.stringify(a).slice(1,25);var L=!1;b&&"string"==typeof a&&b.test(a)&&(a="'"+a,L=!0);var k=a.toString().replace(d,A);return(L=L||!0===i||"function"==typeof i&&i(a,v)||Array.isArray(i)&&i[v]||function(S,O){for(var R=0;R<O.length;R++)if(-1<S.indexOf(O[R]))return!0;return!1}(k,l.BAD_DELIMITERS)||-1<k.indexOf(o)||" "===k.charAt(0)||" "===k.charAt(k.length-1))?g+k+g:k}}};if(l.RECORD_SEP=String.fromCharCode(30),l.UNIT_SEP=String.fromCharCode(31),l.BYTE_ORDER_MARK="\ufeff",l.BAD_DELIMITERS=["\r","\n",'"',l.BYTE_ORDER_MARK],l.WORKERS_SUPPORTED=!T&&!!n.Worker,l.NODE_STREAM_INPUT=1,l.LocalChunkSize=10485760,l.RemoteChunkSize=5242880,l.DefaultDelimiter=",",l.Parser=ut,l.ParserHandle=ct,l.NetworkStreamer=tt,l.FileStreamer=et,l.StringStreamer=G,l.ReadableStreamStreamer=nt,n.jQuery){var K=n.jQuery;K.fn.parse=function(e){var t=e.config||{},i=[];return this.each(function(p){if("INPUT"!==K(this).prop("tagName").toUpperCase()||"file"!==K(this).attr("type").toLowerCase()||!n.FileReader||!this.files||0===this.files.length)return!0;for(var g=0;g<this.files.length;g++)i.push({file:this.files[g],inputElem:this,instanceConfig:K.extend({},t)})}),s(),this;function s(){if(0!==i.length){var g,A,x,c=i[0];if(r(e.before)){var b=e.before(c.file,c.inputElem);if("object"==typeof b){if("abort"===b.action)return"AbortError",g=c.file,A=c.inputElem,x=b.reason,void(r(e.error)&&e.error({name:"AbortError"},g,A,x));if("skip"===b.action)return void o();"object"==typeof b.config&&(c.instanceConfig=K.extend(c.instanceConfig,b.config))}else if("skip"===b)return void o()}var d=c.instanceConfig.complete;c.instanceConfig.complete=function(U){r(d)&&d(U,c.file,c.inputElem),o()},l.parse(c.file,c.instanceConfig)}else r(e.complete)&&e.complete()}function o(){i.splice(0,1),s()}}}function J(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(t){var i=u(t);i.chunkSize=parseInt(i.chunkSize),t.step||t.chunk||(i.chunkSize=null),this._handle=new ct(i),(this._handle.streamer=this)._config=i}.call(this,e),this.parseChunk=function(t,i){if(this.isFirstChunk&&r(this._config.beforeFirstChunk)){var s=this._config.beforeFirstChunk(t);void 0!==s&&(t=s)}this.isFirstChunk=!1,this._halted=!1;var o=this._partialLine+t;this._partialLine="";var p=this._handle.parse(o,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var g=p.meta.cursor;this._finished||(this._partialLine=o.substring(g-this._baseIndex),this._baseIndex=g),p&&p.data&&(this._rowCount+=p.data.length);var A=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(rt)n.postMessage({results:p,workerId:l.WORKER_ID,finished:A});else if(r(this._config.chunk)&&!i){if(this._config.chunk(p,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);p=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(p.data),this._completeResults.errors=this._completeResults.errors.concat(p.errors),this._completeResults.meta=p.meta),this._completed||!A||!r(this._config.complete)||p&&p.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),A||p&&p.meta.paused||this._nextChunk(),p}this._halted=!0},this._sendError=function(t){r(this._config.error)?this._config.error(t):rt&&this._config.error&&n.postMessage({workerId:l.WORKER_ID,error:t,finished:!1})}}function tt(e){var t;(e=e||{}).chunkSize||(e.chunkSize=l.RemoteChunkSize),J.call(this,e),this._nextChunk=T?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(i){this._input=i,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),T||(t.onload=m(this._chunkLoaded,this),t.onerror=m(this._chunkError,this)),t.open(this._config.downloadRequestBody?"POST":"GET",this._input,!T),this._config.downloadRequestHeaders){var i=this._config.downloadRequestHeaders;for(var s in i)t.setRequestHeader(s,i[s])}this._config.chunkSize&&t.setRequestHeader("Range","bytes="+this._start+"-"+(this._start+this._config.chunkSize-1));try{t.send(this._config.downloadRequestBody)}catch(p){this._chunkError(p.message)}T&&0===t.status&&this._chunkError()}},this._chunkLoaded=function(){var s;4===t.readyState&&(t.status<200||400<=t.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:t.responseText.length,this._finished=!this._config.chunkSize||this._start>=(null===(s=t.getResponseHeader("Content-Range"))?-1:parseInt(s.substring(s.lastIndexOf("/")+1))),this.parseChunk(t.responseText)))},this._chunkError=function(i){this._sendError(new Error(t.statusText||i))}}function et(e){var t,i;(e=e||{}).chunkSize||(e.chunkSize=l.LocalChunkSize),J.call(this,e);var s=typeof FileReader<"u";this.stream=function(o){this._input=o,i=o.slice||o.webkitSlice||o.mozSlice,s?((t=new FileReader).onload=m(this._chunkLoaded,this),t.onerror=m(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var o=this._input;if(this._config.chunkSize){var p=Math.min(this._start+this._config.chunkSize,this._input.size);o=i.call(o,this._start,p)}var g=t.readAsText(o,this._config.encoding);s||this._chunkLoaded({target:{result:g}})},this._chunkLoaded=function(o){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(o.target.result)},this._chunkError=function(){this._sendError(t.error)}}function G(e){var t;J.call(this,e=e||{}),this.stream=function(i){return t=i,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var i,s=this._config.chunkSize;return s?(i=t.substring(0,s),t=t.substring(s)):(i=t,t=""),this._finished=!t,this.parseChunk(i)}}}function nt(e){J.call(this,e=e||{});var t=[],i=!0,s=!1;this.pause=function(){J.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){J.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(o){this._input=o,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){s&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):i=!0},this._streamData=m(function(o){try{t.push("string"==typeof o?o:o.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(p){this._streamError(p)}},this),this._streamError=m(function(o){this._streamCleanUp(),this._sendError(o)},this),this._streamEnd=m(function(){this._streamCleanUp(),s=!0,this._streamData("")},this),this._streamCleanUp=m(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function ct(e){var t,i,s,o=Math.pow(2,53),p=-o,g=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,A=/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/,x=this,c=0,b=0,d=!1,U=!1,D=[],a={data:[],errors:[],meta:{}};if(r(e.step)){var v=e.step;e.step=function(h){if(a=h,S())k();else{if(k(),0===a.data.length)return;c+=h.data.length,e.preview&&c>e.preview?i.abort():(a.data=a.data[0],v(a,x))}}}function L(h){return"greedy"===e.skipEmptyLines?""===h.join("").trim():1===h.length&&0===h[0].length}function k(){return a&&s&&(R("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+l.DefaultDelimiter+"'"),s=!1),e.skipEmptyLines&&(a.data=a.data.filter(function(h){return!L(h)})),S()&&function(){if(a)if(Array.isArray(a.data[0])){for(var C=0;S()&&C<a.data.length;C++)a.data[C].forEach(h);a.data.splice(0,1)}else a.data.forEach(h);function h(E,w){r(e.transformHeader)&&(E=e.transformHeader(E,w)),D.push(E)}}(),function(){if(!a||!e.header&&!e.dynamicTyping&&!e.transform)return a;function h(E,w){var _,y=e.header?{}:[];for(_=0;_<E.length;_++){var M=_,f=E[_];e.header&&(M=_>=D.length?"__parsed_extra":D[_]),e.transform&&(f=e.transform(f,M)),f=O(M,f),"__parsed_extra"===M?(y[M]=y[M]||[],y[M].push(f)):y[M]=f}return e.header&&(_>D.length?R("FieldMismatch","TooManyFields","Too many fields: expected "+D.length+" fields but parsed "+_,b+w):_<D.length&&R("FieldMismatch","TooFewFields","Too few fields: expected "+D.length+" fields but parsed "+_,b+w)),y}var C=1;return!a.data.length||Array.isArray(a.data[0])?(a.data=a.data.map(h),C=a.data.length):a.data=h(a.data,0),e.header&&a.meta&&(a.meta.fields=D),b+=C,a}()}function S(){return e.header&&0===D.length}function O(h,C){return E=h,e.dynamicTypingFunction&&void 0===e.dynamicTyping[E]&&(e.dynamicTyping[E]=e.dynamicTypingFunction(E)),!0===(e.dynamicTyping[E]||e.dynamicTyping)?"true"===C||"TRUE"===C||"false"!==C&&"FALSE"!==C&&(function(w){if(g.test(w)){var _=parseFloat(w);if(p<_&&_<o)return!0}return!1}(C)?parseFloat(C):A.test(C)?new Date(C):""===C?null:C):C;var E}function R(h,C,E,w){var _={type:h,code:C,message:E};void 0!==w&&(_.row=w),a.errors.push(_)}this.parse=function(h,C,E){if(e.newline||(e.newline=function(M,f){M=M.substring(0,1048576);var H=new RegExp(X(f)+"([^]*?)"+X(f),"gm"),z=(M=M.replace(H,"")).split("\r"),N=M.split("\n");if(1===z.length||1<N.length&&N[0].length<z[0].length)return"\n";for(var q=0,P=0;P<z.length;P++)"\n"===z[P][0]&&q++;return q>=z.length/2?"\r\n":"\r"}(h,e.quoteChar||'"')),s=!1,e.delimiter)r(e.delimiter)&&(e.delimiter=e.delimiter(h),a.meta.delimiter=e.delimiter);else{var _=function(M,f,H,z,N){var Q,q,P,F;N=N||[",","\t","|",";",l.RECORD_SEP,l.UNIT_SEP];for(var $=0;$<N.length;$++){var Z=N[$],it=0,B=0,gt=0;P=void 0;for(var st=new ut({comments:z,delimiter:Z,newline:f,preview:10}).parse(M),lt=0;lt<st.data.length;lt++)if(H&&L(st.data[lt]))gt++;else{var ot=st.data[lt].length;B+=ot,void 0!==P?0<ot&&(it+=Math.abs(ot-P),P=ot):P=ot}0<st.data.length&&(B/=st.data.length-gt),(void 0===q||it<=q)&&(void 0===F||F<B)&&1.99<B&&(q=it,Q=Z,F=B)}return{successful:!!(e.delimiter=Q),bestDelimiter:Q}}(h,e.newline,e.skipEmptyLines,e.comments,e.delimitersToGuess);_.successful?e.delimiter=_.bestDelimiter:(s=!0,e.delimiter=l.DefaultDelimiter),a.meta.delimiter=e.delimiter}var y=u(e);return e.preview&&e.header&&y.preview++,t=h,i=new ut(y),a=i.parse(t,C,E),k(),d?{meta:{paused:!0}}:a||{meta:{paused:!1}}},this.paused=function(){return d},this.pause=function(){d=!0,i.abort(),t=r(e.chunk)?"":t.substring(i.getCharIndex())},this.resume=function(){x.streamer._halted?(d=!1,x.streamer.parseChunk(t,!0)):setTimeout(x.resume,3)},this.aborted=function(){return U},this.abort=function(){U=!0,i.abort(),a.meta.aborted=!0,r(e.complete)&&e.complete(a),t=""}}function X(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ut(e){var t,i=(e=e||{}).delimiter,s=e.newline,o=e.comments,p=e.step,g=e.preview,A=e.fastMode,x=t=e.quoteChar??'"';if(void 0!==e.escapeChar&&(x=e.escapeChar),("string"!=typeof i||-1<l.BAD_DELIMITERS.indexOf(i))&&(i=","),o===i)throw new Error("Comment character same as delimiter");!0===o?o="#":("string"!=typeof o||-1<l.BAD_DELIMITERS.indexOf(o))&&(o=!1),"\n"!==s&&"\r"!==s&&"\r\n"!==s&&(s="\n");var c=0,b=!1;this.parse=function(d,U,D){if("string"!=typeof d)throw new Error("Input must be a string");var a=d.length,v=i.length,L=s.length,k=o.length,S=r(p),O=[],R=[],h=[],C=c=0;if(!d)return F();if(A||!1!==A&&-1===d.indexOf(t)){for(var E=d.split(s),w=0;w<E.length;w++){if(c+=(h=E[w]).length,w!==E.length-1)c+=s.length;else if(D)return F();if(!o||h.substring(0,k)!==o){if(S){if(O=[],N(h.split(i)),$(),b)return F()}else N(h.split(i));if(g&&g<=w)return O=O.slice(0,g),F(!0)}}return F()}for(var _=d.indexOf(i,c),y=d.indexOf(s,c),M=new RegExp(X(x)+X(t),"g"),f=d.indexOf(t,c);;)if(d[c]!==t)if(o&&0===h.length&&d.substring(c,c+k)===o){if(-1===y)return F();y=d.indexOf(s,c=y+L),_=d.indexOf(i,c)}else if(-1!==_&&(_<y||-1===y))h.push(d.substring(c,_)),_=d.indexOf(i,c=_+v);else{if(-1===y)break;if(h.push(d.substring(c,y)),P(y+L),S&&($(),b))return F();if(g&&O.length>=g)return F(!0)}else for(f=c,c++;;){if(-1===(f=d.indexOf(t,f+1)))return D||R.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:O.length,index:c}),q();if(f===a-1)return q(d.substring(c,f).replace(M,t));if(t!==x||d[f+1]!==x){if(t===x||0===f||d[f-1]!==x){-1!==_&&_<f+1&&(_=d.indexOf(i,f+1)),-1!==y&&y<f+1&&(y=d.indexOf(s,f+1));var H=Q(-1===y?_:Math.min(_,y));if(d.substr(f+1+H,v)===i){h.push(d.substring(c,f).replace(M,t)),d[c=f+1+H+v]!==t&&(f=d.indexOf(t,c)),_=d.indexOf(i,c),y=d.indexOf(s,c);break}var z=Q(y);if(d.substring(f+1+z,f+1+z+L)===s){if(h.push(d.substring(c,f).replace(M,t)),P(f+1+z+L),_=d.indexOf(i,c),f=d.indexOf(t,c),S&&($(),b))return F();if(g&&O.length>=g)return F(!0);break}R.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:O.length,index:c}),f++}}else f++}return q();function N(Z){O.push(Z),C=c}function Q(Z){var it=0;if(-1!==Z){var B=d.substring(f+1,Z);B&&""===B.trim()&&(it=B.length)}return it}function q(Z){return D||(void 0===Z&&(Z=d.substring(c)),h.push(Z),c=a,N(h),S&&$()),F()}function P(Z){c=Z,N(h),h=[],y=d.indexOf(s,c)}function F(Z){return{data:O,errors:R,meta:{delimiter:i,linebreak:s,aborted:b,truncated:!!Z,cursor:C+(U||0)}}}function $(){p(F()),O=[],R=[]}},this.abort=function(){b=!0},this.getCharIndex=function(){return c}}function pt(e){var t=e.data,i=V[t.workerId],s=!1;if(t.error)i.userError(t.error,t.file);else if(t.results&&t.results.data){var o={abort:function(){s=!0,ht(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:dt,resume:dt};if(r(i.userStep)){for(var p=0;p<t.results.data.length&&(i.userStep({data:t.results.data[p],errors:t.results.errors,meta:t.results.meta},o),!s);p++);delete t.results}else r(i.userChunk)&&(i.userChunk(t.results,o,t.file),delete t.results)}t.finished&&!s&&ht(t.workerId,t.results)}function ht(e,t){var i=V[e];r(i.userComplete)&&i.userComplete(t),i.terminate(),delete V[e]}function dt(){throw new Error("Not implemented.")}function u(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var i in e)t[i]=u(e[i]);return t}function m(e,t){return function(){e.apply(t,arguments)}}function r(e){return"function"==typeof e}return rt&&(n.onmessage=function(e){var t=e.data;if(void 0===l.WORKER_ID&&t&&(l.WORKER_ID=t.workerId),"string"==typeof t.input)n.postMessage({workerId:l.WORKER_ID,results:l.parse(t.input,t.config),finished:!0});else if(n.File&&t.input instanceof File||t.input instanceof Object){var i=l.parse(t.input,t.config);i&&n.postMessage({workerId:l.WORKER_ID,results:i,finished:!0})}}),(tt.prototype=Object.create(J.prototype)).constructor=tt,(et.prototype=Object.create(J.prototype)).constructor=et,(G.prototype=Object.create(G.prototype)).constructor=G,(nt.prototype=Object.create(J.prototype)).constructor=nt,l},void 0!==(j=I.apply(at,[]))&&(_t.exports=j)}}]);