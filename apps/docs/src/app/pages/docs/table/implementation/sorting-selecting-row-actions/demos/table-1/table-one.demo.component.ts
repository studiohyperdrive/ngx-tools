import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxTable, NgxTableSortDirection, NgxTableSortEvent } from '@ngx/table';

@Component({
	standalone: true,
	imports: [NgxTable, CommonModule],
	selector: 'table-one-demo',
	templateUrl: './table-one.demo.component.html',
})
export class TableOneDemoComponent {
	currentSorting: any = undefined;
	sortableData = [
		{ name: 'World', firstName: 'Hello', active: true },
		{ name: 'Tools', firstName: 'NGX', active: false },
	];

	sort(sortEvent: NgxTableSortEvent) {
		this.currentSorting = sortEvent;
		console.log(sortEvent);
		if (sortEvent.column === 'user') {
			this.sortableData = [
				...this.sortableData.sort((a, b) => {
					const userA = `${a.firstName} ${a.name}`;
					const userB = `${b.firstName} ${b.name}`;

					return sortEvent.direction === NgxTableSortDirection.ASCENDING
						? userA.localeCompare(userB)
						: userB.localeCompare(userA);
				}),
			];
		}

		if (sortEvent.column === 'active') {
			this.sortableData = [
				...this.sortableData.sort((a) => {
					return sortEvent.direction === NgxTableSortDirection.ASCENDING
						? a.active
							? 1
							: -1
						: a.active
						? -1
						: 1;
				}),
			];
		}
	}
}
