---
keyword: AuthenticationPage
---

`@studiohyperdrive/types` is a collection of individual packages that aim to form a bridge between front-end and back-end related packages.

## Installation

```shell
npm install @studiohyperdrive/types-auth
```

### Versioning and build information

This package will follow a semver-like format, `major.minor.patch`, in which:

- `major`: Follows the Angular major version
- `minor`: Introduces new features and (potential) breaking changes
- `patch`: Introduces bugfixes and minor non-breaking changes

For more information about the build process, authors, contributions and issues, we refer to the [ngx-tools](https://github.com/studiohyperdrive/hyperdrive-opensource) repository.

## Types

In order to plug into the corresponding frontend packages, the package provides an `AuthenticatedUserSession` and an `AuthenticationResponse` type.

`AuthenticatedUserSession` provides the basics for both permissions and feature flags provided to a user during their session.

`AuthenticationResponse` provides the authenticated user, an optional session and optional metadata.

## Corresponding packages

For Angular, the corresponding package is [@studiohyperdrive/ngx-auth](https://open-source.studiohyperdrive.be/docs/angular/authentication/introduction).
