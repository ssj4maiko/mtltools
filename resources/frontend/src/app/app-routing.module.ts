import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovelModule } from './novel';

const routes: Routes = [
	{
		 path: 'novel'
		,loadChildren: () => NovelModule
	},
	{
		 path: '**'
		,redirectTo: 'novel'
	},
];

@NgModule({
  	imports: [
		RouterModule.forRoot(
		 	routes
		 	//,{ enableTracing: true  }
		)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
