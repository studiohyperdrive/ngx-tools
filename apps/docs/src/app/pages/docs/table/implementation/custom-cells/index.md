---
keyword: CustomCellsPage
---

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
			useExisting: UserTableCellComponent,
		},
	],
	template: `
		<ng-template #cellTmpl let-user> {{ user.firstName }} {{ user.name }} </ng-template>
	`,
	changeDetection: ChangeDetection.OnPush,
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
	 * A template for the content of the cell itself
	 */
	@ViewChild('cellTmpl', { static: false })
	public cellTemplate: TemplateRef<any>;
}
```

In the example above, we create a simple user name cell. Instead of using a `ContentChild` template for our cell template, we use a `ViewChild` template. This way, we can provide a default approach to the user name cell, without having to provide it again and again throughout the entire application.
