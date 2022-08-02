import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Novel } from '../../_models/novel';
import { FormField, Meta } from '../../_models/formField';
import { Dictionary } from 'src/app/_models/dictionary';
import { FormService } from '../form.service';

@Component({
  selector: 'app-novel-add',
  templateUrl: '../../_views/form/form.component.html',
  styleUrls: ['../../_views/form/form.component.scss']
})
export class AddComponent extends FormService implements OnInit {

  formTitle: string;

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private api: ApiService
    , public formBuilder: FormBuilder
  ) {
    super(formBuilder);
  }

  ngOnInit() {
    this.formTitle = 'Add new Novel';
    Promise.all([
      this.api.Meta.get('drivers'),
      this.api.Dictionary.getAll(),
    ]).then((values: [Meta, Dictionary[]]) => {
      this.loadMeta(values[0], values[1]);
      this.getForm(true);
    });
  }

  submitForm(form: NgForm) {
    const values = this.getValues();
    this.api.Novel.add({ values })
      .then(res => {
        this.router.navigate(['/novel/', res.id]);
      }, (err) => {
        console.log(err);
      });
  }
  goBack() {
    this.router.navigate(['/novel']);
  }
}
