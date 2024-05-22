import { Directive, Input } from '@angular/core';
import { NgxHasCookieConfiguration } from '../../types';

/**
 *An abstract component that can optionally be used as a fallback to content that depends on accepted cookies
 */
@Directive()
export abstract class NgxCookiesFallBackComponent {
	/**
	 * The cookies that were required to show the original content
	 */
	@Input() cookies: NgxHasCookieConfiguration[] = [];
}
