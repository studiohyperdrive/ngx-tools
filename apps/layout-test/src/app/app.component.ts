import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
	NgxConfigurableLayoutComponent,
	NgxConfigurableLayoutItemComponent,
	NgxConfigurableLayoutGrid,
} from '@ngx/layout';

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
	public control: FormControl<NgxConfigurableLayoutGrid> = new FormControl([]);
	public isActive: FormControl<boolean> = new FormControl(false);
	public dragAndDrop: FormControl<boolean> = new FormControl(false);

	ngOnInit() {
		this.control.valueChanges.subscribe(console.log);

		setTimeout(() => {
			this.control.patchValue([
				[
					{ key: '1', isActive: true },
					{ key: '2', isActive: true },
					{ key: 'a', isActive: false },
				],
				[{ key: 'b', isActive: true }],
			]);
		}, 5000);
	}
}
