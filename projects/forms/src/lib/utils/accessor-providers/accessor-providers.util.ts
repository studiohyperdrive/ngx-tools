import { Provider, forwardRef } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseFormAccessor } from '../../abstracts';

/**
 * An interface to wrap an component class in.
 *
 * This interface is for internal use, as a similar one already exists in the CDK, but we don't want to create a dependency on that for this package.
 */
interface ComponentTypeWrapper<ComponentType> {
	new (...args: any[]): ComponentType;
}

/**
 * Generates the necessary providers for a (Data)FormAccessor.
 *
 * @param  component - The component class of the (Data)FormAccessor
 */
export const createAccessorProviders = <ComponentType>(
	component: ComponentTypeWrapper<ComponentType>
): Provider[] => {
	return [
		// Iben: Generate a provider for the control handling
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => component),
			multi: true,
		},
		// Iben: Generate a provider for the validation handling
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => component),
			multi: true,
		},
		// Iben: Generate a provider for the FormContainer handling
		{
			provide: BaseFormAccessor,
			useExisting: forwardRef(() => component),
		},
	];
};
