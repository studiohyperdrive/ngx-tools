import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DependedDatesComponent } from '../depended-dates/depended-dates.component';
import { DateInputComponent } from '../date-input/date-input.component';
import { FormAccessor, NgxFormsErrorsDirective, createAccessorProviders } from '@ngx/forms';

@Component({
    selector: 'app-form-accessor',
    template: ` <ng-container [formGroup]="form">
		<p>Hello</p>
		<input *ngxFormsErrors="'hello'" formControlName="hello" type="text" />

		<p>World</p>
		<input *ngxFormsErrors="'world'" formControlName="world" type="text" />

		<p>Date</p>
		<app-date-input *ngxFormsErrors="'date'" formControlName="date" />

		<p>Dates</p>
		<app-depended-dates formControlName="dates" />
	</ng-container>`,
    providers: [createAccessorProviders(FormAccessorComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        NgxFormsErrorsDirective,
        DateInputComponent,
        DependedDatesComponent,
    ]
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

	ngOnInit(): void {
		super.ngOnInit();

		this.form.get('world').statusChanges.subscribe(console.log);
	}
}
