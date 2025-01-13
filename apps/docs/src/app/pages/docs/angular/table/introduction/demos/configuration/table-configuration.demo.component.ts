import { CommonModule } from '@angular/common';
import { Component, Input, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { NgxTableDemoData } from '../data.demo';
import { NgxTable, NgxTableSortDirection, NgxTableSortEvent } from '@ngx/table';

@Component({
	imports: [NgxTable, CommonModule, ReactiveFormsModule],
	selector: 'table-configuration-demo',
	templateUrl: './table-configuration.demo.component.html',
	styleUrl: './table-configuration.demo.component.scss',
	host: {
		class: 'no-controls settings-on-top',
	},
})
export class NgxTableConfigurationDemoComponent {
	public readonly data: WritableSignal<any[]> = signal(NgxTableDemoData);
	public readonly currentSorting: WritableSignal<NgxTableSortEvent> = signal({
		column: 'country',
		direction: NgxTableSortDirection.ASCENDING,
	});
	public control: FormControl<any> = new FormControl<any>([]);

	@Input() public Selectable: boolean = true;
	@Input() public Sortable: boolean = true;
	@Input() public Columns: 'All' | 'Minimal' = 'All';
	@Input() public Detail: boolean = true;

	public sortLocation(event: NgxTableSortEvent): void {
		this.currentSorting.set(event);
		this.data.update((data) => [
			...data.sort((a, b) =>
				event.direction === NgxTableSortDirection.DESCENDING
					? a.country.localeCompare(b.country)
					: b.country.localeCompare(a.country)
			),
		]);
	}
}
