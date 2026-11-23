import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChapterRoutingModule } from './chapter-routing.module';

import { ListComponent } from './list/list.component';
import { DetailComponent, SafeHtmlPipe } from './detail/detail.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { KeyboardShortcutsModule } from '../_services/keyboard-shortcuts/keyboard-shortcuts';

@NgModule({
	declarations: [
		ListComponent,
		DetailComponent,
		SidebarComponent,
		SafeHtmlPipe,
	],
	imports: [
		CommonModule,
		ChapterRoutingModule,
        RouterModule,
		FormsModule,
		KeyboardShortcutsModule  
	]
})
export class ChapterModule { }
