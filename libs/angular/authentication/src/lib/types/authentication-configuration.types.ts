import { Type } from '@angular/core';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

import { NgxAuthenticationAbstractService } from '../abstracts';

/**
 * The configuration of the authentication handlers
 */
export interface NgxAuthenticationConfiguration {
	/**
	 * The provided implementation of the NgxAuthenticationAbstractService
	 */
	service: Type<NgxAuthenticationAbstractService>;
	/**
	 * An optional set of configuration to provide when the NgxAuthenticatedHttpClient needs to be used
	 */
	httpClientConfiguration?: NgxAuthenticatedHttpClientConfiguration;
}

export interface NgxAuthenticatedHttpClientConfiguration {
	/**
	 * An optional list of interceptors that will be provided to the HttpClient
	 */
	interceptors?: HttpInterceptorFn[];
	/**
	 * A base url generator function that will be run at injection time used by any request made by the NgxAuthenticatedHttpClient
	 */
	baseUrl?: () => string;
	/**
	 * An optional handler for each authenticated API request made by the NgxAuthenticatedHttpClient
	 */
	authenticatedCallHandler?: (request: HttpRequest<unknown>) => HttpRequest<unknown>;
}
