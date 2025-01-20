---
keyword: bePhoneBinFormattedPage
---

The bePhoneBinFormatted patterns expose the following regex patterns:

```
landline:
/^((\+|00\s?)32\s?|0)(\d\s?\d{3}|\d{2}\s?\d{2})(\s?\d{2}){2}$/

mobile:
/^((\+|00\s?)32\s?|0)4(\d{2}\s?)(\d{2}\s?){3}$/
```

These can be used to check and see if phone numbers have been formatted according to [Belgium BIN norms](https://www.vlaanderen.be/team-taaladvies/taaladviezen/telefoonnummers-notatie).

The regex pattern supports `+32`, `0032` and `0` notations.

## How to use

```typescript
import { bePhoneBinFormatted } from '@studiohyperdrive/regex-common';

const isValidLandline = bePhoneBinFormatted.landlinePattern.test('09 321 12 34 56');
const isValidMobile = bePhoneBinFormatted.landlinePattern.test('0478 12 34 56');
```
