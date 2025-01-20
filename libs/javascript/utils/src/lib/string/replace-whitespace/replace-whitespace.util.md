# replaceHtmlWhitespace

The replaceHtmlWhitespace helper returns the filtered html as a string that has replaced the non-breakable whitespaces with regular spaces.

It works with mixed types of spacing.

## How to use

```typescript
import { replaceHtmlWhitespace } from '@studiohyperdrive/utils';

const result = replaceHtmlWhitespace('The\u00A0quick\u00A0brown\u00A0fox');

// result = 'The quick brown fox'
```
