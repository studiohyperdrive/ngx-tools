import { Component } from '@angular/core';
import { NgxFormsErrorAbstractComponent } from '@ngx/forms';

@Component({
	selector: 'app-form-error',
	template: `This is the error: {{ errors[0] }}`,
	styleUrls: ['./error.component.scss'],
	standalone: true,
})
export class FormErrorComponent extends NgxFormsErrorAbstractComponent {}
