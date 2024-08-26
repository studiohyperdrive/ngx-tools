import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { MockTourStepComponent, OverlayMock } from '../../mocks';
import { NgxTourService } from './tour.service';

describe('NgxTourService Server', () => {
	let service: NgxTourService;

	beforeEach(() => {
		service = new NgxTourService(
			OverlayMock(new MockTourStepComponent()),
			'server',
			MockTourStepComponent
		);
	});

	it('should not start the tour', (done) => {
		const tourStartedSpy = subscribeSpyTo(service.tourStarted$);
		const tourEndedSpy = subscribeSpyTo(service.tourEnded$);
		const tourActiveSpy = subscribeSpyTo(service.tourActive$);
		const consoleSpy = jest.spyOn(console, 'warn');

		service.startTour([{ title: 'hello', content: 'world' }]).subscribe(() => done());

		expect(tourStartedSpy.receivedNext()).toBe(false);
		expect(tourEndedSpy.receivedNext()).toBe(false);
		expect(tourActiveSpy.getValues()).toEqual([false]);
		expect(consoleSpy).toHaveBeenCalledTimes(1);
	});
});
