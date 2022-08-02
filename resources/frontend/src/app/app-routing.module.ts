import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovelModule } from './novel';
import { DictionaryModule } from './dictionary';
import { DashboardModule } from './dashboard';

const routes: Routes = [
  {
     path: 'dashboard'
    , loadChildren: () => import('./dashboard').then(m => m.DashboardModule)
    , data: { title: 'Dashboard', breadcrumb: 'Dashboard' }
  },
  {
     path: 'novel'
    , loadChildren: () => import('./novel').then(m => m.NovelModule)
    , data: { title: 'List Novels', breadcrumb: 'Novels' }
  },
  {
    path: 'dictionary'
    , loadChildren: () => import('./dictionary').then(m => m.DictionaryModule)
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
