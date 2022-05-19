# Studio Hyperdrive HAL Toolset

## General

WARNING: This package has been renamed to [@studiohyperdrive/nodejs-hal-tools](https://www.npmjs.com/package/@studiohyperdrive/nodejs-hal-tools).

This repo contains a set of tools for working with HAL standards.

It is build with:
- node: `v12.20.0` ( ~ `lts/erbium`)
- npm: `6.14.8`

For a complete list of packages and version check out the `package.json` file.

## Use

### Install

You can install this package by doing:
``` bash
$ npm install @studiohyperdrive/hal-tools
```
or if you use Yarn:
``` bash
$ yarn add @studiohyperdrive/hal-tools
```

### In your code
In your code, you can use this package and it's interfaces like this:

```typescript
import { HALFormat } from '@studiohyperdrive/hal-tools';

class DoSomething {
  public async findAll(page: number, size: number): Promise<IHALFormat<MyEntity>> {
    const [entities, totalElements] = await this.MyEntitiyRepository.findAndCount(
      calculateTakeSkip(page, size),
    );
    const key = 'my-entities';
    const path = `https://my-api.com/v1/api/${key}`;

    return HALFormat<MyEntity>({
      path,
      key,
      entities,
      page,
      size,
      totalElements,
    });
  }
}
```

This will transform your entities and count to a HAL formatted response which you can return to the client.

### What's in the package?
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
## Setup for contribution

### Clone and install dependencies
To setup this project, clone the repo and run `npm i` to install the dependencies.

### NPM
The available commands for building the project are:

| command      | runs                                                                                                      |
|--------------|-----------------------------------------------------------------------------------------------------------|
| build        | This script runs tsc to compile and your code (target to the `dist` folder).                              |
| prepare      | This script runs the `npm run build` command, it is a hook on the npm publish.                            |
<br>

The available commands for testing the project are:

| command      | runs                                                                                                      |
|--------------|-----------------------------------------------------------------------------------------------------------|
| lint         | This script will run linting and fix what it can.                                                         |
| test         | This script will run your Jest tests for the library and create a coverage report.                        |
| test         | This script will run your Jest tests but with the `--watchAll` flag. It does not create a coverage report.|
<br>

## Publish

This project can be published to the npm registry. To do so follow these steps:
1. Run `npm version <major | minor | patch>` to create a new version and commit + tag it.
2. Open a Merge Request on Github.
3. Once your changes have been commited to the main-branch, you can publish to the repo.
4. Run `npm publish`.

## Team

This project has been created by:
- Denis Valcke: denis.valcke@studiohyperdrive.be

It is currently maintained by:
- Denis Valcke: denis.valcke@studiohyperdrive.be
