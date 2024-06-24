import { Component } from '@angular/core';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { NgxTourStepComponent } from '../../abstracts';
import { NgxTourService } from './tour.service';

//TODO: Iben: Add Cypress tests so we can test the actual flow and the remaining methods

@Component({
	standalone: true,
	template: '',
})
class TestStepComponent extends NgxTourStepComponent {}

describe('NgxTourService', () => {
	let service: NgxTourService;

	const overlay: any = {
		position: jest.fn(),
		scrollStrategies: {
			block: jest.fn(),
		},
		create: jest.fn(),
	};

	beforeEach(() => {
		service = new NgxTourService(overlay, 'server', TestStepComponent);
	});

	it('should emit when the tour has started', () => {
		const spy = subscribeSpyTo(service.tourStarted$);

		service.startTour([{ title: 'hello', content: 'world' }]).subscribe();

		expect(spy.getValuesLength()).toEqual(1);
	});

	it('should emit when the tour has closed', () => {
		const spy = subscribeSpyTo(service.tourEnded$);

		service.startTour([{ title: 'hello', content: 'world' }]).subscribe();
		service.closeTour().subscribe();

		expect(spy.getValuesLength()).toEqual(1);
	});

	it('should emit the current step', () => {
		const spy = subscribeSpyTo(service.currentStep$);
		const indexSpy = subscribeSpyTo(service.currentIndex$);

		service.startTour([{ title: 'hello', content: 'world' }]).subscribe();

		expect(spy.getValues()).toEqual([{ title: 'hello', content: 'world' }]);
		expect(indexSpy.getValues()).toEqual([0]);
	});

	it('should start the tour at the provided index', () => {
		const spy = subscribeSpyTo(service.currentStep$);
		const indexSpy = subscribeSpyTo(service.currentIndex$);

		service
			.startTour(
				[
					{ title: 'hello', content: 'world' },
					{ title: 'step', content: 'two' },
				],
				undefined,
				1
			)
			.subscribe();

		expect(spy.getValues()).toEqual([{ title: 'step', content: 'two' }]);
		expect(indexSpy.getValues()).toEqual([0, 1]);
	});
});
