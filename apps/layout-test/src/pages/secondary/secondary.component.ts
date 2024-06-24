import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgxTourItemDirective } from '@ngx/tour';

@Component({
	selector: 'secondary',
	templateUrl: './secondary.component.html',
	standalone: true,
	imports: [NgxTourItemDirective, CommonModule],
})
export class SecondaryComponent {
	public data$ = new BehaviorSubject(undefined);

	ngOnInit() {
		setTimeout(() => {
			this.data$.next('Hello!');
		}, 2000);
	}
}
