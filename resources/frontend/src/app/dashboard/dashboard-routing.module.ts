import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: ''
    , component: IndexComponent
    , data: { title: 'Dashboard', breadcrumb: 'Dashboard' }
  },
  {
    path: '**'
    , redirectTo: ''
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
