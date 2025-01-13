import { CommonModule } from '@angular/common';
import { Component, Input, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxTableDemoData } from '../data.demo';
import { NgxTable } from '@ngx/table';

@Component({
	imports: [NgxTable, CommonModule, ReactiveFormsModule],
	selector: 'table-styling-demo',
	templateUrl: './table-styling.demo.component.html',
	styleUrl: './table-styling.demo.component.scss',
	host: {
		class: 'no-controls settings-on-top',
	},
})
export class NgxTableStylingDemoComponent {
	@Input() public Styling: 'Simple' | 'Modern' | 'Classic' | 'Hyperdrive' | undefined;

	public readonly data: WritableSignal<any[]> = signal(NgxTableDemoData);
}
