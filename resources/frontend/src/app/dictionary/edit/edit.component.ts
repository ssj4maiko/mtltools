import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Dictionary } from '../../_models/dictionary';
import { FormField, Option } from '../../_models/formField';

@Component({
	selector: 'app-dictionary-edit',
	templateUrl: '../../_views/form/form.component.html',
	styleUrls: ['../../_views/form/form.component.scss']
})
export class EditComponent implements OnInit {

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
		let options = [
			new Option('english')
		];
		console.log(options);
		this.form = [
			new FormField("id","id","hidden"),
			new FormField("idNovel","idNovel","hidden"),
			new FormField("language","Language","text")
		];
	}

	ngOnInit() {
		this.idNovel = this.route.snapshot.params['idNovel'];
		this.idDictionary = this.route.snapshot.params['idDictionary'];
		this.formTitle = "Edit Dictionary";

		this.formGroup = this.formBuilder.group({
            'id'		: [null]
			,'idNovel'	: [null]
			,'language'	: [null]
        });

        this.getDictionary();
	}

	getDictionary() {
		this.api.getDictionary(this.idNovel,this.idDictionary)
			.subscribe(data => {

				data = this.api.Dictionary(this.idNovel,this.idDictionary);

				this.formGroup.setValue({
					 id				: data.id
					,idNovel		: data.idNovel
					,language		: data.language
				});
			});
	}

	submitForm(form:NgForm){
		console.log(form);
		this.api.updateDictionary(this.idNovel, this.idDictionary,form)
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
