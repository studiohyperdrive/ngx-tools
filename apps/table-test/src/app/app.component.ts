import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { WrapperComponent } from './wrapper/wrapper.component';
import { NgxCurrencyTableCellComponent, NgxTable } from '@ngx/table';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [
		WrapperComponent,
		ReactiveFormsModule,
		AsyncPipe,
		JsonPipe,
		NgxTable,
		NgxCurrencyTableCellComponent,
	],
})
export class AppComponent {
	private currentSet = 'dataSet1';

	public dataSet1 = [
		{
			name: 'World',
			firstName: 'Hello',
			active: false,
			id: 'id1',
			hello: 'world',
			amount: 37,
		},
		{
			name: 'Hyperdrive',
			firstName: 'Studio',
			active: true,
			id: 'SHD',
			hello: 'world',
			amount: 5000,
		},
	];

	public dataSet2 = [
		{
			name: 'Tools',
			firstName: 'Ngx',
			active: true,
			id: 'id3',
			hello: 'world',
			amount: 0.5,
		},
	];

	public data = new BehaviorSubject(this.dataSet1);

	public readonly columns = ['firstName', 'name', 'amount', 'active'];

	public showDetail = true;

	public form = new FormControl();

	public isWrapperShown = true;

	public loading = false;

	public setFormValue() {
		this.form.patchValue(['id1']);
	}

	public toggleDetailView() {
		this.showDetail = !this.showDetail;
	}

	public toggleDataSet() {
		this.loading = true;

		setTimeout(() => {
			this.data.next(this.currentSet === 'dataSet1' ? this.dataSet2 : this.dataSet1);
			this.currentSet = this.currentSet === 'dataSet1' ? 'dataSet2' : 'dataSet1';
			this.loading = false;
		}, 2000);
	}

	public rowEmitted(data: any) {
		console.log(data);
	}
}
