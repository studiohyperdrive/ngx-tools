import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxTable } from '@ngx/table';

@Component({
	imports: [NgxTable, ReactiveFormsModule],
	selector: 'selectable-radiobutton-demo',
	templateUrl: './selectable-radiobutton.demo.component.html',
})
export class SelectableRadiobuttonDemoComponent {
	public control: FormControl<number[]> = new FormControl();
	public customControl: FormControl<number[]> = new FormControl();
}
