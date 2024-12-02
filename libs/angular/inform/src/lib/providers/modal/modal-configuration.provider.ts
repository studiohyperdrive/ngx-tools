import { Provider } from '@angular/core';
import { NgxModalConfiguration } from '../../types';
import { NgxModalConfigurationToken } from '../../tokens';

/**
 * Provides the configuration for the NgxModalService
 *
 * @param configuration - The required configuration
 */
export const provideNgxModalConfiguration = (configuration: NgxModalConfiguration): Provider => {
	return {
		provide: NgxModalConfigurationToken,
		useValue: configuration,
	};
};
