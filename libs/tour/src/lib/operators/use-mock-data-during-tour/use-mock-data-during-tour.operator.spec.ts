import { ComponentFixture, TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { PLATFORM_ID } from '@angular/core';
import { provideNgxTourConfiguration } from '../../providers';
import { MockTourHolderComponent, MockTourStepComponent } from '../../mocks';

describe('useMockDataDuringTour', () => {
	let fixture: ComponentFixture<MockTourHolderComponent>;
	let component: MockTourHolderComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MockTourHolderComponent],
			providers: [
				provideNgxTourConfiguration(MockTourStepComponent),
				{ provide: PLATFORM_ID, useValue: 'server' },
			],
		});

		fixture = TestBed.createComponent(MockTourHolderComponent);
		component = fixture.componentInstance;
	});

	it('should give the actual data if the tour is not active', () => {
		TestBed.runInInjectionContext(() => {
			expect(subscribeSpyTo(component.data$).getLastValue()).toEqual('Hello world!');
		});
	});

	it('should give the mock data when the tour is active', () => {
		TestBed.runInInjectionContext(() => {
			component.startTour();

			expect(subscribeSpyTo(component.data$).getLastValue()).toEqual('World hello!');
		});
	});
});
