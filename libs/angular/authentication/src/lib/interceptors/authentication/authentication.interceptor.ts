import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

import { NgxAuthenticationInterceptorToken } from '../../tokens';

/**
 * An interceptor that will handle any request that needs to be authenticated
 *
 * @param request - The provided request
 * @param next - The HttpHandler
 */
export function NgxAuthenticatedHttpInterceptor(
	request: HttpRequest<unknown>,
	next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
	// Iben: Get the authenticatedCallHandler
	const authenticatedCallHandler = inject(NgxAuthenticationInterceptorToken);

	// Iben: If the request does not need to be made in an authenticated state or if no authenticatedCallHandler was provided, we return the request as is
	if (!request.withCredentials || !authenticatedCallHandler) {
		return next(request);
	}

	// Iben: Handle the authenticated call
	return next(authenticatedCallHandler(request));
}
