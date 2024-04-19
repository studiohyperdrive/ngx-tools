import { Type } from '@angular/core';
import { NgxFormsErrorAbstractComponent } from '../abstracts';

export type NgxFormsErrorShowWhenSettings = 'touched' | 'dirty';
export type NgxFormsErrorShowSettings = 'all' | number;

/**
 * Configuration for the ngx-errors directive
 *
 *  errors - A record with the error key and the corresponding message we wish to show
 *  showWhen - A setting to know when an error has to be shown. Either 'touched' or 'dirty'
 *  component - An optional component to provide, which will be used to render the error. If not provided,
 * 				it will render a p-tag with class `ngx-forms-error`
 *  show - The amount of errors we wish to show at once. By default, only one error is shown at a time.
 */
export interface NgxFormsErrorConfigurationOptions {
	errors: Record<string, string>;
	showWhen: NgxFormsErrorShowWhenSettings;
	component?: Type<NgxFormsErrorAbstractComponent>;
	show?: NgxFormsErrorShowSettings;
}
