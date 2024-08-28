import { Directive, HostBinding, HostListener, Input } from '@angular/core';

import { NgxTooltipPosition, NgxTooltipPositionClass } from '../../types';
import { NgxTooltipService } from '../../services';

@Directive()
export abstract class NgxTooltipAbstractComponent {
	/**
	 * Set tooltip as active
	 */
	@HostListener('mouseenter') showOnMouseEnter() {
		this.ngxTooltipService.setTooltipIsHovered(true);
	}

	/**
	 * Set the tooltip as inactive
	 */
	@HostListener('mouseleave') removeOnMouseOut() {
		this.ngxTooltipService.setTooltipIsHovered(false);
		this.ngxTooltipService.removeToolTip();
	}

	/**
	 * The role of the component
	 */
	@HostBinding('role') public readonly role = 'tooltip';

	/**
	 * The position class of the tooltip
	 */
	@HostBinding('class') @Input() public positionClass: NgxTooltipPositionClass;

	/**
	 * The id of the tooltip
	 */
	@HostBinding('id') @Input({ required: true }) public id: string;

	/**
	 * The current position of the tooltip
	 */
	@Input({ required: true }) public position: NgxTooltipPosition;

	/**
	 * The text of the tooltip
	 */
	@Input({ required: true }) public text: string;

	constructor(private readonly ngxTooltipService: NgxTooltipService) {}
}
