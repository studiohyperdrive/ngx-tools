import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxValidators } from '@ngx/forms';

@Component({
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	selector: 'chronological-dates-demo',
	templateUrl: 'chronological-dates.demo.component.html',
})
export class ChronologicalDatesValidatorDemoComponent {
	form = new FormGroup(
		{
			start: new FormControl(''),
			end: new FormControl(''),
		},
		NgxValidators.chronologicalDates('start', 'end')
	);
}
