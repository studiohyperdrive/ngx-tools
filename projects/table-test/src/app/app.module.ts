import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgxTableConfigToken, NgxTableModule } from 'table';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, NgxTableModule, ReactiveFormsModule],
	providers: [
		{
			provide: NgxTableConfigToken,
			useValue: { showDetailRow: 'on-single-item' },
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
