import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { IndexComponent } from './index/index.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { NovelComponent } from './novel/novel.component';

@NgModule({
  declarations: [IndexComponent, DictionaryComponent, NovelComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
