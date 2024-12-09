import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxModalAbstractComponent } from '@ngx/inform';

@Component({
	selector: 'confirm-modal',
	template: `
		Confirm this please
		<label for="confirm-modal-input">
			Set some data to be passed to the component that opened this modal:
		</label>
		<input id="confirm-modal-input" type="text" [formControl]="inputForm" />
		<button (click)="handleAction('Confirm')">Confirm</button>
		<button (click)="close.emit()">Close</button>
	`,
	styleUrl: './modal.component.scss',
	imports: [ReactiveFormsModule],
})
export class ConfirmModalComponent extends NgxModalAbstractComponent<{
	type: 'Confirm';
	data: string;
}> {
	public inputForm: FormControl = new FormControl('', Validators.required);

	handleAction(action: 'Confirm') {
		if (this.inputForm.invalid) {
			return;
		}

		this.action.emit({ type: action, data: this.inputForm.value });
	}
}
