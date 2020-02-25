# Express Status

Express status-page solution used at Studio Hyperdrive

## Table of contents

* [Getting Started](#getting-started)
* [Usage](#usage)

## Getting Started

### Install the package

```bash
# NPM
npm install --save @studiohyperdrive/express-status

# Yarn
yarn add --save @studiohyperdrive/express-status
```

### Usage

```typescript
import { ExpressStatusRouter } from '@studiohyperdrive/express-status';

...
// Exposes '/status' in the router.
app.use(ExpressStatusRouter);
```

#### ExpressStatusRouter

An Express Router that exposes `GET /status`.

Usage:

```typescript
import { ExpressStatusRouter } from '@studiohyperdrive/express-status';

...

app.use(ExpressStatusRouter);
```

#### ExpressStatusController

The controller that takes care of handling the route callback.
Using the controller gives you the flexibility of adding your own endpoint.

Usage:

```typescript
import { ExpressStatusController } from '@studiohyperdrive/express-status';

...

router.route('/status').get(ExpressStatusController.get);
```
