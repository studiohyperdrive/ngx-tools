import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxTable, NgxTableSortDirection, NgxTableSortEvent } from '@ngx/table';

@Component({
	standalone: true,
	imports: [NgxTable, CommonModule, ReactiveFormsModule],
	selector: 'table-one-demo',
	templateUrl: './table-one.demo.component.html',
})
export class TableOneDemoComponent {
	// Variables
	public internalMode: 'simple' | 'advanced' = 'simple';
	public isSimple = true;
	public columns = ['name', 'firstName', 'active'];
	public formControl: FormControl<number[]> = new FormControl();
	public currentSorting: any = undefined;
	public readonly defaultData = [
		{ name: 'World', firstName: 'Hello', active: true, id: '1' },
		{ name: 'Tools', firstName: 'NGX', active: false, id: '2' },
	];
	public sortableData = this.defaultData;

	// Inputs
	@Input()
	get mode(): 'simple' | 'advanced' {
		return this.internalMode;
	}

	set mode(value: 'simple' | 'advanced') {
		this.internalMode = value;
		this.isSimple = this.internalMode === 'simple';
		this.columns = this.isSimple ? ['name', 'firstName', 'active'] : ['user', 'active'];
	}

	@Input()
	public selectable: boolean = false;

	@Input()
	public loading: boolean = false;

	@Input()
	set empty(value: boolean) {
		if (value) {
			this.sortableData = [];
		} else {
			this.sortableData = this.defaultData;
		}
	}

	public sort(sortEvent: NgxTableSortEvent): void {
		this.currentSorting = sortEvent;

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
