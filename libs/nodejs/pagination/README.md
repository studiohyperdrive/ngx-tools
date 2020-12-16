# Studio Hyperdrive HAL Toolset

## General

This repo contains a set of tools for working with HAL standards.

It is build with:
- node: `v12.20.0` ( ~ `lts/...`)
- npm: `6.14.8`

For a complete list of packages and version check out the `package.json` file.

## Setup

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
