import { Component } from '@angular/core';
import { NgxFormsErrorAbstractComponent } from 'projects/forms/src/public-api';

@Component({
	selector: 'app-form-error',
	template: `Dit is de error: {{ errors[0] }}`,
	styleUrls: ['./error.component.scss'],
})
export class FormErrorComponent extends NgxFormsErrorAbstractComponent {}
