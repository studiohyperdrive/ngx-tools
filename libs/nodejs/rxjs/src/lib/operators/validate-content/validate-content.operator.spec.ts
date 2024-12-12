import { from, Subscription } from 'rxjs';
import { first, toArray, takeLast } from 'rxjs/operators';

import { validateContent } from './validate-content.operator';

describe('validateContent', () => {
	const subscriptions: Subscription[] = [];

	afterEach(() => {
		subscriptions.forEach((sub) => sub.unsubscribe());
	});

	describe('strict', () => {
		it('should check the content for strict null/undefined values by default', async () => {
			subscriptions.push(
				from([undefined, null, 'some-value'])
					.pipe(validateContent(), first())
					.subscribe((value: string) => {
						expect(value).toBe('some-value');
					})
			);
		});

		it('should disallow falsy values by default', async () => {
			subscriptions.push(
				from(['', false, 0])
					.pipe(validateContent(), takeLast(3), toArray())
					.subscribe((values: unknown[]) => {
						expect(values).toEqual(['', false, 0]);
					})
			);
		});
	});

	describe('non-strict', () => {
		it('should check the content for strict null/undefined values', async () => {
			subscriptions.push(
				from([undefined, null, 'some-value'])
					.pipe(validateContent({ strict: false }), first())
					.subscribe((value: string) => {
						expect(value).toBe('some-value');
					})
			);
		});

		it('should allow falsy values', async () => {
			subscriptions.push(
				from(['', false, 0])
					.pipe(validateContent({ strict: false }), takeLast(3), toArray())
					.subscribe((values: unknown[]) => {
						expect(values).toEqual([]);
					})
			);
		});
	});

	describe('customFn', () => {
		it('should allow the user to pass a custom validator function', async () => {
			const customValidatorFn = (value: unknown): boolean => {
				return value !== 0;
			};

			subscriptions.push(
				from(['', false, 0])
					.pipe(validateContent({ customValidatorFn }), takeLast(3), toArray())
					.subscribe((values: unknown[]) => {
						expect(values).toEqual(['', false]);
					})
			);
		});
	});
});
