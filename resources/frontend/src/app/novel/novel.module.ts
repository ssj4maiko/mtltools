import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';

import { NovelRoutingModule } from './novel-routing.module';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

@NgModule({
	declarations: [
		ListComponent,
		AddComponent,
		EditComponent,
		DetailComponent,
	],
	imports: [
		CommonModule,
		NovelRoutingModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,	// Necessary for SVG
	]
})
export class NovelModule { }
