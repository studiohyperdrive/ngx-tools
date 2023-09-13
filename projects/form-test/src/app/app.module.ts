import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { FormAccessorComponent } from '../form-accessor/form-accessor.component';
import { FormErrorComponent } from '../error/error.component';
import { AppComponent } from './app.component';
import { NgxFormsErrorsModule } from 'projects/forms/src/lib/ngx-forms-errors.module';

@NgModule({
	declarations: [AppComponent, FormAccessorComponent, FormErrorComponent],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		NgxFormsErrorsModule.forRoot({
			errors: {
				required: 'Dit veld is verplicht',
				email: 'Dit veld is geen e-mail',
				minlength: 'Dit veld moet minstens 3 lang zijn',
			},
			component: FormErrorComponent,
			showWhen: 'touched',
		}),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
