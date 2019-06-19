import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChapterRoutingModule } from './chapter-routing.module';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		ListComponent,
		DetailComponent,
		SidebarComponent,
	],
	imports: [
		CommonModule,
		ChapterRoutingModule,
        RouterModule,
        FormsModule
	]
})
export class ChapterModule { }
