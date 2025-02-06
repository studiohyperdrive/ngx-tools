import { InjectionToken } from '@angular/core';

import { NgxAuthenticationAbstractService } from '../abstracts';
/**
 * A token to provide the necessary service to the directives/guard
 */
export const NgxAuthenticationServiceToken = new InjectionToken<NgxAuthenticationAbstractService>(
	'NgxAuthenticationServiceToken'
);
