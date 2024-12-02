import { InjectionToken } from '@angular/core';

import { NgxModalConfiguration } from '../../types';

/**
 * A token to provide the optional configuration to the NgxModalService
 */
// This is exported due to testing frameworks (like Storybook) not being able to resolve the InjectionToken in the `provideNgxTooltipConfiguration`.
export const NgxModalConfigurationToken = new InjectionToken<NgxModalConfiguration>(
	'NgxModalConfiguration'
);
