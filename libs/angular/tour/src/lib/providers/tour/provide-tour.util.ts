import { Provider } from '@angular/core';

import { NgxTourStepToken } from '../../tokens';
import { NgxTourTokenConfiguration, NgxTourTokenType } from '../../types';

/**
 * Provides the configuration for the NgxDisplayContent directive. This can be either just
 * the component or the component and the offset. More information can be found in the
 * documentation of the `NgxTourStep`.
 *
 * @param configuration - The required configuration
 */
export const provideNgxTourConfiguration = (configuration: NgxTourTokenType): Provider => {
	return {
		provide: NgxTourStepToken,
		useValue:
			// Wouter: If the configuration is an object, return it as is. If it is a component, return it as an object with the component as the `component` property and a default offset.
			typeof configuration === 'object'
				? (configuration as NgxTourTokenConfiguration)
				: ({
						component: configuration,
						offset: { top: 0, bottom: 0 },
					} as NgxTourTokenConfiguration),
	};
};
