import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ChapterModule } from '../chapter';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
	{
		 path: 'list'
		,component: ListComponent
		,data: { title: 'List Novels' }
	},
	{
		 path: 'add'
		,component: AddComponent
		,data: { title: 'Add New Novel' }
	},
	{
		 path: 'edit/:idNovel'
		,component: EditComponent
		,data: { title: 'Edit Novel' }
	},
	{
		 path: ':idNovel'
		,loadChildren: () => ChapterModule
		,data: { title: 'View chapters' }
	},
	{
		 path: '**'
		,redirectTo: 'list'
	}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
    ,RouterModule.forChild(
    	routes
		//,{ enableTracing: true  }
    )
  ]
})
export class NovelRoutingModule { }
