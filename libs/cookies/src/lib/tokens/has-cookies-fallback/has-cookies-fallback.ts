import { InjectionToken, Type } from '@angular/core';

import { NgxCookiesFallBackComponent } from '../../abstracts';

/** A token to provide a fallback component that needs to be rendered when a specific (set of) cookie(s) was not accepted. */
export const NgxCookiesFallbackComponentToken = new InjectionToken<
	Type<NgxCookiesFallBackComponent>
>('NgxCookiesFallbackComponent');
