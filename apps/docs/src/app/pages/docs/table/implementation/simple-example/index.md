---
keyword: SimpleExamplePage
---

Starting off with a simple example, the `ngx-table` works with two primary inputs, the `columns` and the `data` inputs.

The `columns` input expects an array of strings which will represent each column in the table. The keys in this array usually match with properties in the interface of the data you provide to the table, but they do not have to. You can add additional columns that use the entire data object by simply adding keys that are not part of the interface.

The `data` input provides an array of data that needs to be visualized in the table. Each entry within the array will be represented as a row in the table.

{{ NgDocActions.demo("DefaultTemplatesDemoComponent") }}

Because of the default templates provided by the table, the above example will render without issues. The table will render the column names as is, so 'name' and 'firstName', and will render the cells as is as well. However, in reality, we want to be able to provide our own templates to each column. We can do this by using the `ngx-table-cell`.

{{ NgDocActions.demo("CustomCellsDemoComponent") }}

Each cell can be connected to a column in the `columns` array by providing the corresponding key to the `column` input. From here on out, we can overwrite each part of the column by using the `headerTmpl`, the `cellTmpl` or `footerTmpl` templates. Each template is optional and if not provided will default to the default representation.

Using these templates, we can set our own headers and use the property from the data object to render our cells. But, sometimes we don't need a single property or have columns that don't match with any property in the data objects.

{{ NgDocActions.demo("CustomColumnsDemoComponent") }}

In the `cellTmpl` template we have several props at our disposal to work with. The implicitly provided prop will try to match the column key with a property in the data object. By grabbing the `row` property, you can use the entire data object. On top of that the index of the row can be used by using the `index` property.

The `ngx-table` package comes with two extra cells that are used in common use-cases, being the `ngx-date-table-cell` and the `ngx-currency-cell`. These special cells were made to represent date and currency based data; but are optional. For more information about making your own custom cells, see the topic Custom Cells.
