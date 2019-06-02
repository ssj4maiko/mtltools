import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryModule } from '../entry';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
	{
		 path: ''
		,component: ListComponent
		,data: { title: 'List Entries' }
	},
	{
		 path: 'add'
		,component: AddComponent
		,data: { title: 'Add Entry' }
	},
	{
		 path: ':idEntry/edit'
		,component: EditComponent
		,data: { title: 'Edit Entry' }
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
