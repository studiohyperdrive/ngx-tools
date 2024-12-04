import { filter } from 'rxjs/operators';

/**
 * validateContent
 *
 * The following custom operator can be used to validate if content in the stream is valid.
 *
 * It will, by default, check for null or undefined.
 * If strict is set to false, it will also allow falsy content to pass the check.
 *
 * A customValidatorFn can be passed which will overwrite the internal checks with custom validation logic.
 *
 * @param config - Optional config for the validator
 * @param config.strict - Should the content be strictly validated (null/undefined only). Set to true by default.
 * @param config.customValidatorFn - Provide a custom validator function that will overwrite internal checks.
 *
 * @returns ReturnType:typeof filter
 */
export function validateContent<ContentType = unknown>(
	{
		strict,
		customValidatorFn,
	}: {
		strict?: boolean;
		customValidatorFn?: (value: ContentType) => boolean;
	} = {
		strict: true,
		customValidatorFn: null,
	}
): ReturnType<typeof filter<ContentType>> {
	if (customValidatorFn && typeof customValidatorFn === 'function') {
		return filter(customValidatorFn);
	}

	if (strict) {
		return filter((data: ContentType) => typeof data !== 'undefined' && data !== null);
	}

	return filter(Boolean);
}
