import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CategoryModule } from '../category';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
	{
		 path: 'list'
		,component: ListComponent
		,data: { title: 'List Dictionaries' }
	},
	{
		 path: 'add'
		,component: AddComponent
		,data: { title: 'Add Dictionaries' }
	},
	{
		 path: ':idDictionary/edit'
		,component: EditComponent
		,data: { title: 'Edit Dictionary' }
	},
	{
		 path: ':idDictionary'
		,loadChildren: () => CategoryModule
		,data: { title: 'View chapters' }
	},
	{
		 path: '**'
		,redirectTo: 'list'
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
