---
keyword: IntroductionPage
---

WARNING: This package has been renamed to [@studiohyperdrive/nodejs-hal-tools](https://www.npmjs.com/package/@studiohyperdrive/nodejs-hal-tools).

This repo contains a set of tools for working with HAL standards.

This package exposes the following functions:

- `calculateTotalPages`: This function will calculate the total amount of pages based on the pagesize & total amount of items.
- `calculatePagination`: This function will calculate and return all pagination properties.
- `calculateNextPage`: This function will calculate your next page or, when there is none, return your current page.
- `createHalLinks`: This function will create a set of links required by the HAL Format.
- `HALFormat`: This function is the main one which will use the above and your input to transform your input to a HAL-formatted object.

And the following interfaces:

- `IHALLink`: An interface for a single HAL link.
- `IHALLinks`: An interface for the `_links` property.
- `IHALEntities`: An interface for the `_embedded` property, takes in an optional `T`.
- `IHALPagination`: An interface for the `_page` property.
- `IHALFormat`: An interface for the HAL formatted object containing the above properties.
- `IHALFormatParams`: An interface for the arguments of the `HALFormat` function.
