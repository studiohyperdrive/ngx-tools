import { Provider, Type } from '@angular/core';
import { NgxAuthenticationAbstractService } from '../abstracts';
import { NgxAuthenticationServiceToken } from '../tokens';
/**
 * Configures the provided implementation of the NgxAuthenticationAbstract service to the application
 *
 * @param configuration - The configuration with the provided service implementation
 */
export const provideNgxAuthenticationConfiguration = (configuration: {
	service: Type<NgxAuthenticationAbstractService>;
}): Provider[] => {
	return [
		{
			provide: NgxAuthenticationServiceToken,
			useExisting: configuration.service,
		},
	];
};
