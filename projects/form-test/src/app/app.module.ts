import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { FormAccessorComponent } from '../form-accessor/form-accessor.component';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent, FormAccessorComponent],
	imports: [BrowserModule, ReactiveFormsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
