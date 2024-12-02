import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxValidators } from '@ngx/forms';

@Component({
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	selector: 'has-no-future-date-demo',
	templateUrl: 'has-no-future-date.demo.component.html',
})
export class HasNoFutureDateValidatorDemoComponent {
	form = new FormGroup({
		date: new FormControl('', [NgxValidators.hasNoFutureDateValidator]),
	});
}
