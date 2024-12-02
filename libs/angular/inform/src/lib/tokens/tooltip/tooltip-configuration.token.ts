import { InjectionToken } from '@angular/core';

import { NgxTooltipConfiguration } from '../../types';

/**
 * A token to provide the necessary configuration to the NgxTooltipDirective. This is exported
 * due to testing frameworks (like Storybook) not being able to resolve the InjectionToken in the
 * `provideNgxTooltipConfiguration`.
 */
export const NgxTooltipConfigurationToken = new InjectionToken<NgxTooltipConfiguration>(
	'NgxTooltipConfiguration'
);
