import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Novel } from '../../_models/novel';
import { FormField, Meta, Option } from '../../_models/formField';
import { FormService } from '../form.service';
import { Dictionary } from 'src/app/_models/dictionary';

@Component({
  selector: 'app-novel-edit',
  templateUrl: '../../_views/form/form.component.html',
  styleUrls: ['../../_views/form/form.component.scss']
})
export class EditComponent extends FormService implements OnInit {

  formTitle: string;
  idNovel: number;
  novel: Novel;
  dictionaries: Dictionary[];

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

    this.formTitle = 'Edit Novel';

    Promise.all([
      this.api.Meta.get('drivers'),
      this.api.Novel.get({id : this.idNovel }),
      this.api.Dictionary.getAll({idNovel : this.idNovel}),
      this.api.Dictionary.getAll(),
    ]).then((values: [Meta, Novel, Dictionary[], Dictionary[]]) => {
      this.novel = values[1];
      this.dictionaries = values[2];
      this.loadMeta(values[0], values[3]);
      this.setValues(values[1], values[2]);
      this.getForm(false);
    });
  }
  submitForm(form: NgForm) {
    const values = this.getValues(this.dictionaries);
    this.api.Novel.update({ id: this.idNovel, values })
      .then(res => {
        this.goBack();
      }, (err) => {
        console.log(err);
      });
  }

  goBack() {
    this.router.navigate(['/novel']);
  }

}
