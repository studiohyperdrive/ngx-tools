import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormAccessorContainer } from '@ngx/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
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
