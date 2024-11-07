---
keyword: ValidatorsPage
---

A set of extra custom validators compatible with the default Angular validators and reactive forms.

## extendedEmail

Extends the default e-mail validator with a required period in the tld part of te email.

## allOrNothingRequired

A FormGroup validator that checks whether either all controls in a FormGroup are filled in, or no controls are. This validator is particularly useful when dealing with optional FormGroups within a form.

## atLeastOneRequired

A FormGroup validator that checks whether at least one of the provided controls was filled in. A separate function to determine the filled in state can be provided.

## compareValidator

A FormGroup validator that will compare child control values with a provided comparator.

## dependedRequired

A FormGroup validator that checks whether a series of controls are filled in when another control was filled in. A separate function to determine the filled in state can be provided.

## decimalsAfterComma

A validator that checks whether a provided number matches with a maximum amount of decimals after the comma.

## chronologicalDates

A validator that checks whether two dates are in chronological order.

## dateRangeValidator

A validator that checks whether a date falls between a provided range. The start and end date of the range are exclusive.

## hasNoFutureDateValidator

A validator which validates if a date is not in the future.

## wordCountValidator

A validator that will check the amount of words provided in a control.

## set/clearFormError

In custom validators, it is often useful to be able to quickly add or remove a specific error from the control. Using the `setFormError` we can easily set a specific error on a control, whilst `clearFormError` will remove said error.
