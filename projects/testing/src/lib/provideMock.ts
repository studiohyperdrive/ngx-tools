import { ValueProvider } from '@angular/core';

export const spyOnClass = <T>(spiedClass: NewableFunction, properties: Record<string, any>): jasmine.SpyObj<T> => {
	const prototype = spiedClass.prototype;

	const methods = Object.getOwnPropertyNames(prototype)
	.map((name) => [name, Object.getOwnPropertyDescriptor(prototype, name)])
	.filter(([name, descriptor]) => {
		return (descriptor as PropertyDescriptor).value instanceof Function;
	})
	.map(([name]) => name);

	return { ...properties, ...jasmine.createSpyObj('spy', [...methods]) };
};

export const provideMock = <T>(
	spiedClass: NewableFunction,
	properties: Record<string, any> = {}
): ValueProvider => ({
	provide: spiedClass,
	useValue: spyOnClass(spiedClass, properties),
});
