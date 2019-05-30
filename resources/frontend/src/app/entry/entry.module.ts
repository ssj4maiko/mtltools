import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryRoutingModule } from './entry-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

@NgModule({
	declarations: [AddComponent, EditComponent, ListComponent],
	imports: [
		CommonModule,
		EntryRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	]
})
export class EntryModule { }
