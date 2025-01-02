// snippet#component "Typescript"
import { Component } from '@angular/core';
import { BtwCellComponent } from './btw-cell.component';
import { NgxTable } from '@ngx/table';

@Component({
	imports: [NgxTable, BtwCellComponent],
	selector: 'custom-cells-demo',
	templateUrl: './custom-cells.demo.component.html',
})
export class CustomCellsDemoComponent {
	public readonly data = [
		{
			name: 'World',
			firstName: 'Hello',
			active: false,
			id: 'id1',
			hello: 'world',
			amount: 37,
			date: '12/02/2024',
			btw: 123456789,
		},
		{
			name: 'Hyperdrive',
			firstName: 'Studio',
			active: true,
			id: 'SHD',
			hello: 'world',
			amount: 5000,
			date: '12/25/2023',
			btw: 474603875,
		},
		{
			name: 'Hyperdrive',
			firstName: 'Studio',
			active: true,
			id: 'SHD2',
			hello: 'world',
			amount: 5000,
			date: '10/19/2022',
			btw: 987654321,
		},
	];

	public readonly columns = ['firstName', 'name', 'date', 'amount', 'btw'];
}
// snippet#component

// snippet-from-file="./custom-cells.demo.component.html" "HTML"
