import { InjectionToken } from '@angular/core';
import { NgxFormsErrorConfigurationOptions } from '../interfaces';

export const NgxFormsErrorsConfigurationToken =
	new InjectionToken<NgxFormsErrorConfigurationOptions>('NgxFormsErrorsConfiguration');
