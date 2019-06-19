import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Dictionary } from '../../_models/dictionary';
import { FormField, Option } from '../../_models/formField';
import { DictionaryCategory } from 'src/app/_models/dictionarycategory';

@Component({
	selector: 'app-category-edit',
	templateUrl: '../../_views/form/form.component.html',
	styleUrls: ['../../_views/form/form.component.scss']
})

export class EditComponent implements OnInit {
    category: DictionaryCategory;
	formTitle: string;
	formGroup: FormGroup;
	form: FormField[];
	idCategory:number;
	idDictionary:number;
	idNovel:number;

	constructor(
		 private router: Router
		,private route: ActivatedRoute
		,private api: ApiService
		,private formBuilder: FormBuilder
		) {
		this.form = [
			new FormField("id","id","hidden"),
			new FormField("idDictionary","idDictionary","hidden"),
			new FormField("name","Name","text")
		];
	}

	ngOnInit() {
		this.idNovel = this.route.snapshot.params['idNovel'];
		this.idDictionary = this.route.snapshot.params['idDictionary'];
		this.idCategory = this.route.snapshot.params['idCategory'];
		this.formTitle = "Update Category";
		this.formGroup = this.formBuilder.group({
            'id'	: [null]
			,'idDictionary'	: [null]
			,'name'	: [null]
        });

        this.getCategory();
	}


	getCategory() {
        this.category = this.api.Category(this.idDictionary, this.idCategory);
        if(!this.category){
            this.api.getCategory(this.idNovel,this.idDictionary,this.idCategory)
			.subscribe(data => {
                this.category = this.api.Category(this.idDictionary,this.idCategory);
                this.setFormValues();
			});
        } else {
            this.setFormValues();
        }
    }
    setFormValues() {
        this.formGroup.setValue({
            id: this.category.id
            , idDictionary: this.category.idDictionary
            , name: this.category.name
        });
    }

	submitForm(form:NgForm){
		console.log(form);
		this.api.updateCategory(this.idNovel, this.idDictionary,this.idCategory,form)
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
