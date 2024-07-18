import { Provider } from '@angular/core';
import { NgxTableDefaultComponentInputsConfiguration, NgxTableInputs } from '../interfaces';
import { NgxTableConfig, NgxTableConfigToken } from '../token';

export const NgxTableConfigurationProvider = <
	InputsType extends NgxTableDefaultComponentInputsConfiguration = NgxTableDefaultComponentInputsConfiguration
>(
	configuration: NgxTableConfig
): Provider[] => {
	return [
		{
			provide: NgxTableConfigToken,
			useValue: configuration,
		},
		{
			provide: NgxTableInputs,
			useClass: NgxTableInputs<InputsType>,
		},
	];
};
