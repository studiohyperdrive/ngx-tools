import { Directive, ElementRef, HostBinding, HostListener, Input, Type } from '@angular/core';

import { NgxTooltipAbstractComponent } from '../../abstracts';
import { NgxTooltipPosition } from '../../types';
import { NgxTooltipService } from '../../services';

/**
 * A directive that adds a ARIA compliant tooltip to a component
 *
 * @export
 * @class NgxTooltipDirective
 */
@Directive({
	selector: '[ngxTooltip]',
	standalone: true,
})
export class NgxTooltipDirective {
	/**
	 * Show the tooltip on hover
	 */
	@HostListener('mouseenter') showOnMouseEnter() {
		this.tooltipService.setElementIsHovered(true);
		this.showTooltip();
	}

	/**
	 * Show the tooltip on focus
	 */
	@HostListener('focus') showOnFocus() {
		this.showTooltip();
	}

	/**
	 * Remove the tooltip on leaving hover
	 */
	@HostListener('mouseleave') removeOnMouseOut() {
		this.tooltipService.setElementIsHovered(false);
		this.removeTooltip();
	}

	/**
	 * Remove the tooltip on blur
	 */
	@HostListener('blur') removeOnBlur() {
		this.removeTooltip();
	}

	/**
	 * Remove the tooltip on escape pressed
	 */
	@HostListener('document:keydown.escape') onEscape() {
		this.tooltipService.removeToolTip(true);
	}

	/**
	 * Make the item tabbable
	 */
	@HostBinding('tabIndex') private readonly index = 0;

	/**
	 * The id of the tooltip, required for accessibility
	 */
	@HostBinding('attr.aria-describedby') @Input({ required: true }) public ngxTooltipId: string;

	/**
	 * The text of the tooltip
	 */
	@Input({ required: true }) public ngxTooltip: string;

	/**
	 * An optional component we can pass to replace the default configured component
	 */
	@Input() public ngxTooltipComponent: Type<NgxTooltipAbstractComponent>;

	/**
	 * An optional position we can pass to tooltip, by default this is 'above'.
	 */
	// Iben: The default is set in the NgxTooltipService
	@Input() public ngxTooltipPosition: NgxTooltipPosition;

	/**
	 * Prevent the tooltip from being shown, by default this is false.
	 */
	@Input() public ngxTooltipDisabled: boolean = false;

	constructor(
		private readonly tooltipService: NgxTooltipService,
		private readonly elementRef: ElementRef
	) {}

	/**
	 * Show the tooltip if it is not visible yet
	 */
	private showTooltip(): void {
		// Iben: Early exit when the tooltip is disabled
		if (this.ngxTooltipDisabled) {
			return;
		}

		// Iben: Show the tooltip
		this.tooltipService.showToolTip({
			text: this.ngxTooltip,
			position: this.ngxTooltipPosition,
			component: this.ngxTooltipComponent,
			elementRef: this.elementRef,
			id: this.ngxTooltipId,
		});
	}

	/**
	 * Remove the tooltip
	 */
	private removeTooltip(): void {
		this.tooltipService.removeToolTip();
	}
}
