---
keyword: DetailRowPage
---

`ngx-table` provides a built-in way to add detail rows to your table. This can be done by providing the `#detailRowTmpl` template as a `ContentChild`. When provided, the row automatically becomes clickable and can be toggled open and close. The default props provided to the template are the entire data object and the index. We can listen to a row being clicked by adding a listener to the `rowClicked` Output.

{{ NgDocActions.demo("TableOneDemoComponent") }}

Once a detail row is provided, we can use several Inputs to handle the behavior of the table. By setting the `showSelectedOpenRow` property to true, a class (`ngx-table-row-selected`) is provided to the open row so we can style the open rows.

We can define how detail rows are opened by using the `showDetailRow` property. By default, this is set to `on-click`. This value can also be set to `always` to set the all rows open, or to `on-single-item` to make the row open on click and also when there is only one item in the table.

If you wish to emit the `rowClicked` Output when there's only one item in the table and the `showDetailRow` is set to `on-single-item`, you can set the `emitValueOnSingleItem` to true. The default for this is false, and can be overwritten in the `NgxTableConfig`.

By passing an index to the `defaultRowOpen` input, this row will be opened on rendering the table. The standard behavior of the table allows for only one row to be open at all times, which can be overwritten by setting the `allowMultipleOpenRows` property to true.

We can also visualize the open state of the row by setting the `showOpenRowState` property to true. This will automatically add a cell at the end of the row displaying the open and closed state of the row with a caret. You can overwrite this template using the `openRowStateTmpl`

{{ NgDocActions.demo("TableTwoDemoComponent") }}
