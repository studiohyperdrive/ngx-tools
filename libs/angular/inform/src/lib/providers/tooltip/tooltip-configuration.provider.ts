import { Provider } from '@angular/core';
import { NgxTooltipConfiguration } from '../../types';
import { NgxTooltipConfigurationToken } from '../../tokens';

/**
 * Provides the configuration for the NgxTooltipDirective
 *
 * @param configuration - The required configuration
 */
export const provideNgxTooltipConfiguration = (
	configuration: NgxTooltipConfiguration
): Provider => {
	return {
		provide: NgxTooltipConfigurationToken,
		useValue: configuration,
	};
};
