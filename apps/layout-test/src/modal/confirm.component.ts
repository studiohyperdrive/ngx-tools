import { Component } from '@angular/core';
import { NgxModalAbstractComponent } from '@ngx/inform';

@Component({
	selector: 'confirm-modal',
	template: `
		Confirm this please
		<button (click)="action.emit('Confirm')">Confirm</button>
		<button (click)="close.emit()">Close</button>
	`,
	styleUrl: './modal.component.scss',
	standalone: true,
})
export class ConfirmModalComponent extends NgxModalAbstractComponent<'Confirm'> {}
