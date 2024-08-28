import { Component } from '@angular/core';

import { NgxTooltipAbstractComponent } from '../../abstracts';
import { NgxTooltipService } from './tooltip.service';

@Component({
	selector: 'test-tooltip',
	template: `{{ text }}`,
	standalone: true,
})
class TestTooltipComponent extends NgxTooltipAbstractComponent {}

describe('NgxTooltipService', () => {
	const overlayRef: any = {
		updatePositionStrategy: jasmine.createSpy(),
		attach: jasmine
			.createSpy()
			.and.returnValue({ instance: { text: '', position: '', postionClass: '' } }),
		detach: jasmine.createSpy(),
		hasAttached: jasmine.createSpy(),
	};
	const overlay: any = {
		create: jasmine.createSpy().and.returnValue(overlayRef),
		scrollStrategies: {
			reposition: jasmine.createSpy(),
		},
	};
	const overlayPositionBuilder: any = {
		flexibleConnectedTo: jasmine.createSpy().and.returnValue({
			withPositions: jasmine.createSpy(),
		}),
	};

	let service: NgxTooltipService;

	beforeEach(() => {
		service = new NgxTooltipService(
			{ component: TestTooltipComponent },
			overlay,
			overlayPositionBuilder
		);
	});

	it('should attach a tooltip', () => {
		service.showToolTip({ text: 'Hello', elementRef: {} as any });

		expect(overlay.create).toHaveBeenCalled();
		expect(overlayRef.attach).toHaveBeenCalled();
	});

	it('should remove a tooltip', () => {
		service.showToolTip({ text: 'Hello', elementRef: {} as any });
		service.removeToolTip();

		expect(overlayRef.detach).toHaveBeenCalled();
	});

	it('should not remove a tooltip when the current tooltip is active', () => {
		service.showToolTip({ text: 'Hello', elementRef: {} as any });
		service.setTooltipActive(true);
		service.removeToolTip();

		expect(overlayRef.detach).not.toHaveBeenCalled();
	});
});
