import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Papa } from 'ngx-papaparse';

import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './_services/modal/modal.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SafeHtmlPipe } from './_pipes/safe-html.pipe';


library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SafeHtmlPipe,
    //Papa,    // Necessary for CSV
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 	// Necessary for API Services
    FormsModule,		// Necessary for Dynamic Forms
    ReactiveFormsModule, // Necessary for Dynamic Forms
    FontAwesomeModule,	// Necessary for SVG
    //Papa,    // Necessary for CSV
    KeyboardShortcutsModule.forRoot(),
    BrowserAnimationsModule
  ],
  exports: [
    //Papa,    // Necessary for CSV
  ],
  providers: [
        ModalComponent,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
