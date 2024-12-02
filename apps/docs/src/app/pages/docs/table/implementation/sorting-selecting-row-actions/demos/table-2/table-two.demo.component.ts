import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomCheckboxComponent } from '../../../../../../../shared/components';
import { NgxTable } from '@ngx/table';

@Component({
	standalone: true,
	imports: [NgxTable, CustomCheckboxComponent, ReactiveFormsModule],
	selector: 'table-two-demo',
	templateUrl: './table-two.demo.component.html',
})
export class TableTwoDemoComponent {
	public control: FormControl<number[]> = new FormControl();
	public customControl: FormControl<string[]> = new FormControl();
}
