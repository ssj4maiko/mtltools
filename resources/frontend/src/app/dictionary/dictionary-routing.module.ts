import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CategoryModule } from '../category';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DiffComponent } from './diff/diff.component';


const routes: Routes = [
  {
     path: ''
    , component: ListComponent
    , data: { title: 'List Dictionaries' }
  },
  {
     path: 'add'
    , component: AddComponent
    , data: { title: 'Add Dictionaries', breadcrumb: 'Add Dictionary' }
  },
  {
    path: 'edit/:idDictionary'
    , component: EditComponent
    , data: { title: 'Edit Dictionary', breadcrumb: 'Edit Dictionary' }
  },
  {
    path: 'diff/:idDictionary'
        , component: DiffComponent
    , data: { title: 'Diff Dictionary', breadcrumb: 'Diff' }
  },
  {
     path: ':idDictionary'
        , loadChildren: () => import('../category').then(m => m.CategoryModule)
    , data: { title: 'View categories', breadcrumb: 'View Categories' }
  },
  {
     path: '**'
    , redirectTo: ''
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(
      routes
    )
  ],
  exports: [RouterModule]
})
export class DictionaryRoutingModule { }
