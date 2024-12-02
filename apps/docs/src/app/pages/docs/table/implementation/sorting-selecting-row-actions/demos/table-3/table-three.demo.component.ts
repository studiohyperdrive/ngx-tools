import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxTable } from '@ngx/table';

@Component({
	standalone: true,
	imports: [NgxTable, ReactiveFormsModule],
	selector: 'table-three-demo',
	templateUrl: './table-three.demo.component.html',
})
export class TableThreeDemoComponent {
	public control: FormControl<number[]> = new FormControl();
	public customControl: FormControl<number[]> = new FormControl();
}
