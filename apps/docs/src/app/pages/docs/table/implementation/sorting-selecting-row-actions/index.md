---
keyword: SortingSelectingRowActionsPage
---

Common use-cases such as sorting columns, selecting rows and providing actions on the table are also provided by the `ngx-table` package.

Sorting can be provided by setting the `sortable` property to true on a cell. Doing this will automatically add an icon to the column header representing the sorting state of the cell. When providing the `sort` output, we get an event which contains the sort direction and the key of the column. `ngx-table` does not sort the data by default, as data provided can be paged.

We can also set the sorting from outside of the table by passing the current sorting to the table using the `currentSorting` property. This will automatically set the sort state in the table internally.

As always, this default icon can be overwritten on table level by using the `sortTmpl` template. The implicitly provided prop is the direction of the sorting.

Regardless of the implementation of a sortable column, the custom or default header template will **always be wrapped in a button for accessability purposes**. This button has been stripped of its styling to provide a more coherent look. Unsortable columns will not be wrapped in a button.

{{ NgDocActions.demo("SortingDemoComponent") }}

Another built-in common use case provided by the package is selecting rows. The `ngx-table` component functions as a control value accessor, which means any form control can be attached to the table. By setting the `selectable` property to true, the table will automatically display a checkbox at the start of every row, including a checkbox at the top of the headers to provide a select-all behavior.

By default, the `ngx-table` will use the index as the selected value in the form. If we wish to use a property of the data object instead, we can pass the key of the property to the `selectableKey` Input. The value of this key should **always** be of type string or number. Just as in previous use-cases, the default template of the checkbox can be overwritten by a custom template using the `checkboxTmpl`.

{{ NgDocActions.demo("SelectableCheckboxDemoComponent") }}

On top of being able to select rows, we can also define how we select the rows by passing the `selectableType` property. By default, the select will be handled by checkboxes, which allows for multiple rows to be selected. This automatically results in a select all option at the top of the table.

When you do not want multiple rows to be selected, you can pass the `radio` option to the `selectableType` property. Using this property, the select boxes will become radio buttons and the select all option will no longer be available. If you wish to override the default radio buttons, you can use the `radioTmpl` template.

{{ NgDocActions.demo("SelectableRadiobuttonDemoComponent") }}

Optionally, you can provide an array of `actions` in the same vain you can add `columns` to the table. These actions have no special meaning aside from the fact that they will always be rendered behind the regular columns and before the open-row state column. This will provide a consistent look and feel throughout the entire application.

{{ NgDocActions.demo("ActionsDemoComponent") }}

As mentioned earlier, the `columns` input defines the order of the columns by using the order of the provided strings. These columns can be changed on the fly, allowing users to reorder the columns by hand or showing/hiding columns in certain specific situations. A built-in solution to allow drag and drop column sorting is not yet provided, but will be in the future.
