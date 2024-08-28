import {
	ConnectedPosition,
	Overlay,
	OverlayPositionBuilder,
	OverlayRef,
} from '@angular/cdk/overlay';
import { Inject, Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';

import { NgxTooltipConfigurationToken } from '../../tokens';
import { NgxTooltipConfiguration, NgxTooltipItem, NgxTooltipPosition } from '../../types';

@Injectable({
	providedIn: 'root',
})
export class NgxTooltipService {
	/**
	 * The overlayRef used to attach the tooltip too
	 */
	private overlayRef: OverlayRef;

	/**
	 * Whether the tooltip is hovered or has focused
	 */
	private tooltipIsHovered: boolean = false;

	/**
	 * The position record for the tooltip
	 */
	private readonly positionRecord: Record<NgxTooltipPosition, ConnectedPosition> = {
		below: { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
		above: { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
		left: { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' },
		right: { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
	};

	constructor(
		@Inject(NgxTooltipConfigurationToken)
		private readonly configuration: NgxTooltipConfiguration,
		private readonly overlayService: Overlay,
		private readonly overlayPositionBuilder: OverlayPositionBuilder
	) {}

	/**
	 * Show a tooltip
	 *
	 * @param tooltip - The configuration of the tooltip
	 */
	public showToolTip(tooltip: NgxTooltipItem): void {
		// Iben: If no tooltip was provided or if we already have a tooltip attached, we early exit
		if (!tooltip || this.overlayRef?.hasAttached()) {
			return;
		}

		// Iben: Get the configuration of the tooltip
		const { text, component, position, elementRef, id } = tooltip;

		// Iben: Get the tooltip position. If no position was provided by the tooltip, we use the configured default, if none is configured we use 'above'
		const tooltipPosition = position || this.configuration.defaultPosition || 'above';

		// Iben: If the previous overlayRef still exists, we remove it
		if (!this.overlayRef) {
			this.overlayRef = this.overlayService.create({
				// Iben: Set the scroll strategy to reposition so that whenever the user scrolls, the tooltip is still near the element
				scrollStrategy: this.overlayService.scrollStrategies.reposition(),
			});
		}

		// Iben: Create the position of the overlay
		const positionStrategy = this.overlayPositionBuilder
			.flexibleConnectedTo(elementRef)
			.withPositions([this.positionRecord[tooltipPosition]]);

		// Iben: Update the position of the current overlayRef
		this.overlayRef.updatePositionStrategy(positionStrategy);

		// Iben: Create a new component portal
		const tooltipPortal = new ComponentPortal(component || this.configuration.component);

		// Iben: Attach the tooltipPortal to the overlayRef
		const tooltipRef = this.overlayRef.attach(tooltipPortal);

		// Iben: Pass the data to the component
		const tooltipComponent = tooltipRef.instance;

		tooltipComponent.text = text;
		tooltipComponent.position = tooltipPosition;
		tooltipComponent.positionClass = `ngx-tooltip-position-${tooltipPosition}`;
		tooltipComponent.id = id;
	}

	/**
	 * Indicate when a tooltip is being hovered over
	 *
	 * @param isHovered - Whether the tooltip is currently hovered over
	 */
	public setTooltipIsHovered(isHovered: boolean): void {
		this.tooltipIsHovered = isHovered;
	}

	/**
	 * Attempts to remove the tooltip
	 *
	 * @param force - Whether want to close the tooltip regardless of whether it is being hovered. By default this is false.
	 */
	public removeToolTip(force: boolean = false) {
		// Iben: If the tooltip is currently hovered, we don't remove the tooltip unless we force it
		if (!force && this.tooltipIsHovered) {
			return;
		}

		// Iben: Remove the tooltip
		this.overlayRef.detach();
	}
}
