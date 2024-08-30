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

interface NgxTooltipBaseEvent {
	source: 'tooltip' | 'element';
	id: string;
	active: boolean;
}
interface NgxTooltipInactiveEvent extends NgxTooltipBaseEvent {
	active: false;
}
interface NgxTooltipActiveElementEvent extends NgxTooltipBaseEvent {
	active: true;
	source: 'element';
	elementRef: ElementRef;
	component?: Type<NgxTooltipAbstractComponent>;
	position?: NgxTooltipPosition;
	text: string;
}

interface NgxTooltipActiveTooltipEvent extends NgxTooltipBaseEvent {
	active: true;
	source: 'tooltip';
}

export type NgxTooltipEvent =
	| NgxTooltipInactiveEvent
	| NgxTooltipActiveElementEvent
	| NgxTooltipActiveTooltipEvent;
