import { Component } from '@angular/core';
import { NgxModalAbstractComponent } from '@ngx/inform';

@Component({
	selector: 'test-modal',
	template: `
		Hello world!
		<button (click)="action.emit('Test')">Hello there!</button>
		<button (click)="close.emit()">Close</button>
	`,
	styleUrl: './modal.component.scss',
	standalone: true,
})
export class ModalComponent extends NgxModalAbstractComponent<'Test'> {}
