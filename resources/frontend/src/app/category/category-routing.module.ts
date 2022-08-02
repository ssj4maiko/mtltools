import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryModule } from '../entry';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
     path: ''
    , component: ListComponent
    , data: { title: 'List Categories' }
  },
  {
     path: 'add'
    , component: AddComponent
    , data: { title: 'Add Categories', breadcrumb: 'Add Category' }
  },
  {
    path: 'edit/:idCategory'
    , component: EditComponent
    , data: { title: 'Edit Category', breadcrumb: 'Edit Category' }
  },
  {
     path: ':idCategory'
        , loadChildren: () => import('../entry').then(m => m.EntryModule)
    , data: { title: 'View Category', breadcrumb: 'Entries' }
  },
  {
     path: '**'
    , redirectTo: ''
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
