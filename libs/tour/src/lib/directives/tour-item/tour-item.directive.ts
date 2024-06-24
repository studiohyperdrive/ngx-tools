import {
	AfterViewInit,
	ChangeDetectorRef,
	Directive,
	ElementRef,
	HostBinding,
	Input,
	OnDestroy,
} from '@angular/core';
import { NgxTourService } from '../../services';

/**
 * A directive to mark elements in the DOM to be highlighted during a tour
 */
@Directive({
	selector: '[tourItem]',
	standalone: true,
})
export class NgxTourItemDirective implements AfterViewInit, OnDestroy {
	/**
	 * A class added to the currently active item
	 */
	@HostBinding('class.ngx-tour-item-active') public isActive: boolean = false;

	/**
	 * The id of the item that corresponds with the step
	 */
	@Input() public tourItem: string;

	constructor(
		public readonly elementRef: ElementRef<any>,
		private readonly tourService: NgxTourService,
		private readonly cdRef: ChangeDetectorRef
	) {}

	/**
	 * Mark an element as active or inactive
	 *
	 * @param isActive - Whether or not the element should be active
	 */
	public setActive(isActive: boolean): void {
		// Iben: Mark the current item as active or inactive
		this.isActive = isActive;

		// Iben: Detect the changes on the component
		this.cdRef.detectChanges();
	}

	public ngAfterViewInit(): void {
		// Iben: Register the element when rendered
		this.tourService.registerElement(this);
	}

	public ngOnDestroy(): void {
		// Iben: Unregister the element when the element gets destroyed
		this.tourService.unregisterElement(this.tourItem);
	}
}
