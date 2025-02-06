---
keyword: ImplementationPage
---

## Setup

In order to use `ngx-auth`, we use the `provideNgxAuthenticationConfiguration` provider that requires an implementation of the `NgxAuthenticationAbstractService` to provide the service to the application. We advise you to provide this in the `bootstrapApplication` of your project.

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

## NgxAuthenticatedHttpClient

Additionally, you can use the `NgxAuthenticatedHttpClient` to further enhance your developer experience. Given its opinionated nature, it's entirely optional withing the `ngx-auth` package.

By providing additional `httpClientConfiguration` to the `provideNgxAuthenticationConfiguration` function, as seen below, we can now use the `HttpClient` wrapper. We no longer have to provide the `HttpClient` itself by calling `provideHttpClient`, this is done automatically by the configuration provider.

```ts
providers: [
    ...,
    provideNgxAuthenticationConfiguration({
        service: YourAuthenticationService,
        httpClientConfiguration: {
            baseUrl: () => environment.baseUrl,
            interceptors: [MyCustomInterceptor],
            authenticatedCallHandler: MyAuthenticatedCallHandler
        }
        })
]

```

The configuration has three optional items. `baseUrl` is a function that will be called at injection time and provides the base url we'll add to each request url. We do this according to the `baseurl/request-url` pattern.

Using the optional `interceptors`, we can provide other custom made interceptors to the application. By providing `authenticatedCallHandler` we can make changes to any request that is considered an authenticated request, which will be explained further below.

The `NgxAuthenticatedHttpClient` comes with two added benefits. On one hand, it automatically adds a base-url to all of your request calls. On the other, it integrates with the `NgxAuthenticatedHttpInterceptor` which will automatically call your interceptor function whenever a call with authentication is made.

Our `HttpClient` wrapper provides an implementation for `get`, `post`, `push`, `patch` and `delete` calls. On top of that, it also provides an extra method, `download`, which adds extra information to a `GET` request specifically for downloading `Blobs`. In the example below you see can see the `get` method in action.

```ts
const httpClient = inject(NgxAuthenticatedHttpClient);

public getData(): Observable<Data> {
    return httpClient.get<Data>('get-data')
}
```

In the example above we do a simple get call to fetch data from an end-point. We have the ability to pass params as the second parameter.

As this is an opinionated wrapper, we assume that most calls are made within an authenticated state. Because of that, the base assumption is that we can set the `withCredentials` flag to true by default. In the example below, we show how you can overwrite that.

```ts
const httpClient = inject(NgxAuthenticatedHttpClient);

public loginUser(data: HttParams): Observable<Data> {
    return httpClient.post<Data>('login', data, false )
}
```

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
<p *ngxIsAuthenticated="true">I will be shown if the user is authenticated!</p>
```

## Pipes

The `ngxHasFeature` and `ngxHasPermission` pipes are **impure** pipes that can be used to change the template based on whether the user has a feature or permission.

In general we suggest working with a signal or observable in component itself, but we provide these pipes to use in areas where the complexity would increase if done so.

## Mocks

For testing purposes, `ngx-auth` provides a mock service for the `NgxAuthenticationAbstractService` called `NgxAuthenticationServiceMock`, and a basic authentication response called `NgxAuthenticationResponseMock`.
