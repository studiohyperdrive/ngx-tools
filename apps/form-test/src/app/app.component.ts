import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { DateInputComponent } from '../date-input/date-input.component';
import { FormAccessorComponent } from '../form-accessor/form-accessor.component';
import { FormAccessorContainer } from '@ngx/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [FormAccessorComponent, ReactiveFormsModule, DateInputComponent, JsonPipe],
})
export class AppComponent extends FormAccessorContainer {
	public readonly control = new FormControl();

	public readonly form = new FormGroup({
		start: new FormControl(''),
		end: new FormControl(''),
	});

	checkValues() {
		this.updateAllValueAndValidity(this.control);
	}

	disableForm() {
		this.control.disabled ? this.control.enable() : this.control.disable();
	}
}
