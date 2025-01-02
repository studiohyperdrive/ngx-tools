---
keyword: ImplementationPage
---

In your code, you can use this package and it's interfaces like this:

```typescript
import { HALFormat } from '@studiohyperdrive/nodejs-hal-tools';

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

#### Parameters
- `path`: The path parameter is optional, if omitted, the _links section is not added
- `maxPages`: An optional parameter that limits the maximum number of pages returned. This can be useful in scenario's with lots of items, where querying with limit/offset can be time consuming. To prevent the user from navigating to e.g. page 599, you can limit that number using the `maxPages` parameter.
