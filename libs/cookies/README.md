# NgxCookies

This library provides a quick and easy wrapper for [CookieConsent V3](https://cookieconsent.orestbida.com).

## Installation

Install the package first:

```shell
npm install @studiohyperdrive/ngx-cookies
```

Add the CookieConsent CSS to the build step.

``` json
        "styles": [
          "node_modules/vanilla-cookieconsent/dist/cookieconsent.css"
        ],
```

## Concept

The `ngx-cookies` package was made as an extension on top of the vanilla CookieConsent in order to provide several Angular based functionalities such as a setup through a server, Observables for the provided events and a directive to handle cookie based content.

The package refrains from adding too much custom logic and is entirely based on the existing CookieConsent API. We refer to the documentation of said package for more information regarding the setup of the cookie handler.

## NgxCookieService

The `NgxCookieService` provides two functionalities. On one side it allows you to handle the cookie consent flow for the end-user, on the other side it allows you to set/remove cookies and listen to the changes.

### Cookie Consent
Using the `NgxCookieService` we can initialize the CookieConsent cookie handler. It is important that this setup method, `setupCookiesHandler`, is called in the `ngAfterViewInit`. For more information on how to configure the cookie modal, check the [configuration](https://cookieconsent.orestbida.com/essential/getting-started.html#configuration) documentation.

This handler will automatically set the callbacks for the provided events, which will in turn update the provided Observables. These observables are: `firstCookiesConsented`, `cookiesConsented`, `cookiesConsentChanged` and `modalVisible$`.

The `firstCookiesConsented` and `cookiesConsented` will emit when the cookies are accepted only for the first time and on every page load respectively. Fore more information, see [onFirstContent](https://cookieconsent.orestbida.com/advanced/callbacks-events.html#onfirstconsent) and [onConsent](https://cookieconsent.orestbida.com/advanced/callbacks-events.html#onfirstconsent).

`cookiesConsentChanged` will emit whenever the user changes any of their accepted cookies and `modalVisible$` will emit whenever the cookie modal is displayed.

The service also provides ways to see whether a category or a service within a category of cookies has been accepted, and allows the category or service to be accepted as well. These methods are `hasAcceptedCategory`, `acceptCategory`, `hasAcceptedService` and `acceptService`.

Finally, using the `showModal` method, we can trigger the modal at any point in the application.

### Setting and removing cookies

We can also use the `NgxCookieService` to set, get and remove cookies. This can be done with the `setCookie`, `getCookie` and `removeCookie` methods respectively.

As this package provides a reactive approach to the cookie handling, `ngx-cookies` also provides two observable handlers, the `cookiesChanged$` observable and the `getCookieObservable` method.

`cookiesChanged$` is an observable that emits whenever the `setCookie` or the `removeCookie` gets called. It's important to keep in mind that, _if_ the cookies were already set in the past and the value is not updated, the `cookiesChanged$` observable will not emit. Keep this in mind, as this observable therefor might not always emit on startup.

`getCookieObservable` will listen to the provided cookie and will return either the value or `undefined` based on the set status. Unlike the `cookiesChanged$`, this observable does have the initial value regardless of whether the cookie value changed since last startup.

## hasCookieDirective

The `*hasCookie` directive is a structural directive which will render the content based on wether the provided (set of) cookie(s) are accepted by the user. If accepted, the content will be shown.

If the content is not accepted, there are three possible outcomes. By default, if no fallback component or else template is provided, the directive simply does not render the item if the provided cookies are not accepted.

In many cases we simply want to render a single default component throughout the entire application to show that a piece of the UI cannot be shown due to cookies not being accepted. To allow this, you can provide a component that implements the `NgxCookiesFallbackComponent` to the `NgxCookiesFallbackComponentToken` injection token. By providing this component, this will automatically be shown where a cookies is not accepted.

``` ts
...
imports: [CommonModule, NgxHasCookieDirective],
providers: [
		{
			provide: NgxCookiesFallbackComponentToken,
			useValue: CookieAlertComponent,
		},
	],

    ...

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxCookiesFallBackComponent } from '@ngx/cookies';

@Component({
	selector: 'app-cookie-alert',
	template: `You did not accept the cookie {{ cookies | json }}`,
	standalone: true,
	imports: [CommonModule],
})
export class CookieAlertComponent extends NgxCookiesFallBackComponent {}


```

Just like any structural directives, we can pass an `else` template to the `*hasCookie` directive. This template always has priority over the default component we provided. This way, you are always able to get a custom template even when a default is implemented.


#
