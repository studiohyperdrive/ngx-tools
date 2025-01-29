import { AuthenticationResponse } from '@studiohyperdrive/types-auth';
import { map, Subject } from 'rxjs';
import { NgxAuthenticationStatus } from '../types';
/**
 * Returns a mock version of the authentication service
 *
 * @param  configuration - The configuration of the mock
 */
export const NgxAuthenticationServiceMock = <
	AuthenticationResponseType extends AuthenticationResponse<any> = AuthenticationResponse<any>,
>(configuration: {
	hasFeatureSpy: unknown;
	hasPermissionSpy: unknown;
	signInSpy: unknown;
	signOutSpy: unknown;
	authenticationResponse: Subject<AuthenticationResponseType>;
	hasAuthenticated: Subject<NgxAuthenticationStatus>;
}): any => {
	return {
		hasFeature: configuration.hasFeatureSpy,
		hasPermission: configuration.hasPermissionSpy,
		signIn: configuration.signInSpy,
		signOut: configuration.signOutSpy,
		isAuthenticated$: configuration.hasAuthenticated
			.asObservable()
			.pipe(map((status) => status === 'signed-in')),
		hasAuthenticated$: configuration.hasAuthenticated
			.asObservable()
			.pipe(map((status) => status !== 'unset')),
		user$: configuration.authenticationResponse
			.asObservable()
			.pipe(map((response) => response?.user)),
		session$: configuration.authenticationResponse
			.asObservable()
			.pipe(map((response) => response?.session)),
		metadata$: configuration.authenticationResponse
			.asObservable()
			.pipe(map((response) => response?.metadata)),
	};
};
