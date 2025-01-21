---
keyword: DefaultsAndNgxTableConfigPage
---

The table provides several properties that can be set using an `@Input`. The majority of these properties are optional and come with a series of default values for easy use. These defaults can be overwritten using the `NgxTableConfig`.

The `NgxTableConfig` is an optional InjectionToken that allows for the defaults to be overwritten. These defaults are:

| Defaults              |                                                                                                                                                                                                                                                                                                                   |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| showDetailRow         | Handles the default behavior of detail rows in all tables. By default the detail-rows are shown when clicked. By providing `always`, the rows will always be open. Providing `on-single-item` will have the same behavior as the default `on-click`, but will open the detail row if the table has only one item. |
| ngxTableClass         | This class will be set on the `ngx-table` component itself, using HostBinding                                                                                                                                                                                                                                     |
| showOpenRowState      | Handles the default behavior of the open row state indicator. Providing `true` will automatically show the indicator in every table with a detail row.                                                                                                                                                            |
| allowMultipleRowsOpen | Handles the default behavior of whether multiple rows can be open at once. Providing `true` will allow all tables to always have allow multiple open rows.                                                                                                                                                        |
| highlightKey          | Handles the default behavior of rows that get the `ngx-table-row-highlight` class. Providing a string here will use that property as the data property to match to add the class.                                                                                                                                 |
| showSelectedOpenRow   | Handles the default behavior of rows that get the `ngx-table-row-selected` class. Providing `true` will always add the class to open rows.                                                                                                                                                                        |
| emitValueOnSingleItem | Handles the default behavior `rowClicked` emit behavior when the table is set to `on-single-item`.                                                                                                                                                                                                                |
| hideHeaderWhen        | Handles the default behavior of the header rendering, based on whether we wish to show the header when the table is loading or is empty.                                                                                                                                                                          |

We can provide the config using a provider. An example of this could be:

```ts
providers: [
	{
		provide: NgxTableConfigToken,
		useValue: {
			showDetailRow: 'on-single-item',
			highlightKey: 'is-updated',
		},
	},
];
```
