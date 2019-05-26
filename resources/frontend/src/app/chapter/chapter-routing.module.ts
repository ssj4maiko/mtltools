import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
	{
		 path: 'list'
		,component: ListComponent
		,data: { title: 'List Chapter' }
	},
	{
		 path: 'add'
		,component: AddComponent
		,data: { title: 'Add New Novel' }
	},
	{
		 path: 'edit/:noChapter'
		,component: EditComponent
		,data: { title: 'Edit Novel' }
	},
	{
		 path: ':noChapter'
		,component: DetailComponent
		//,loadChildren: () => ChapterModule
		,data: { title: 'View chapter' }
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
export class ChapterRoutingModule { }
