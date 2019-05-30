import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Novel } from '../../_models/novel';
import { FormField } from '../../_models/formField';

@Component({
	selector: 'app-novel-edit',
	templateUrl: '../../_views/form/form.component.html',
	styleUrls: ['../../_views/form/form.component.css']
})
export class EditComponent implements OnInit {

	formTitle: string;
	formGroup: FormGroup;
	form: FormField[];
	idNovel: number;

	constructor(
		 private router: Router
		,private route: ActivatedRoute
		,private api: ApiService
		,private formBuilder: FormBuilder
		) {
		this.form = [
			new FormField("id","","hidden"),
			new FormField("code","Syosetsu code","text"),
			new FormField("nameOriginal","Original Name","text"),
			new FormField("nameCustom","Translated Name","text"),
			new FormField("flagSyosetu","Is Syosetu?","checkbox"),
			new FormField("flagR18","R18?","checkbox"),
			new FormField("show","Show on list?","checkbox")
		];
	}

	ngOnInit() {
		this.idNovel =this.route.snapshot.params['idNovel'];
		this.getNovel();

		this.formTitle = "Edit Novel";
		this.formGroup = this.formBuilder.group({
			 id				: [null]
			,code			: [null]
			,nameOriginal	: [null]
			,nameCustom		: [null]
			,addedBy		: [null]
			,flagSyosetu	: [null]
			,flagR18		: [null]
			,show			: [null]
		});
	}

	getNovel() {
		this.api.getNovel(this.idNovel)
			.subscribe(data => {

				data = this.api.Novel(this.idNovel);

				this.formGroup.setValue({
					 id				: data.id
					,code			: data.code
					,nameOriginal	: data.nameOriginal
					,nameCustom		: data.nameCustom
					,addedBy		: data.addedBy
					,flagSyosetu	: data.flagSyosetu
					,flagR18		: data.flagR18
					,show			: data.show
				});
			});
	}

	submitForm(form:NgForm){
		this.api.updateNovel(this.idNovel, form)
			.subscribe(res => {
				console.log(res);
				this.router.navigate(['/novel/list']);
			}, (err) => {
				console.log(err);
			});
	}
	goBack() {
		this.router.navigate(['/novel/list']);
	}

}
