---
keyword: ImplementationPage
---

## Setup

In order to use `ngx-auth`, we use the `provideNgxAuthenticationConfiguration` provider that requires an implementation of the `NgxAuthenticationAbstractService` to provide the service to the application. We advise you to provide this in the root of your application.

```ts
providers: [
    ...,
    provideNgxAuthenticationConfiguration({service: YourAuthenticationService})
]
```

Your own implementation needs to pass an implementation of the `AuthenticationResponse` which is part of the `@studiohyperdrive/types-auth` package. In the example below you can see how we implement such a service.

```ts
interface User {
	name: string;
	id: string;
}

interface Metadata {
	shouldUpdatePassword: boolean;
}

interface SignInData {
	email: string;
	password: string;
}

interface SignOutData {
	logOutEverywhere: boolean;
}

type Features = 'A' | 'B';
type Permissions = 'Admin' | 'User';

type SignInResponse = AuthenticationResponse<
	User,
	AuthenticatedUserSession<Features, Permissions>,
	Metadata
>;

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends NgxAuthenticationAbstractService<
	SignInResponse,
	SignInData,
	SignOutData,
	void
> {
	protected signInUser(data: SignInData): Observable<SignInResponse> {
		// Your sign in request
	}

	protected signOutUser(data: SignOutData): Observable<void> {
		// Your sign out request
	}
}
```

## Service

Once provided, the service has everything it needs to work and can be used as is, storing its own state. If you prefer to store the authenticated response somewhere else, for instance in a NGRX store, you can overwrite the `storeAuthenticationResponse` and the `getAuthenticationResponse` methods to do so.

The services provides access to the user, session and metadata by providing the `user$`, `session$` and `metadata$` Observables respectively. The service also provides a `hasPermission` and `hasFeature` methods to see if a user has a specific permission or feature.

By default, features are provided on a user basis. However, we are aware that certain features might be set globally regardless of the authentication status of the user. You can do so be calling the `setGlobalFeatures` method. These features will always be available to any user, anonymous or not.

## Guards

All guards depend on being provided specific data in the `data` block of the route. We strongly advise to type your routes as the provided `NgxAuthenticatedRoute` instead of the default `Route`. This way, you'll ensure that your routes always provide the necessary data for the guards.

In the example below, you'll find three routes, each with a guard that checks the authentication status, the feature and the permission respectively. By providing a `redirect` property, we redirect a user back to another route when any of the requirements are not matched.

```ts
const routes: NgxAuthenticatedRoutes = [
	{
		path: 'sign-in',
		component: 'SignInComponent',
		canActivate: [NgxIsAuthenticatedGuard],
		data: {
			redirect: '../dashboard',
			shouldBeAuthenticated: false,
		},
	},
	{
		path: 'feature-a',
		component: 'FeatureAComponent',
		canActivate: [NgxHasFeatureGuard<Features>],
		data: {
			redirect: '../dashboard',
			feature: ['A'],
		},
	},
	{
		path: 'permission-admin',
		component: 'AdminComponent',
		canActivate: [NgxHasPermissionGuard<Permissions>],
		data: {
			redirect: '../dashboard',
			permission: ['Admin'],
		},
	},
];
```

## Directives

`ngx-auth` provides a series of directives being `ngxHasFeature`, `ngxHasPermission` and `ngxIsAuthenticated` which can be used to render specific parts of the dom based on the features, permissions and authenticated status respectively. These directives are based on the old `ngIf` directive and work in a similar fashion.

In the example below you'll find the three aforementioned directives.

```html
<p *ngxIsAuthenticated="true">I will be shown if the user is authenticated!</p>
<p *ngxHasFeature="'A'">I will be shown if the user has feature A!</p>
<p *ngxHasPermission="'Admin'">I will be shown if the user is an Admin!</p>
```

The `ngxHasFeature`and `ngxHasPermission` directives have added options to handle whether all features or permissions are required, or if we wish to have the inverse effect.

```html
<p *ngxHasFeature="['A', 'B]; shouldHaveAllFeatures: false ">
	I will be shown if the user has either feature A, B or both!
</p>
<p *ngxHasPermission="['Admin']; shouldHavePermission: false">
	I will be shown if the user is not an Admin!
</p>
<p *ngxIsAuthenticated="true">
	I will be shown if the user is authenticated!
</p>
```

## Pipes

The `ngxHasFeature` and `ngxHasPermission` pipes are **impure** pipes that can be used to change the template based on whether the user has a feature or permission.

In general we suggest working with a signal or observable in component itself, but we provide these pipes to use in areas where the complexity would increase if done so.

## Mocks

For testing purposes, `ngx-auth` provides a mock service for the `NgxAuthenticationAbstractService` called `NgxAuthenticationServiceMock`, and a basic authentication response called `NgxAuthenticationResponseMock`.
