# Shd Angular Tools
## General

This repo contains general usage libraries for shd Angular projects. Those libraries are:
- utils:
    - window service
- images:
    - progressive image loading

You can find detailed explanations in their respective README’s.

It is build with:
- Angular CLI : `11.2.1` 
- Angular: `11.2.1`
- nodejs: `12.19.0`
- npm: `6.14.8`


For a complete list of packages and version check out the `package.json` file.

### Clone and install dependencies
To setup this project, clone the repo and run `npm i` to install the dependencies.

### NPM

The available command are:

| command      | runs                                                                                                 |
|--------------|------------------------------------------------------------------------------------------------------|
| build        | runs `ng build`                                                                                      |
| test         | runs `ng test`                                                                                       |
| lint         | runs `ng lint --fix`                                                                                 |

<br>

### Publish

This project can be published to the npm registry. To do so follow these steps:

1. Run npm version <major | minor | patch> to create a new version and commit + tag it.
2. Open a Merge Request on Gitlab.
3. run `npm build`
4. Once your changes have been commited to the main-branch, you can publish to the repo.
5. Run `npm publish` in dist/*library*.

## Team

This project has been created by:
- Axelle Vanden Eynde: axelle.vandeneynde@studiohyperdrive.be


It is currently maintained by:
- Axelle Vanden Eynde: axelle.vandeneynde@studiohyperdrive.be


