import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryModule } from '../entry';

import { ListComponent } from './list/list.component';


const routes: Routes = [
	{
		 path: ''
		,component: ListComponent
		,data: { title: 'List Entries' }
	},
	{
		 path: '**'
		,redirectTo: ''
	}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule { }
