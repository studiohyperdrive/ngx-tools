import { Type } from '@angular/core';
import { NgxTourStepComponent } from '../abstracts';
import { NgxTourStepOffset } from './tour.types';

/**
 * The token type for the tour provider
 */
export type NgxTourTokenType = Type<NgxTourStepComponent> | NgxTourTokenConfiguration;

/**
 * The configuration object to be passed as token to the tour provider
 */
export interface NgxTourTokenConfiguration {
	/**
	 * The component to be used as the tour step.
	 */
	component: Type<NgxTourStepComponent>;
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
	 *
	 * @inheritdoc NgxTourStep.offset
	 */
	offset: NgxTourStepOffset;
}
