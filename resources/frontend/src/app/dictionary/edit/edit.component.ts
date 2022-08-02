import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Novel, Dictionary } from 'src/app/_models';
import { FormField, Meta, Option } from '../../_models/formField';
import { FormService } from '../form.service';

@Component({
  selector: 'app-dictionary-edit',
  templateUrl: '../../_views/form/form.component.html',
  styleUrls: ['../../_views/form/form.component.scss']
})
export class EditComponent extends FormService implements OnInit {

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

      this.api.Novel.getAll({ idDictionary: this.idDictionary })
          .then((selectedNovels: Novel[]) => {
            //console.log('SELECTED NOVELS', selectedNovels);
            this.dictionary = values[1];
            this.novels = values[2];
            this.loadMeta(values[0], values[2]);
            this.setValues(values[1], selectedNovels);
            this.getForm(false);
          });
    });
  }


  submitForm(form: NgForm) {
    const values = this.getValues(this.novels);
    //console.log('submitForm',values);
    this.api.Dictionary.update({ id: this.idDictionary, values })
      .then(res => {
        this.goBack();
      }, (err) => {
        console.log(err);
      });
  }

  goBack() {
    this.router.navigate(['/dictionary']);
  }
}
