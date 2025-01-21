---
keyword: ImplementationPage
---

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

const expressStatusController = new ExpressStatusController();

router.route('/status').get(expressStatusController.get);
```
