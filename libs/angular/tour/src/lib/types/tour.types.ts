import { Observable } from 'rxjs';
import { Type } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NgxTourStepComponent } from '../abstracts';
import { NgxTourItemDirective } from '../directives';

export type NgxTourDirection = 'next' | 'back';

export type NgxTourInteraction = NgxTourDirection | 'close';

export type NgxTourStepPosition = 'above' | 'below' | 'right' | 'left';

export type NgxTourRegistrationEvent = {
	tourItem: string;
	element?: NgxTourItemDirective;
	type: 'register' | 'unregister';
};

export interface NgxTourRouteOptions {
	route: string[];
	extras: NavigationExtras;
}
export interface NgxTourBackdropClipEvent {
	backdrop: HTMLElement;
	cutoutMargin: number;
	item?: HTMLElement;
}

export type NgxTourAction = (step: NgxTourStep, index: number) => void | Observable<unknown>;

export interface NgxTourStep<DataType = any> {
	/**
	 * The title we wish to display on the step.
	 */
	title: string;

	/**
	 * The content we wish to display on the step.
	 */
	content: string;

	/**
	 * Optional corresponding id of the element we wish to highlight. This is the string we pass to the `tourItem` directive.
	 */
	tourItem?: string;

	/**
	 * Optional position where we wish to render the tour step.
	 *
	 * By default, this is `below`.
	 */
	position?: NgxTourStepPosition;

	/**
	 * Optional extra data we wish to provide to the step
	 */
	data?: DataType;

	/**
	 * An optional amount of time we want to wait before showing the next step.
	 *
	 * By default this is 100 ms.
	 */
	delay?: number;

	/**
	 * An optional function that will be run right before a step becomes visible.
	 */
	beforeVisible?: NgxTourAction;

	/**
	 * An optional function that will be run right when a step becomes visible.
	 */
	onVisible?: NgxTourAction;

	/**
	 * An optional function that will be run when a step is no longer visible
	 */
	afterVisible?: NgxTourAction;

	/**
	 * An optional component to replace the default provided component within the tour step configuration.
	 */
	component?: Type<NgxTourStepComponent>;

	/**
	 * Whether we want to disable the backdrop
	 */
	disableBackDrop?: boolean;

	/**
	 * An optional padding we can set for the cutout around an element. By default, this is set to 5px.
	 * This will add some additional whitespace **within** the cutout.
	 *
	 * This is not the same as the `offset`, which is the whitespace **around** the highlighted element.
	 */
	cutoutMargin?: number;

	/**
	 * An optional class we can attach to the step
	 */
	stepClass?: string;

	/**
	 * Allow the highlighted element to have additional whitespace **around** the cutout on the y-axis.
	 * This is useful when the highlighted element is under a header or a footer.
	 *
	 * Even though it is possible to provide both a `top` and `bottom` offset, only one will be taken into
	 * account. If the vertical center of the cutout is closer to the top, the `top` offset will be used. If
	 * the vertical center of the cutout is closer to the bottom, the `bottom` offset will be used.
	 *
	 * Negative values are allowed. The step(card) will always be displayed within the viewport, even if
	 * the offset makes the cutout go out of the viewport.
	 *
	 * This is not the same as the `cutoutMargin`, which is the whitespace **within** the highlighted element.
	 */
	offset?: NgxTourStepOffset;
}

export type NgxTourStepOffset = {
	top?: number;
	bottom?: number;
};
