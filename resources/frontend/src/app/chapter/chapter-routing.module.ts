import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
     path: ''
    , component: ListComponent
    , data: { title: 'List Chapters' }
  },
  {
    path: 'dictionary'
    , loadChildren: () => import('../dictionary').then(m => m.DictionaryModule)
    , data: { title: 'View dictionary', breadcrumb: 'Dictionaries' }
  },
  {
     path: ':noChapter'
    , component: DetailComponent
    // ,loadChildren: () => ChapterModule
    , data: { title: 'View chapter', breadcrumb: 'View Chapter' }
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
export class ChapterRoutingModule { }
