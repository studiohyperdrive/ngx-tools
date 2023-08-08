import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	public readonly data = [
		{
			name: 'World',
			firstName: 'Hello',
			active: false,
			id: 'id1',
		},
		{
			name: 'Tools',
			firstName: 'Ngx',
			active: true,
			id: 'id3',
		},
		{
			name: 'BCD',
			firstName: 'A',
			active: true,
			id: 'id2',
		},
	];

	public readonly columns = ['firstName', 'name', 'active'];

	public form = new FormControl();

	public setFormValue() {
		this.form.patchValue('id2');
	}
}
