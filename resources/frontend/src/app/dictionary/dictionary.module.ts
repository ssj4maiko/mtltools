import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictionaryRoutingModule } from './dictionary-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DiffComponent } from './diff/diff.component';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent, DiffComponent, ],
  imports: [
    CommonModule,
    DictionaryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DictionaryModule { }
