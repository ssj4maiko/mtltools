import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule, 	// Necessary for API Services
		FormsModule,		// Necessary for Dynamic Forms
		ReactiveFormsModule,// Necessary for Dynamic Forms
		FontAwesomeModule,	// Necessary for SVG
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
