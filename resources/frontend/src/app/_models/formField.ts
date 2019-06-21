import { Injectable, Optional } from '@angular/core';


export class Option {
	constructor(
		public value:string,
		@Optional() public label:string = null,
	){
		if(!this.label){
			this.label = this.value;
		}
	}
}

export class FormField {
	constructor(
		public name: string,
		public label: string,
		public type: string,
		@Optional() public options: Option[] = [],
	){}
}