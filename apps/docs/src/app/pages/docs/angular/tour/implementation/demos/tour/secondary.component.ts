import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgxTourItemDirective } from '@ngx/tour';

@Component({
	selector: 'secondary',
	templateUrl: './secondary.component.html',
	imports: [NgxTourItemDirective, CommonModule],
})
export class SecondaryComponent implements OnInit {
	public data$ = new BehaviorSubject(undefined);

	ngOnInit() {
		setTimeout(() => {
			this.data$.next('Hello!');
		}, 2000);
	}
}
