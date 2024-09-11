import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

/**
 * An abstract for the NgxModalService
 */
@Directive()
export class NgxModalAbstractComponent<ActionType extends string = string, DataType = any> {
	/**
	 * Remove the modal on escape pressed
	 */
	@HostListener('document:keydown.escape') private onEscape() {
		this.close.emit();
	}

	/**
	 * Optional data that can be passed to the modal
	 */
	@Input() public data: DataType;

	/**
	 * An emitter that will emit an action we can later respond to
	 */
	@Output() public action: EventEmitter<ActionType> = new EventEmitter<ActionType>();

	/**
	 * An emitter that will emit if the modal is closed
	 */
	@Output() public close: EventEmitter<void> = new EventEmitter<void>();
}
