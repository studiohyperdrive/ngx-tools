import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxValidators } from '@ngx/forms';

@Component({
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	selector: 'date-range-demo',
	templateUrl: 'date-range.demo.component.html',
})
export class DateRangeValidatorDemoComponent {
	form = new FormGroup({
		date: new FormControl('', [NgxValidators.dateRangeValidator('2019-01-01', '2019-01-05')]),
	});
}
