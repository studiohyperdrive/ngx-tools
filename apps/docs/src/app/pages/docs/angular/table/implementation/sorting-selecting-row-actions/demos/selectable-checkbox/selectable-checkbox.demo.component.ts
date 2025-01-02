import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomCheckboxComponent } from '../../../../../../../../shared/components';
import { NgxTable } from '@ngx/table';

@Component({
	imports: [NgxTable, CustomCheckboxComponent, ReactiveFormsModule],
	selector: 'selectable-checkbox-demo',
	templateUrl: './selectable-checkbox.demo.component.html',
})
export class SelectableCheckboxDemoComponent {
	public control: FormControl<number[]> = new FormControl();
	public customControl: FormControl<string[]> = new FormControl();
}
