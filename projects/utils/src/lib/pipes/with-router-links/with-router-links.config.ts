import { InjectionToken } from '@angular/core';
import { WithRouterLinksConfig } from './with-router-links.types';

export const WITH_ROUTER_LINKS_CONFIG = new InjectionToken<WithRouterLinksConfig>(
	'withRouterLinksConfig'
);
