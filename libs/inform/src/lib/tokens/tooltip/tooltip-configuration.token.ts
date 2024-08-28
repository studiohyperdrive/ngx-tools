import { InjectionToken } from '@angular/core';

import { NgxTooltipConfiguration } from '../../types';

/**
 * A token to provide the necessary configuration to the NgxTooltipDirective
 */
export const NgxTooltipConfigurationToken = new InjectionToken<NgxTooltipConfiguration>(
	'NgxTooltipConfigurationConfiguration'
);
