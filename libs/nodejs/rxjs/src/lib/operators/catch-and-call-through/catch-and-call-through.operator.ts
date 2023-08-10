import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * catchAndCallThrough
 *
 * The catchAndCallThrough operator will enrich the catchError operator with a return of the error.
 *
 * @param callback
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function catchAndCallThrough<Error = unknown>(callback: Function): ReturnType<typeof catchError> {
	return catchError((error: Error) => {
		callback(error);

		return of(error);
	});
}
