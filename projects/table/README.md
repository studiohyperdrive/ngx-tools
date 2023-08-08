# NgxTable

This library provides a quick and easy template based table builder using the Angular CDK Table.

## 1. Concept

The Angular CDK Table is a very useful tool to build tables with, but is known to have a rather complex syntax and does not feature a bunch of common use-cases out of the box.

Using the CDK Table the `ngx-table` provides an easy to use template based system to build tables with, including various common use-cases such as column based sorting, selecting rows, detail rows and more.

Whilst this package is opinionated, the `ngx-table` works primarily with a ng-template based system, which ensures that any default implementation the table provides can be overwritten.

You can find a StackBlitz example [here](https://stackblitz.com/edit/stackblitz-starters-am9x39).

## 2. Simple example

Starting off with a simple example, the `ngx-table` works with two primary inputs, the `columns` and the `data` inputs. 

The `columns` input expects an array of strings which will represent each column in the table. The keys in this array usually match with properties in the interface of the data you provide to the table, but they do not have to. You can add additional columns that use the entire data object by simply adding keys that are not part of the interface.

The `data` input provides an array of data that needs to be visualized in the table. Each entry within the array will be represented as a row in the table.

```html
  <ngx-table 
    [data]="[{name: 'World', firstName: 'Hello', active: true}, {name: 'Tools', firstName: 'NGX', active:false}]" 
    [columns]="['name', 'firstName']" />
```

| name | firstName |
|--|--|
| World | Hello |
| Tools | NGX |

Because of the default templates provided by the table, the above example will render without issues. The table will render the column names as is, so 'name' and 'firstName', and will render the cells as is as well. However, in reality, we want to be able to provide our own templates to each column. We can do this by using the `ngx-table-cell`. 

```html
   <ngx-table 
   [data]="[{name: 'World', firstName: 'Hello', active: true}, {name: 'Tools', firstName: 'NGX', active:false}]" 
   [columns]="['name', 'firstName', 'active']">
        <ngx-table-cell column="name">
            <ng-template #headerTmpl>
                Last name
            </ng-template>
        </ngx-table-cell>

        <ngx-table-cell column="firstName">
            <ng-template #headerTmpl>
                First name
            </ng-template>
        </ngx-table-cell>

        <ngx-table-cell column="active">
            <ng-template #headerTmpl>
            </ng-template>

            <ng-template #cellTmpl let-active>
                {{active ? 'Active' | 'Not active'}}
            </ng-template>
        </ngx-table-cell>
    </ngx-table>
```

| Last name | First name |  |
|--|--|--|
| World | Hello | Active |
| Tools | NGX | Not active |

Each cell can be connected to a column in the `columns` array by providing the corresponding key to the `column` input. From here on out, we can overwrite each part of the column by using the `headerTmpl`, the `cellTmpl` or `footerTmpl` templates. Each template is optional and if not provided will default to the default representation.

Using these templates, we can set our own headers and use the property from the data object to render our cells. But, sometimes we don't need a single property or have columns that don't match with any property in the data objects.

```html
    <ngx-table 
    [data]="[{name: 'World', firstName: 'Hello', active: true}, {name: 'Tools', firstName: 'NGX', active:false}]" 
    [columns]="['active', 'user']">
        <ngx-table-cell column="user">
            <ng-template #headerTmpl>
                User
            </ng-template>

            <ng-template #cellTmpl let-row="row">
                {{row.firstName}} {{row.name}}
            </ng-template>
        </ngx-table-cell>

        <ngx-table-cell column="active">
            <ng-template #headerTmpl>
            </ng-template>

            <ng-template #cellTmpl let-active>
                {{active ? 'Active' | 'Not active'}}
            </ng-template>
        </ngx-table-cell>
    </ngx-table>
```

| | User |
|--|--|
| Active | Hello world |
| Not active | NGX Tools |

In the `cellTmpl` template we have several props at our disposal to work with. The implicitly provided prop will try to match the column key with a property in the data object. By grabbing the `row` property, you can use the entire data object. On top of that the index of the row can be used by using the `index` property.

The `ngx-table` package comes with two extra cells that are used in common use-cases, being the `ngx-date-table-cell` and the `ngx-currency-cell`. These special cells were made to represent date and currency based data; but are optional. For more information about making your own custom cells, see the topic Custom Cells.

## 2. Detail row

`ngx-table` provides a built-in way to add detail rows to your table. This can be done by providing the `#detailRowTmpl` template as a `ContentChild`. When provided, the row automatically becomes clickable and can be toggled open and close. The default props provided to the template are the entire data object and the index. We can listen to a row being clicked by adding a listener to the `rowClicked` Output.

```html
   <ngx-table 
    [data]="[{name: 'World', firstName: 'Hello', active: true}, {name: 'Tools', firstName: 'NGX', active:false}]" 
    [columns]="['name', 'firstName']">
        <ng-template #detailTmpl let-user>
            This user, {{user.firstName}} {{user.name}}, is {{user.active ? 'active' | 'not active'}}.
        </ng-template>
    </ngx-table>
```

Once a detail row is provided, we can use several Inputs to handle the behavior of the table. By setting the `showSelectedRow` property to true, a class (`ngx-table-row-selected`) is provided to the open row so we can style the open rows.

By setting the `allRowsOpen` property to true, all rows are open by default. By passing an index to the `defaultRowOpen` input, this row will be opened on rendering the table. The standard behavior of the table allows for only one row to be open at all times, which can be overwritten by setting the `allowMultipleOpenRows` property to true.

We can also visualize the open state of the row by setting the `showOpenRowState` property to true. This will automatically add a cell at the end of the row displaying the open and closed state of the row with a caret. You can overwrite this template using the `openRowStateTmpl`

```html
   <ngx-table 
    [data]="[{name: 'World', firstName: 'Hello', active: true}, {name: 'Tools', firstName: 'NGX', active:false}]" 
    [columns]="['name', 'firstName']">
        <ng-template #detailTmpl let-user>
            This user, {{user.firstName}} {{user.name}}, is {{user.active ? 'active' | 'not active'}}.
        </ng-template>

        <ng-template #openRowStateTmpl let-open>
            {{open ? 'Close' : 'Open'}}
        </ng-template>
    </ngx-table>
```

## 3. Loading and empty state

`ngx-table` also provides a default error, loading and empty state to the table. You can overwrite these templates with the `emptyTmpl` and `loadingTmpl` templates.

```html
   <ngx-table 
    [data]="[{name: 'World', firstName: 'Hello', active: true}, {name: 'Tools', firstName: 'NGX', active:false}]" 
    [loading]="true"
    [columns]="['name', 'firstName']">
        <ng-template #loadingTmpl>
            Loading users ...
        </ng-template>

        <ng-template #emptyTmpl>
            There are no users in your system!
        </ng-template>
    </ngx-table>
```

## 4. Sorting by column, selecting rows, row-actions and column sorting
Common use-cases such as sorting columns, selecting rows and providing actions on the table are also provided by the `ngx-table` package.

Sorting can be provided by setting the `sortable` property to true on a cell. Doing this will automatically add an icon to the column header representing the sorting state of the cell. When providing the `sort` output, we get an event which contains the sort direction and the key of the column. `ngx-table` does not sort the data by default, as data provided can be paged. 

We can also set the sorting from outside of the table by passing the current sorting to the table using the `currentSorting` property. This will automatically set the sort state in the table internally. 

As always, this default icon can be overwritten on table level by using the `sortTmpl` template. The implicitly provided prop is the direction of the sorting.

```html
    <ngx-table 
    [data]="[{name: 'World', firstName: 'Hello', active: true}, {name: 'Tools', firstName: 'NGX', active:false}]" 
    [columns]="['active', 'user']">
        <ngx-table-cell column="user">
            <ng-template #headerTmpl>
                User
            </ng-template>

            <ng-template #cellTmpl let-row="row">
                {{row.firstName}} {{row.name}}
            </ng-template>
        </ngx-table-cell>

        <ngx-table-cell column="active" [sortable]="true" (sort)="sortByActiveState($event)">
            <ng-template #headerTmpl>
            </ng-template>

            <ng-template #cellTmpl let-active>
                {{active ? 'Active' | 'Not active'}}
            </ng-template>
        </ngx-table-cell>

        <ng-template #sortTmpl let-direction>
            <my-custom-sorting-icon [sortDirection]="direction">
        </ng-template> 
    </ngx-table>
```

Another built-in common use case provided by the package is selecting rows. The `ngx-table` component functions as a control value accessor, which means any form control can be attached to the table. By setting the `selectable` property to true, the table will automatically display a checkbox at the start of every row, including a checkbox at the top of the headers to provide a select-all behavior.

By default, the `ngx-table` will use the index as the selected value in the form. If we wish to use a property of the data object instead, we can pass the key of the property to the `selectableKey` Input. Just as in previous use-cases, the default template of the checkbox can be overwritten by a custom template using the `checkboxTmpl`.

```html
    <ngx-table 
        [selectable]="true"
        [selectableKey]="'id'"
        [data]="[{name: 'World', firstName: 'Hello', active: true, id: '1'}, {name: 'Tools', firstName: 'NGX', active:false, id: '2'}]" 
        [loading]="true"
        [columns]="['name', 'firstName']">
        <ng-template #checkBoxTmpl let-control>
            <my-custom-checkbox [formControl]="control" />
        </ng-template>
    </ngx-table>
```

On top of being able to select rows, we can also define how we select the rows by passing the `selectableType` property. By default, the select will be handled by checkboxes, which allows for multiple rows to be selected. This automatically results in a select all option at the top of the table.

When you do not want multiple rows to be selected, you can pass the `radio` option to the `selectableType` property. Using this property, the select boxes will become radio buttons and the select all option will no longer be available. If you wish to override the default radio buttons, you can use the `radioTmpl` template.

```html
    <ngx-table 
        selectableType="radio"
        selectableKey="id"
        [selectable]="true"
        [data]="[{name: 'World', firstName: 'Hello', active: true, id: '1'}, {name: 'Tools', firstName: 'NGX', active:false, id: '2'}]" 
        [loading]="true"
        [columns]="['name', 'firstName']">
        <ng-template #radioTmpl let-control>
            <my-custom-radio-button [formControl]="control" />
        </ng-template>
    </ngx-table>
```

Optionally, you can provide an array of `actions` in the same vain you can add `columns` to the table. These actions have no special meaning aside from the fact that they will always be rendered behind the regular columns and before the open-row state column. This will provide a consistent look and feel throughout the entire application.

```html
     <ngx-table 
        [data]="[{name: 'World', firstName: 'Hello', active: true, id: '1'}, {name: 'Tools', firstName: 'NGX', active:false, id: '2'}]" 
        [actions]="['delete']"
        [loading]="true"
        [columns]="['name', 'firstName']">
        <ngx-table-cell column="delete">
            <ng-template #headerTmpl>
                <button (click)="deleteAll()">
                    Delete all
                </button>
            </ng-template>

            <ng-template #cellTmpl let-row="row">
                <button (click)="delete(row.id)">
                    Delete user
                </button>
            </ng-template>
        </ngx-table-cell>
    </ngx-table>
```

As mentioned earlier, the `columns` input defines the order of the columns by using the order of the provided strings. These columns can be changed on the fly, allowing users to reorder the columns by hand or showing/hiding columns in certain specific situations. A built-in solution to allow drag-and-drop column sorting is not yet provided, but will be in the future.


## 5. Custom Cells

By using a template-based approach to our cells, we have the ability the create default cells we can use throughout our application. This does not only benefit developers, as it allows for quicker setups of tables, but also provides a consistent look and feel for the users. 

`ngx-table` provides two default specialized columns, the `ngx-date-table-cell` and the `ngx-currency-table-cell` which render dates and currencies respectively. Using these cells is entirely optional. 

Creating a custom re-usable cell can be done by implementing the `NgxAbstractTableCellDirective`. Please note that it is required to also include this directive as a provider. This will ensure that the cells can be recognized by the table.

```ts
 import { Component, ContentChild, TemplateRef, ViewChild } from '@angular/core';

import { NgxAbstractTableCellDirective } from '@studiohyperdrive/ngx-table';

@Component({
	selector: 'ngx-user-table-cell',
	providers: [
		{
			provide: NgxAbstractTableCellDirective,
			useExisting: UserTableCellComponent
		}
	],
	template: `
        <ng-template #cellTmpl let-user>
            {{user.firstName}} {{user.name}}
        </ng-template>
    `,
    changeDetection: ChangeDetection.OnPush
})
export class UserTableCellComponent extends NgxAbstractTableCellDirective {
	/**
	 * A template for the footer of the cell
	 */
	@ContentChild('footerTmpl', { static: false })
	footerTemplate: TemplateRef<any>;

	/**
	 * A template for the header of the cell
	 */
	@ContentChild('headerTmpl', { static: false })
	public headerTemplate: TemplateRef<any>;

	/**
	 * A template for the header of the cell
	 */
	@ViewChild('cellTmpl', { static: false })
	public cellTemplate: TemplateRef<any>;
}

```
In the example above, we create a simple user name cell. Instead of using a `ContentChild` template for our cell template, we use a `ViewChild` template. This way, we can provide a default approach to the user name cell, without having to provide it again and again throughout the entire application.
## 6. Styling

By default the `ngx-table` comes with very minimal styling. Several classes have been provided to help with styling specific parts of the table. As the package was built upon the `cdk-table`, all styling rules that apply to that table also apply here. Check out the documentation of the `cdk-table` for more information.

| Class | |
|--|--|
| ngx-table | A class set to the `table` element |
| ngx-table-clickable-rows | A class set to the `table` element if a detail row template was provided or the `rowClicked` output was defined |
| ngx-table-hide-rows | A class set to the `table` element if the data array is empty or when the `loading` property is set to true |
| ngx-table-cell | A class added to all cells in the table |
| ngx-table-header-cell | A class added to all header cells in the table |
| ngx-table-row-cel | A class added to all row cells in the table |
| ngx-table-footer-cell | A class added to all footer cells in the table |
| ngx-table-selectable-cell | A class added to all selectable cells in the table |
| ngx-table-sortable-cell | A class added to all sortable header cells in the table |
| ngx-table-sorting-icon | A class added to default sorting icon in the table |
| ngx-table-detail-cell | A class added to the detail row cell in the table |
| ngx-table-row | A class added to rows in the table |
| ngx-table-row-odd | A class added to all odd rows in the table |
| ngx-table-row-even | A class added to all even rows in the table |
| ngx-table-row-selected | A class added to all open rows in the table |
| ngx-table-row-highlight | A class added to all rows in the table that match the provided `highlightKey` property |
| ngx-table-detail-row | A class added to all detail rows in the table |
| ngx-table-detail-row-open | A class added to all open detail rows in the table |
| ngx-table-footer-row | A class added to all footer rows in the table |
| ngx-table-open-state-icon | A class added to default open-row state icon in the table |


If you wish to provide a custom class to the row of your tables, you can provide the class name to the `rowClass` Input. 

Cells can also have a default class we want to provide to all cells of that kind. All `ngx-date-table-cell` cells have the `ngx-date-table-cell` class and the same applies for the `ngx-currency-table-cell`.

## 7. Acknowledgements

A big thanks goes out to [Sam Verschueren](https://github.com/SamVerschueren) for his help with the initial implementation of this table. Without his help, this table would not have existed.
## Team

This bundle of tools has been created and is maintained by [Studio Hyperdrive](https://studiohyperdrive.be).

Contributors:
- Benoît Dossoine
- [Denis Valcke](https://github.com/DenisValcke)
- [Iben Van de Veire](https://github.com/IbenTesara)
- [Wouter Heirstrate](https://github.com/WHeirstrate)
