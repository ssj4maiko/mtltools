import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ChapterModule } from '../chapter';
import { DictionaryModule } from '../dictionary';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
     path: ''
    , component: ListComponent
    , data: { title: 'List Novels', breadcrumb: 'List' }
  },
  {
     path: 'add'
    , component: AddComponent
    , data: { title: 'Add New Novel', breadcrumb: 'Add Novel' }
  },
  {
     path: 'edit/:idNovel'
    , component: EditComponent
    , data: { title: 'Edit Novel', breadcrumb: 'Edit Novel' }
  },
  {
     path: ':idNovel'
    , loadChildren: () => import('../chapter').then(m => m.ChapterModule)
    , data: { title: 'View chapters', breadcrumb: 'Chapters' }
  },
  {
     path: '**'
    , redirectTo: ''
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
    , RouterModule.forChild(
      routes
    // ,{ enableTracing: true  }
    )
  ]// ,
  // exports : [ListComponent]
})
export class NovelRoutingModule { }
