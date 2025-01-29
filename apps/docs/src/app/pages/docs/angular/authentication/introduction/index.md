---
keyword: IntroductionPage
---

`ngx-auth` is an Angular based package used to enhance both the user and the developer experience in creating authentication flows.

## For organisations

Being a backbone for many applications, authentication is an important facet in development. By providing tried-and-tested solutions to common use-cases within authentication, our solution aims to both speed up the development process for developers as enhancing the user experience for end--users.

In any application, certain features might need to be locked behind a threshold. A user might need admin permissions to gain access to a control panel, a registration flow shouldn't be available for already signed-in users, or maybe your application provides certain features based on whether or not your client has paid for a specific plan. Our solution provides a quick and easy way to handle permissions, feature-flags and authenticated flows out of the box!

By providing permissions and features on a user level instead of a global level, our solution also provides an easy way to work with A-B testing. For instance, when redesigning an existing flow in your application, you could give access to the redesign to a select group of users before doing so for all users; ensuring you can get feedback before rolling out your new design to the bigger public.

Looking for more information on how this package can help you out in your application? Mail us at [info@studiohyperdrive.be](mailto:info@studiohyperdrive.be)

## For developers

`ngx-auth` is a package that provides a service, guards, directives and pipes related to authentication flows.

At its core, we provide an implementation of the `NgxAuthenticationAbstractService` which will handle our authentication response, features, permissions, user, user session and metadata.

Once provided we can use a wide array of guards, pipes and structural directives to block/enable routes or hide/show parts of the dom based on the authentication state, the provided permissions or the required features.

Looking for more information on how this package can help you out in your application? Check out `Implementation` to find out more!
