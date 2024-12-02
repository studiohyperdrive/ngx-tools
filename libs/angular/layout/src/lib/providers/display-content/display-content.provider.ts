import { Provider } from '@angular/core';
import { NgxDisplayContentConfiguration } from '../../types';
import { NgxDisplayContentConfigurationToken } from '../../tokens';

/**
 * Provides the configuration for the NgxDisplayContent directive
 *
 * @param configuration - The required configuration
 */
export const provideNgxDisplayContentConfiguration = (
	configuration: NgxDisplayContentConfiguration
): Provider => {
	return {
		provide: NgxDisplayContentConfigurationToken,
		useValue: configuration,
	};
};
