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
    dictionary: Dictionary;
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
        this.dictionary = this.api.Dictionary(this.idNovel, this.idDictionary);
        if(!this.dictionary){
            this.api.getDictionary(this.idNovel,this.idDictionary)
                    .subscribe(_ => {
                        this.dictionary = this.api.Dictionary(this.idNovel, this.idDictionary);
                        this.setFormValues();
                    });
        } else {
            this.setFormValues();
        }
    }
    setFormValues() {
        this.formGroup.setValue({
            id: this.dictionary.id
            , idNovel: this.dictionary.idNovel
            , language: this.dictionary.language
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
