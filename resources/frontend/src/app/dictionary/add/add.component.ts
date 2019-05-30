import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Dictionary } from '../../_models/dictionary';
import { FormField, Option } from '../../_models/formField';

@Component({
	selector: 'app-dictionary-add',
	templateUrl: '../../_views/form/form.component.html',
	styleUrls: ['../../_views/form/form.component.css']
})
export class AddComponent implements OnInit {

	formTitle: string;
	formGroup: FormGroup;
	form: FormField[];
	idNovel:number;

	constructor(
		 private router: Router
		,private route: ActivatedRoute
		,private api: ApiService
		,private formBuilder: FormBuilder
		) {
		let options = [
			new Option('english')
		];
		this.form = [
			new FormField("idNovel","idNovel","hidden"),
			new FormField("language","Language","select",options)
		];
	}

	ngOnInit() {
		this.idNovel = this.route.snapshot.params['idNovel'];
		this.formTitle = "Add new Dictionary";
		this.formGroup = this.formBuilder.group({
			 'idNovel'	: [null]
			,'language'	: [null]
		});
	}

	submitForm(form:NgForm){
		console.log(form);
		this.api.addDictionary(this.idNovel,form)
			.subscribe(res => {
				console.log(res);
				let id = res['id'];
				this.router.navigate(['/novel/dictionary', this.idNovel]);
			}, (err) => {
				console.log(err);
			});
	}
	goBack() {
		this.router.navigate(['/novel/dictionary', this.idNovel]);
	}
}
