import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
	{
		 path: 'list'
		,component: ListComponent
		,data: { title: 'List Chapter' }
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
