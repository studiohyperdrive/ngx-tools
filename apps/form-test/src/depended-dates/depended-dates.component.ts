import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateInputComponent } from '../date-input/date-input.component';
import { DependedDatesValidator } from './depended-dates.validator';
import { FormAccessor, NgxFormsErrorsDirective, createAccessorProviders } from '@ngx/forms';

@Component({
    selector: 'app-depended-dates',
    templateUrl: './depended-dates.component.html',
    providers: [createAccessorProviders(DependedDatesComponent)],
    imports: [ReactiveFormsModule, DateInputComponent, NgxFormsErrorsDirective]
})
export class DependedDatesComponent extends FormAccessor<any, FormGroup<any>> {
	initForm(): FormGroup<any> {
		return new FormGroup(
			{
				hello: new FormGroup({
					start: new FormControl(''),
					end: new FormControl(''),
				}),
				world: new FormGroup({
					start: new FormControl(''),
					end: new FormControl(''),
				}),
			},
			DependedDatesValidator
		);
	}
}
