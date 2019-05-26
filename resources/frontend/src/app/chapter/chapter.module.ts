import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChapterRoutingModule } from './chapter-routing.module';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
	declarations: [
		ListComponent,
		DetailComponent,
	],
	imports: [
		CommonModule,
		ChapterRoutingModule,
		RouterModule
	]
})
export class ChapterModule { }
