import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DependedDatesComponent } from './depended-dates/depended-dates.component';
import { DateInputComponent } from './date-input/date-input.component';
import { FormAccessor, NgxFormsErrorsDirective, createAccessorProviders } from '@ngx/forms';

@Component({
	selector: 'app-form-accessor',
	templateUrl: 'form-accessor.component.html',
	providers: [createAccessorProviders(FormAccessorComponent)],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ReactiveFormsModule,
		NgxFormsErrorsDirective,
		DateInputComponent,
		DependedDatesComponent,
	],
})
export class FormAccessorComponent extends FormAccessor<any, any> {
	initForm() {
		return new FormGroup({
			hello: new FormControl(null, [Validators.required, Validators.email]),
			world: new FormControl(null, Validators.minLength(3)),
			date: new FormControl(null, Validators.required),
			dates: new FormControl(null),
		});
	}
}
