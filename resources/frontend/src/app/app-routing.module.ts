import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovelModule } from './novel';
import { DictionaryModule } from './dictionary';
import { DashboardModule } from './dashboard';

const routes: Routes = [
  {
     path: 'dashboard'
    , loadChildren: './dashboard#DashboardModule'
    , data: { title: 'Dashboard', breadcrumb: 'Dashboard' }
  },
  {
     path: 'novel'
    , loadChildren: './novel#NovelModule'
    , data: { title: 'List Novels', breadcrumb: 'Novels' }
  },
  {
    path: 'dictionary'
    , loadChildren: './dictionary#DictionaryModule'
    , data: { title: 'List Dictionaries', breadcrumb: 'Dictionaries' }
  },
  {
     path: '**'
    , redirectTo: 'dashboard'
  },
];

@NgModule({
    imports: [
    RouterModule.forRoot(
       routes
       , { enableTracing: false  }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
