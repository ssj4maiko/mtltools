import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { DictionaryCategory } from '../../_models/dictionarycategory';
import { Dictionary } from '../../_models/dictionary';
import { FormField, Option } from '../../_models/formField';

@Component({
	selector: 'app-category-add',
	templateUrl: '../../_views/form/form.component.html',
	styleUrls: ['../../_views/form/form.component.scss']
})

export class AddComponent implements OnInit {

	formTitle: string;
	formGroup: FormGroup;
	form: FormField[];
	idDictionary:number;
	idNovel:number;

	constructor(
		 private router: Router
		,private route: ActivatedRoute
		,private api: ApiService
		,private formBuilder: FormBuilder
		) {
		this.form = [
			new FormField("idDictionary","idDictionary","hidden"),
			new FormField("name","Name","text")
		];
	}

	ngOnInit() {
		this.idNovel = this.route.snapshot.params['idNovel'];
		this.idDictionary = this.route.snapshot.params['idDictionary'];
		this.formTitle = "Add new Category";
		this.formGroup = this.formBuilder.group({
			 'idDictionary'	: [null]
			,'name'	: [null]
		});
	}

	submitForm(form:NgForm){
		console.log(form);
		this.api.addCategory(this.idDictionary,form)
			.subscribe(res => {
				console.log(res);
				let id = res['id'];
				this.router.navigate(['/novel/dictionary', this.idNovel, this.idDictionary]);
			}, (err) => {
				console.log(err);
			});
	}
	goBack() {
		this.router.navigate(['/novel/dictionary', this.idNovel, this.idDictionary]);
	}

}
