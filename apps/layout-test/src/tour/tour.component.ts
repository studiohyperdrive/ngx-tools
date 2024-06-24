import { Component } from '@angular/core';

import { NgxTourStepComponent } from '@ngx/tour';

@Component({
	selector: 'tour-item',
	standalone: true,
	styleUrl: './tour.component.scss',
	template: `
		{{ title }}
		{{ content }}
		@if(currentStep < amountOfSteps -1) {
		<button (click)="handleInteraction.emit('next')">Next</button>
		} @if(currentStep !== 0) {

		<button (click)="handleInteraction.emit('back')">Previous</button>
		}

		<button (click)="handleInteraction.emit('close')">Close</button>
	`,
})
export class TourItemComponent extends NgxTourStepComponent {}
