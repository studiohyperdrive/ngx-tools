import { Provider } from '@angular/core';

import { NgxReplaceElementsConfigurationToken } from '../../tokens';
import { NgxReplaceElementsConfiguration } from '../../types';

/**
 * Provides the configuration for the NgxReplaceElements directive
 *
 * @param configuration - The required configuration
 */
export const provideNgxReplaceElementsConfiguration = (
	configuration: NgxReplaceElementsConfiguration
): Provider => {
	return {
		provide: NgxReplaceElementsConfigurationToken,
		useValue: configuration,
	};
};
