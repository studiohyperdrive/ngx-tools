import { Provider, Type } from '@angular/core';

import { NgxTourStepComponent } from '../../abstracts';
import { NgxTourStepToken } from '../../tokens';

/**
 * Provides the configuration for the NgxDisplayContent directive
 *
 * @param configuration - The required configuration
 */
export const provideNgxTourConfiguration = (
	configuration: Type<NgxTourStepComponent>
): Provider => {
	return {
		provide: NgxTourStepToken,
		useValue: configuration,
	};
};
