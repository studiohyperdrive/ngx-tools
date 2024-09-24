import { Injector, Type, ViewContainerRef } from '@angular/core';

import { Direction } from '@angular/cdk/bidi';
import { AutoFocusTarget } from '@angular/cdk/dialog';
import { NgxModalAbstractComponent } from '../abstracts';

export type NgxModalRole = 'dialog' | 'alertdialog';

// Aria configuration
interface NgxModalAriaLabelBaseOptions {
	/**
	 * The label passed to the modal.
	 */
	label?: string;
	/**
	 * The ID of the element that labels the modal.
	 * From the [Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby):
	 *
	 * *It should reference brief text that provides the element with an accessible name.
	 * [...] a label describes the essence of an object.*
	 */
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
	/**
	 * Whether the modal should close on navigation.
	 */
	closeOnNavigation?: boolean;
	/**
	 * The direction of the modal.
	 */
	direction?: Direction;
	/**
	 * Whether the modal has a backdrop.
	 */
	hasBackdrop?: boolean;
	/**
	 * The class that should be applied to the modal.
	 */
	panelClass?: string | string[];
	/**
	 * Whether the modal should close when an event is fired.
	 */
	autoClose?: boolean;
}

interface NgxModalCDKModalConfiguration {
	/**
	 *  The Injector used for the instantiation of the component to be attached.
	 * If provided, takes precedence over the injector indirectly provided by
	 * the ViewContainerRef. This will allow for host-service injection to
	 * the component.
	 */
	injector?: Injector;
	/**
	 * Where the attached component should live in Angular's logical component tree.
	 * This affects what is available for injection and the change detection order
	 * for the component instantiated inside of the dialog. This does not affect
	 * where the dialog content will be rendered in the DOM.
	 */
	viewContainerRef?: ViewContainerRef;
	/**
	 * Whether the dialog should restore focus to the previously-focused element
	 * upon closing.
	 */
	restoreFocus?: boolean | string | HTMLElement;
	/**
	 * Where (or whether) the dialog should focus after it is opened.
	 */
	autoFocus?: AutoFocusTarget | string | boolean;
}

// Global configuration

export interface NgxModalComponentConfiguration<DataType = any> {
	/**
	 * The component that should be rendered as the modal. This component must extend the
	 * [`NgxModalAbstractComponent`](../abstracts/modal/modal.abstract.component.ts).
	 */
	component: Type<NgxModalAbstractComponent>;
	/**
	 * The role that should be applied to the modal.
	 *
	 * If the role is set to `alertdialog`, the modal indicates an alert or a message that
	 * requires user interaction (e.g. a dismiss / proceed dialog).
	 * If the role is set to `dialog`, the modal indicates a dialog that requires user
	 * attention, but no interaction. (e.g. an advertisement).
	 */
	role: NgxModalRole;
	/**
	 * The data that will be passed to the modal. This data will be accessible in the
	 * provided component.
	 */
	data?: DataType;
}

interface NgxModalBaseConfiguration {
	/**
	 * The global modals that were configured in the root of the application.
	 */
	modals?: Record<string, NgxModalComponentConfiguration & NgxModalGlobalCDKConfiguration>;
}

export type NgxModalConfiguration = NgxModalBaseConfiguration & NgxModalGlobalCDKConfiguration;

// Modal options
interface NgxModalBaseOptions<ActionsType extends string, DataType> {
	/**
	 * The name of a config object defined in the global config at the root of
	 * the project.
	 *
	 * If a `component` value is provided alongside a `type` in the local config, the
	 * `component` value will take precedence.
	 */
	type?: string;
	/**
	 * The component that should be rendered as the modal. This component must extend the
	 * [`NgxModalAbstractComponent`](../abstracts/modal/modal.abstract.component.ts).
	 *
	 * This property will take precedence over the `type` property.
	 */
	component?: Type<NgxModalAbstractComponent<ActionsType, DataType>>;
	/**
	 * The data that will be passed to the modal. This data will be accessible in the
	 * provided component.
	 */
	data?: DataType;
	/**
	 * The method that should be called when the modal is closed.
	 */
	onClose?: () => void;
	/**
	 * The ID of the element that describes the dialog.
	 * From the [Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby):
	 *
	 * *[...] [it] lists the ids of the descriptions or elements providing more information
	 * that the user might need.*
	 */
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
	/**
	 * The role that should be applied to the modal.
	 *
	 * If the role is set to `alertdialog`, the modal indicates an alert or a message that
	 * requires user interaction (e.g. a dismiss / proceed dialog).
	 * If the role is set to `dialog`, the modal indicates a dialog that requires user
	 * attention, but no interaction. (e.g. an advertisement).
	 */
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
