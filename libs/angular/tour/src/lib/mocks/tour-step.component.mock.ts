import { Component } from '@angular/core';
import { NgxTourStepComponent } from '../abstracts';

// Iben: This mock tour step component can be used where needed
@Component({
	selector: 'mock-tour-step-component',
	template: '',
	standalone: true,
})
export class MockTourStepComponent extends NgxTourStepComponent {}
