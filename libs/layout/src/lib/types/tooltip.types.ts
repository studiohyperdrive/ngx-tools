import { ElementRef, Type } from '@angular/core';
import { NgxTooltipAbstractComponent } from '../abstracts';

export type NgxTooltipPosition = 'above' | 'below' | 'left' | 'right';

export type NgxTooltipPositionClass = `ngx-tooltip-position-${NgxTooltipPosition}`;

export interface NgxTooltipConfiguration {
	component: Type<NgxTooltipAbstractComponent>;
	defaultPosition?: NgxTooltipPosition;
}

export interface NgxTooltipItem {
	text: string;
	id: string;
	elementRef: ElementRef;
	component?: Type<NgxTooltipAbstractComponent>;
	position?: NgxTooltipPosition;
}
