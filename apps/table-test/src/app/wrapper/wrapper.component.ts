import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-wrapper',
	imports: [CommonModule],
	standalone: true,
	template: `
		<p *ngIf="!contentVisible">Loading...</p>
		<ng-content *ngIf="contentVisible"></ng-content>
	`,
})
export class WrapperComponent {
	@Input() public contentVisible: boolean = true;
}
