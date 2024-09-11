import { Injector, Type, ViewContainerRef } from '@angular/core';

import { Direction } from '@angular/cdk/bidi';
import { AutoFocusTarget } from '@angular/cdk/dialog';
import { NgxModalAbstractComponent } from '../abstracts';

export type NgxModalRole = 'dialog' | 'alertdialog';

// Aria configuration
interface NgxModalAriaLabelBaseOptions {
	label?: string;
	labelledById?: string;
}

interface NgxModalAriaLabelOptions extends NgxModalAriaLabelBaseOptions {
	label: string;
	labelledById?: undefined;
}

interface NgxModalAriaLabelledOptions extends NgxModalAriaLabelBaseOptions {
	label?: undefined;
	labelledById: string;
}
type NgxModalLabelAriaOptions = NgxModalAriaLabelOptions | NgxModalAriaLabelledOptions;

// CDKDialog configuration

interface NgxModalGlobalCDKConfiguration {
	closeOnNavigation?: boolean;
	direction?: Direction;
	hasBackdrop?: boolean;
	panelClass?: string | string[];
	autoClose?: boolean;
}

interface NgxModalCDKModalConfiguration {
	injector?: Injector;
	viewContainerRef?: ViewContainerRef;
	restoreFocus?: boolean | string | HTMLElement;
	autoFocus?: AutoFocusTarget | string | boolean;
}

// Global configuration

export interface NgxModalComponentConfiguration<DataType = any> {
	component: Type<NgxModalAbstractComponent>;
	role: NgxModalRole;
	data?: DataType;
}

interface NgxModalBaseConfiguration {
	modals?: Record<string, NgxModalComponentConfiguration & NgxModalGlobalCDKConfiguration>;
}

export type NgxModalConfiguration = NgxModalBaseConfiguration & NgxModalGlobalCDKConfiguration;

// Modal options
interface NgxModalBaseOptions<ActionsType extends string, DataType> {
	type?: string;
	component?: Type<NgxModalAbstractComponent<ActionsType>>;
	data?: DataType;
	onClose?: () => void;
	describedById?: string;
}

interface NgxModalTypeOptions<ActionsType extends string, DataType>
	extends NgxModalBaseOptions<ActionsType, DataType> {
	type: string;
	component?: undefined;
	role?: undefined;
}

interface NgxModalComponentOptions<ActionsType extends string, DataType>
	extends NgxModalBaseOptions<ActionsType, DataType> {
	type?: undefined;
	component: Type<NgxModalAbstractComponent<ActionsType>>;
	role: NgxModalRole;
}

export type NgxModalOptions<ActionsType extends string = string, DataType = any> =
	| (NgxModalTypeOptions<ActionsType, DataType> &
			NgxModalLabelAriaOptions &
			NgxModalGlobalCDKConfiguration &
			NgxModalCDKModalConfiguration)
	| (NgxModalComponentOptions<ActionsType, DataType> &
			NgxModalLabelAriaOptions &
			NgxModalGlobalCDKConfiguration &
			NgxModalCDKModalConfiguration);
