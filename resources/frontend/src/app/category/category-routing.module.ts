import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryModule } from '../entry';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
	{
		 path: 'list'
		,component: ListComponent
		,data: { title: 'List Categories' }
	},
	{
		 path: 'add'
		,component: AddComponent
		,data: { title: 'Add Categories' }
	},
	{
		 path: ':idCategory/edit'
		,component: EditComponent
		,data: { title: 'Edit Category' }
	},
	{
		 path: ':idCategory'
		,loadChildren: () => EntryModule
		,data: { title: 'View Category' }
	},
	{
		 path: '**'
		,redirectTo: 'list'
	}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
