import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Novel } from '../../_models/novel';
import { FormField } from '../../_models/formField';

@Component({
	selector: 'app-novel-add',
	templateUrl: '../../_views/form/form.component.html',
	styleUrls: ['../../_views/form/form.component.css']
})
export class AddComponent implements OnInit {

	formTitle: string;
	formGroup: FormGroup;
	form: FormField[];

	constructor(
		 private router: Router
		,private route: ActivatedRoute
		,private api: ApiService
		,private formBuilder: FormBuilder
		) {
		this.form = [
			new FormField("code","Syosetsu code","text"),
			new FormField("nameOriginal","Original Name","text"),
			new FormField("nameCustom","Translated Name","text"),
			new FormField("addedBy","Added by","text"),
			new FormField("flagSyosetu","Is Syosetu?","checkbox"),
			new FormField("flagR18","R18?","checkbox"),
			new FormField("show","Show on list?","checkbox")
		];
	}

	ngOnInit() {
		this.formTitle = "Add new Novel";
		this.formGroup = this.formBuilder.group({
			 'code'			: [null]
			,'nameOriginal'	: [null]
			,'nameCustom'	: [null]
			,'addedBy'		: [null]
			,'flagSyosetu'	: [null]
			,'flagR18'		: [null]
			,'show'			: [null]
		});
	}

	submitForm(form:NgForm){
		console.log(form);
		this.api.addNovel(form)
			.subscribe(res => {
				console.log(res);
				let id = res['id'];
				this.router.navigate(['/novel/', id]);
			}, (err) => {
				console.log(err);
			});
	}
	goBack() {
		this.router.navigate(['/novel/list']);
	}


}
