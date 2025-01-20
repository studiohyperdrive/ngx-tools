# openFile

The openFile helper function will download the provided blob, with the given name.

This function uses the URL and window.document interface behind the scenes.
Using this on a server will therefor not work.

## How to use

```typescript
import { openFile } from '@studiohyperdrive/utils';

openFile(blob, `download_me.pdf`);
```
