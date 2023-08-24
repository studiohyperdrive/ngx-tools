import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	public dataSet1 = [
		{
			name: 'World',
			firstName: 'Hello',
			active: false,
			id: 'id1',
		},
		{
			name: 'Hyperdrive',
			firstName: 'Studio',
			active: true,
			id: 'SHD',
		},
	];

	public dataSet2 = [
		{
			name: 'Tools',
			firstName: 'Ngx',
			active: true,
			id: 'id3',
		},
	];

	public data = this.dataSet1;

	public readonly columns = ['firstName', 'name', 'active'];

	public showDetail = true;

	public form = new FormControl();

	public isWrapperShown = true;

	public setFormValue() {
		this.form.patchValue('id1');
	}

	public toggleDetailView() {
		this.showDetail = !this.showDetail;
	}

	public removeWrapper() {
		// Hide <ng-content>
		this.isWrapperShown = false;

		// Toggle data source
		this.data = this.data === this.dataSet1 ? this.dataSet2 : this.dataSet1;

		// Show <ng-content> after delay
		setTimeout(() => {
			this.isWrapperShown = true;
		}, 1000);
	}

	public rowEmitted(data: any) {
		console.log(data);
	}
}
