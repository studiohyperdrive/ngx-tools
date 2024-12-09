import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgDocNotifyService } from '@ng-doc/ui-kit';
import { NgxTable } from '@ngx/table';

@Component({
	imports: [NgxTable, ReactiveFormsModule],
	selector: 'table-four-demo',
	templateUrl: './table-four.demo.component.html',
})
export class TableFourDemoComponent {
	constructor(private readonly notifyService: NgDocNotifyService) {}

	public control: FormControl<number[]> = new FormControl();
	public customControl: FormControl<number[]> = new FormControl();

	public delete(rowId: string): void {
		console.log(rowId);
		this.notifyService.notify(`Deleted row with id: ${rowId}`);
	}

	public deleteAll(): void {
		this.notifyService.notify(`Deleted all rows`);
	}
}
