"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[592],{2414:(T,_,p)=>{p.d(_,{c:()=>d});class d{constructor(b,m){b&&Object.assign(this,b),m&&(this.idDictionary=m)}}},4868:(T,_,p)=>{function S(e,t,n,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(a=e[l])&&(o=(i<3?a(o):i>3?a(t,n,o):a(t,n))||o);return i>3&&o&&Object.defineProperty(t,n,o),o}function v(e,t){return function(n,r){t(n,r,e)}}p.d(_,{Wi:()=>j,Wx:()=>O});var g=p(4650),M=p(4006);let O=class{constructor(t,n=null,r=null){this.value=t,this.label=n,this.checked=r,this.label||(this.label=this.value),null!==this.checked&&(this.control=new M.NI(this.checked),this.control.setValue(this.checked))}setChecked(t){this.control.setValue(t)}};O=S([v(1,(0,g.FiY)()),v(2,(0,g.FiY)())],O);let j=class{constructor(t,n,r,i=[]){this.name=t,this.label=n,this.type=r,this.options=i}setOptions(t){this.options=t}getOption(t){for(const n of this.options)if(n.value===t)return n;return null}getValues(){return this.options.filter(t=>!!t.control.value).map(t=>t.value)}};j=S([v(3,(0,g.FiY)())],j)}}]);