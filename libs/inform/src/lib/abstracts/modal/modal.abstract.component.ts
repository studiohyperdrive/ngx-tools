import {
	AfterViewInit,
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	Inject,
	Input,
	Output,
	PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { NgxModalActionType } from '../../types';

/**
 * An abstract for the NgxModalService
 */
@Directive()
export class NgxModalAbstractComponent<ActionType extends NgxModalActionType, DataType = any>
	implements AfterViewInit
{
	/**
	 * Remove the modal on escape pressed
	 */
	@HostListener('document:keydown.escape') private onEscape() {
		this.close.emit();
	}

	/**
	 * An optional aria-labelledby property
	 */
	@Input() public ariaLabelledBy: string;

	/**
	 * An optional aria-describedBy property
	 */
	@Input() public ariaDescribedBy: string;

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

	constructor(
		@Inject(PLATFORM_ID) private platformId: string,
		private readonly elementRef: ElementRef<HTMLElement>
	) {}

	public ngAfterViewInit(): void {
		// Iben: If we are in the browser, check if either of the two accessibility labels are set
		if (isPlatformBrowser(this.platformId) && (this.ariaLabelledBy || this.ariaDescribedBy)) {
			// Iben: Find the element with the id and the parent
			const element = document.getElementById(this.ariaLabelledBy || this.ariaDescribedBy);
			const parent = this.elementRef.nativeElement;

			// Iben: If no corresponding element was found or if it isn't part of the modal, throw an error
			if (!element || !parent.contains(element)) {
				console.error(
					`NgxModalAbstractComponent: The ${
						this.ariaLabelledBy ? '"aria-labelledBy"' : 'aria-describedBy'
					} property was passed to the modal but no element with said id was found. Because of that, the necessary accessibility attributes could not be set. Please add an id with the value "${
						this.ariaLabelledBy || this.ariaDescribedBy
					}" to an element of the modal.`
				);
			}
		}
	}
}
