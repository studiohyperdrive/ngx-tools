import {
	BehaviorSubject,
	combineLatest,
	distinctUntilChanged,
	filter,
	map,
	Observable,
	of,
	switchMap,
	tap,
} from 'rxjs';

import { AuthenticationResponse } from '@studiohyperdrive/types-auth';
import { NgxAuthenticationResponseFeature, NgxAuthenticationStatus } from '../types';

/**
 * An abstract service used by the directives, guards and other components of @studiohyperdrive/ngx-auth
 *
 * @template AuthenticationResponseType - The type of authentication response
 * @template SignInDataType - The data type used to sign in a user
 * @template SignoutDataType - The data type used to sign out a user
 * @template SignOutResponseType - The data type you get when signing out a user
 */
export abstract class NgxAuthenticationAbstractService<
	AuthenticationResponseType extends
		AuthenticationResponse<unknown> = AuthenticationResponse<any>,
	SignInDataType = any,
	SignoutDataType = any,
	SignOutResponseType = void,
> {
	/**
	 * A subject to store the authentication response if no other state implementation was provided
	 */
	private readonly authenticationResponseSubject: BehaviorSubject<AuthenticationResponseType> =
		new BehaviorSubject<AuthenticationResponseType>(undefined);

	/**
	 * A subject to store whether we've authenticated already
	 */
	private readonly authenticationStatusSubject: BehaviorSubject<NgxAuthenticationStatus> =
		new BehaviorSubject<NgxAuthenticationStatus>('unset');

	/**
	 * A subject to store global features that are available for all users, regardless of their authenticated state
	 */
	private readonly globalFeaturesSubject: BehaviorSubject<
		NgxAuthenticationResponseFeature<AuthenticationResponseType>[]
	> = new BehaviorSubject<NgxAuthenticationResponseFeature<AuthenticationResponseType>[]>([]);

	/**
	 * Whether an authentication attempt has been made
	 */
	public readonly hasAuthenticated$: Observable<boolean> = this.authenticationStatusSubject.pipe(
		distinctUntilChanged(),
		map((status) => status !== 'unset')
	);

	/**
	 * Whether the user is authenticated
	 */
	public readonly isAuthenticated$: Observable<boolean> = this.authenticationStatusSubject.pipe(
		distinctUntilChanged(),
		map((status) => status === 'signed-in')
	);

	/**
	 * The call required to sign in a user
	 *
	 * @param signInData - The data needed to sign in a user
	 */
	protected abstract signInUser(
		signInData: SignInDataType
	): Observable<AuthenticationResponseType>;

	/**
	 * The call required to sign out a user
	 *
	 * @param signoutDataType - Optional data needed to sign out a user
	 */
	protected abstract signOutUser(
		signoutDataType?: SignoutDataType
	): Observable<SignOutResponseType>;

	/**
	 * Stores the authentication response in the state
	 *
	 * @param response - The authentication response
	 */
	protected storeAuthenticationResponse(response: AuthenticationResponseType): void {
		this.authenticationResponseSubject.next(response);
	}

	/**
	 * Returns the authentication response from the state
	 */
	protected getAuthenticationResponse(): Observable<AuthenticationResponseType> {
		return this.authenticationResponseSubject.asObservable();
	}

	/**
	 * The authenticated user
	 */
	public get user$(): Observable<AuthenticationResponseType['user']> {
		return this.getAuthenticationResponse().pipe(
			filter(Boolean),
			map((response) => response.user),
			distinctUntilChanged()
		);
	}

	/**
	 * The session of the authenticated user
	 */
	public get session$(): Observable<AuthenticationResponseType['session']> {
		return this.getAuthenticationResponse().pipe(
			filter(Boolean),
			map(({ session }: AuthenticationResponseType) => session),
			distinctUntilChanged()
		);
	}

	/**
	 * The metadata of the authenticated user
	 */
	public get metadata$(): Observable<AuthenticationResponseType['metadata']> {
		return this.getAuthenticationResponse().pipe(
			filter(Boolean),
			map(({ metadata }: AuthenticationResponseType) => metadata),
			distinctUntilChanged()
		);
	}

	/**
	 * Signs in a user and stores the authentication response
	 *
	 * @param signInData - The data needed to sign in a user
	 */
	public signIn(signInData: SignInDataType): Observable<void> {
		// Iben: Perform the call to sign in a user
		return this.signInUser(signInData).pipe(
			tap((response: AuthenticationResponseType) => {
				// Iben: Set the user as signed in
				this.authenticationStatusSubject.next('signed-in');

				// Iben: Store the authentication response
				this.storeAuthenticationResponse(response);
			}),
			// Iben: Convert to void
			map(() => undefined)
		);
	}

	/**
	 * Signs out a user and removes the stored authentication response
	 *
	 * @param signoutDataType - Optional data needed to sign out a use
	 */
	public signOut(signoutDataType?: SignoutDataType): Observable<SignOutResponseType> {
		// Iben: Perform the call to sign out a user
		return this.signOutUser(signoutDataType).pipe(
			tap(() => {
				// Iben: Set the user as signed out
				this.authenticationStatusSubject.next('signed-out');

				// Iben: Remove the stored authentication response
				this.storeAuthenticationResponse(undefined);
			})
		);
	}

	/**
	 * Returns whether the user has the required features.
	 *
	 * @param requiredFeatures - An array of required features
	 * @param shouldHaveAllFeatures - Whether all features in the array are required, by default true
	 */
	public hasFeature(
		requiredFeatures: NgxAuthenticationResponseFeature<AuthenticationResponseType>[],
		shouldHaveAllFeatures: boolean = true
	): Observable<boolean> {
		// Iben: Get the session
		return combineLatest([this.getSession(), this.globalFeaturesSubject.asObservable()]).pipe(
			map(([{ features }, globalFeatures]) => {
				const sessionFeatures = new Set([...(features || []), ...(globalFeatures || [])]);
				// Iben: Return whether the user has the required features
				// We cast to strings here to make the typing work
				return shouldHaveAllFeatures
					? requiredFeatures.every((feature) => sessionFeatures.has(`${feature}`))
					: requiredFeatures.some((feature) => sessionFeatures.has(`${feature}`));
			})
		);
	}

	/**
	 * Sets a set of global features that are always present, regardless of the authenticated state of the user
	 *
	 * @param  features - A list of features
	 */
	public setGlobalFeatures(
		features: NgxAuthenticationResponseFeature<AuthenticationResponseType>[]
	): void {
		this.globalFeaturesSubject.next(features);
	}

	/**
	 * Returns whether the user has the required permissions.
	 *
	 * @param requiredPermissions - An array of required permissions
	 * @param shouldHaveAllPermissions - Whether all permissions in the array are required, by default true
	 */
	public hasPermission(
		requiredPermissions: AuthenticationResponseType['session']['permissions'],
		shouldHaveAllPermissions: boolean = true
	): Observable<boolean> {
		// Iben: Get the session
		return this.getSession().pipe(
			filter(Boolean),
			map(({ permissions }) => {
				const sessionPermissions = new Set([...permissions]);

				// Iben: Return whether the user has the required permissions
				return shouldHaveAllPermissions
					? requiredPermissions.every((permission) => sessionPermissions.has(permission))
					: requiredPermissions.some((permission) => sessionPermissions.has(permission));
			})
		);
	}

	/**
	 * Returns a session or an empty session depending on the authenticated state
	 */
	private getSession(): Observable<AuthenticationResponseType['session']> {
		return this.isAuthenticated$.pipe(
			switchMap((isAuthenticated) => {
				// Iben: If the user is authenticated, we return the session, if not, we return an empty version for the hasPermission and hasFeature methods
				// This ensures we always get a response
				return isAuthenticated
					? this.session$
					: of({
							features: [],
							permissions: [],
						});
			})
		);
	}
}
