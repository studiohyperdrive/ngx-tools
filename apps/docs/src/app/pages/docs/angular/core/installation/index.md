---
keyword: InstallationPage
---

This library provides several independent utilities that form the base of the Studio Hyperdrive NGX-Tools packages.

## Installation

Install the package first:

```shell
npm install @studiohyperdrive/ngx-core
```

## Versioning and build information

This package will follow a semver-like format, `major.minor.patch`, in which:

- `major`: Follows the Angular major version
- `minor`: Introduces new features and (potential) breaking changes
- `patch`: Introduces bugfixes and minor non-breaking changes

For more information about the build process, authors, contributions and issues, we refer to the [ngx-tools](https://github.com/studiohyperdrive/ngx-tools) repository.

## Concept

### Services

#### `*NgxWindowServicePage`

This service uses the `DOCUMENT` injection-token to provide several methods to access both document and window and related information.
It is convenient for using the document or window without breaking SSR.
