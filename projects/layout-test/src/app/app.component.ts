import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
	NgxConfigurableLayoutComponent,
	NgxConfigurableLayoutItemComponent,
	NgxGridLayoutFormOptions,
	NgxRowColumnCountOption,
} from 'layout';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	standalone: true,
	imports: [
		CommonModule,
		NgxConfigurableLayoutComponent,
		NgxConfigurableLayoutItemComponent,
		ReactiveFormsModule,
	],
})
export class AppComponent {
	public rowOrderForm: FormControl<string[]> = new FormControl<string[]>(['1', 'b']);

	public gridLayoutForm: FormGroup<NgxGridLayoutFormOptions> =
		new FormGroup<NgxGridLayoutFormOptions>({
			columns: new FormControl<NgxRowColumnCountOption>(undefined),
			rows: new FormControl<NgxRowColumnCountOption>(undefined),
		});
}
