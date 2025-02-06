import { EnvironmentProviders, Provider } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import {
	NgxAuthenticationInterceptorToken,
	NgxAuthenticationServiceToken,
	NgxAuthenticationUrlHandlerToken,
} from '../tokens';
import { NgxAuthenticationConfiguration } from '../types';
import { NgxAuthenticatedHttpInterceptor } from '../interceptors';
/**
 * Configures the provided implementation of the NgxAuthenticationAbstract service to the application
 *
 * @param configuration - The configuration with the provided service implementation
 */
export const provideNgxAuthenticationConfiguration = (
	configuration: NgxAuthenticationConfiguration
): Provider | EnvironmentProviders[] => {
	return [
		{
			provide: NgxAuthenticationServiceToken,
			useExisting: configuration.service,
		},
		// Iben: If the HttpClientConfiguration is provided, we assume the user wants to use the NgxAuthenticatedHttpClient
		...(!configuration.httpClientConfiguration
			? []
			: [
					{
						provide: NgxAuthenticationUrlHandlerToken,
						useValue: configuration.httpClientConfiguration.baseUrl,
					},
					{
						provide: NgxAuthenticationInterceptorToken,
						useValue: configuration.httpClientConfiguration.authenticatedCallHandler,
					},
					provideHttpClient(
						withInterceptors([
							NgxAuthenticatedHttpInterceptor,
							...(configuration.httpClientConfiguration.interceptors || []),
						])
					),
				]),
	];
};
