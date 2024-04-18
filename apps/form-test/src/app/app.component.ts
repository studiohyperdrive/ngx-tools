import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormAccessorContainer } from 'forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent extends FormAccessorContainer {
	public readonly control = new FormControl();

	checkValues() {
		this.updateAllValueAndValidity(this.control);
	}

	disableForm() {
		this.control.disabled ? this.control.enable() : this.control.disable();
	}
}
