import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxTable } from '@ngx/table';
import { CustomRadioButtonComponent } from 'apps/docs/src/app/shared/components';

@Component({
	standalone: true,
	imports: [NgxTable, ReactiveFormsModule, CustomRadioButtonComponent],
	selector: 'table-three-demo',
	templateUrl: './table-three.demo.component.html',
})
export class TableThreeDemoComponent {
	control: FormControl<number[]> = new FormControl();
	customControl: FormControl<number[]> = new FormControl();
}
