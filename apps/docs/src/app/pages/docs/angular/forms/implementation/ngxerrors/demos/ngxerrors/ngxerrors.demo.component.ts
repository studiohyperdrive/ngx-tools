// snippet#component "Typescript"
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormAccessorComponent } from './form-accessor.component';
import { FormErrorComponent } from './error/error.component';
import { FormAccessorContainer, NgxFormsErrorsConfigurationToken } from '@ngx/forms';

@Component({
	imports: [CommonModule, ReactiveFormsModule, FormAccessorComponent],
	selector: 'ngxerrors-demo',
	templateUrl: 'ngxerrors.demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NgxFormsErrorsConfigurationToken,
			useValue: {
				errors: {
					required: 'This field is required',
					minlength: 'Too short',
					dependedDates: 'Something broke',
				},
				component: FormErrorComponent,
				showWhen: 'touched',
			},
		},
	],
})
export class NgxerrorsDemoComponent extends FormAccessorContainer {
	public readonly control = new FormControl();

	checkValues() {
		this.updateAllValueAndValidity(this.control);
	}

	disableForm() {
		this.control.disabled ? this.control.enable() : this.control.disable();
	}
}
// snippet#component

// snippet-from-file="./ngxerrors.demo.component.html" "HTML"
