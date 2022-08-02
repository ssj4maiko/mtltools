import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Dictionary } from '../../_models/dictionary';
import { FormField, Option } from '../../_models/formField';
import { DictionaryCategory } from 'src/app/_models/dictionarycategory';
import { FormService } from '../form.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: '../../_views/form/form.component.html',
  styleUrls: ['../../_views/form/form.component.scss']
})

export class EditComponent extends FormService implements OnInit {

  formTitle: string;
  idDictionary: number;
  idCategory: number;
  category: DictionaryCategory;

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , public api: ApiService
    , public formBuilder: FormBuilder
  ) {
    super(formBuilder);
  }

  ngOnInit() {
    this.idDictionary = this.route.snapshot.params.idDictionary;
    this.idCategory = this.route.snapshot.params.idCategory;

    this.api.Category.get({ idDictionary: this.idDictionary, id: this.idCategory })
      .then((category: DictionaryCategory) => {
          this.category = category;
          this.setValues(category);
          this.getForm(false);
      });
  }

  submitForm(form: NgForm) {
    const values = this.getValues();
    this.api.Category.update({ idDictionary: this.idDictionary, id: this.idCategory, category: values.dictionaryCategory })
      .then(res => {
        this.goBack();
      }, (err) => {
        console.log(err);
      });
  }
  goBack() {
    this.router.navigate(['/dictionary',  this.idDictionary]);
  }

}
