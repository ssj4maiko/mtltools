import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { DictionaryCategory } from '../../_models/dictionarycategory';
import { Dictionary } from '../../_models/dictionary';
import { FormField, Option } from '../../_models/formField';
import { FormService } from '../form.service';

@Component({
  selector: 'app-category-add',
  templateUrl: '../../_views/form/form.component.html',
  styleUrls: ['../../_views/form/form.component.scss']
})

export class AddComponent extends FormService implements OnInit {

  formTitle: string;
  idDictionary: number;

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
    this.formTitle = 'Add new Category';
    this.getForm(true);
  }

  submitForm(form: NgForm) {
    const values = this.getValues();
    this.api.Category.add({ idDictionary: this.idDictionary,  category: values.dictionaryCategory })
      .then(category => {
        this.router.navigate(['/dictionary', this.idDictionary, category.id]);
      }, (err) => {
        console.log(err);
      });
  }
  goBack() {
    this.router.navigate(['/dictionary', this.idDictionary]);
  }

}
