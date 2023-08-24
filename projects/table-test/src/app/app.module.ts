import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { NgxTableConfigToken, NgxTableModule } from 'table';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, NgxTableModule, ReactiveFormsModule, WrapperComponent],
	providers: [
		{
			provide: NgxTableConfigToken,
			useValue: { showDetailRow: 'on-single-item', showOpenRowState: true },
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
