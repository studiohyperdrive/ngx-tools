# Studio Hyperdrive: Angular Tools (_shd_angular_tools_)

## General

This repo contains general usage libraries for shd Angular projects. Those libraries are:

-   utils (`@studiohyperdrive/ngx-utils`) :
    -   window service
    -   subscription service
-   images (`@studiohyperdrive/ngx-images`):

    -   progressive image loading

-   forms (`@studiohyperdrive/ngx-forms`):
    -   custom validators

You can find detailed explanations in their respective README’s.

It is build with:

-   Angular CLI : `15.1.4`
-   Angular: `15.1.3`
-   nodejs: `18.14.0`
-   npm: `9.3.1`

For a complete list of packages and version check out the `package.json` file.

### Clone and install dependencies

To setup this project, clone the repo and run `npm i` to install the dependencies.

### NPM

The available command are:

| command | runs                 |
| ------- | -------------------- |
| build   | runs `ng build`      |
| test    | runs `ng test`       |
| lint    | runs `ng lint --fix` |

<br>

### Publish

The libraries in this project can be published to the npm registry. To do so follow these steps:

1. In the library that you want to publish, bump the version in package & package-lock files.
2. Commit the changes using the following convention: `build(images): v1.0.0`.
3. Add a tag using the following convention: `@studiohyperdrive/ngx-images@v1.0.0`.
4. Make a new production build of your library using `ng build <library>` (Ivy is disable in tsconfig by default for this project).
5. Move to the dist folder of your library using `cd dist/<library>`
6. Publish the package using `npm publish`  
   a. If this is the first time publishing the library make sure to add the `--access public` flag.  
   b. Make sure you are logged into npm and that you have been added to the @studiohyperdrive organisation.

## Team

This bundle of tools has been created and is maintained by [Studio Hyperdrive](https://studiohyperdrive.be).
