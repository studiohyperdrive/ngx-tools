import { Component } from '@angular/core';
import { NgxModalAbstractComponent } from '@ngx/inform';

@Component({
	selector: 'test-modal',
	template: `
		<span id="test"> Hello world! </span>
		<button (click)="action.emit('Test')">Hello there!</button>
		<button (click)="close.emit()">Close</button>
	`,
	styles: `
		:host {
			display: block;
			background: white;
			border: 1px solid black;
			padding: 15px;
		}
	`,
	standalone: true,
})
export class ModalComponent extends NgxModalAbstractComponent<'Test'> {}
