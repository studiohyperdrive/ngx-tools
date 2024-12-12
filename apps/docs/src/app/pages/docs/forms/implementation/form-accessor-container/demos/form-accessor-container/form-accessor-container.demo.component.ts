import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormAccessorComponent } from './form-accessor.component';
import { FormAccessorContainer } from '@ngx/forms';

// snippet#component "Typescript"
@Component({
	imports: [CommonModule, ReactiveFormsModule, FormAccessorComponent],
	selector: 'form-accessor-container-demo',
	templateUrl: 'form-accessor-container.demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAccessorContainerDemoComponent extends FormAccessorContainer {
	public readonly control = new FormControl();

	checkValues() {
		this.updateAllValueAndValidity(this.control);
	}

	disableForm() {
		this.control.disabled ? this.control.enable() : this.control.disable();
	}
}
// snippet#component

// snippet-from-file="./form-accessor-container.demo.component.html" "HTML"
