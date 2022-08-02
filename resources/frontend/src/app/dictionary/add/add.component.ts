import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Dictionary } from '../../_models/dictionary';
import { FormField, Meta, Option } from '../../_models/formField';
import { FormService } from '../form.service';
import { Novel } from 'src/app/_models';

@Component({
  selector: 'app-dictionary-add',
  templateUrl: '../../_views/form/form.component.html',
  styleUrls: ['../../_views/form/form.component.scss']
})
export class AddComponent extends FormService implements OnInit {

  formTitle: string;
  idDictionary: number;
  idNovel: number;
  dictionary: Dictionary;
  novels: Novel[];

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , public api: ApiService
    , public formBuilder: FormBuilder
  ) {
    super(formBuilder);
  }


  ngOnInit() {
    this.idNovel = this.route.snapshot.params.idNovel;
    this.idDictionary = this.route.snapshot.params.idDictionary;
    this.formTitle = 'Edit Dictionary';

    Promise.all([
      this.api.Meta.get('languages'),
      this.api.Dictionary.get({ id: this.idDictionary }),
      this.api.Novel.getAll(),
    ]).then((values: [Meta, Dictionary, Novel[]]) => {
        this.dictionary = values[1];
        this.novels = values[2];
        this.loadMeta(values[0], values[2]);
        if (this.idNovel) {
          this.api.Novel.get({id: this.idNovel})
              .then(novel => {
                this.setValues(null, [novel]);
              });
        }
        this.getForm(true);
    });
  }


  submitForm(form: NgForm) {
    const values = this.getValues(this.novels);
    this.api.Dictionary.add({ values })
      .then(res => {
        this.goBack();
      }, (err) => {
        console.log(err);
      });
  }
  LINK(idDictionary?: number, action?: string) {
    const base = [];
    if (this.idNovel) {
      base.push('novel');
      base.push(this.idNovel);
    }
    base.push('dictionary');
    if (action) {
      base.push(action);
    }
    if (idDictionary) {
      base.push(idDictionary);
    }
    this.router.navigate(base);
  }

  goBack() {
    this.LINK();
  }
}
