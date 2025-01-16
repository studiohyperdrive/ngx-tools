import { BehaviorSubject } from 'rxjs';

/*
 * This windowMock constant return an object with a selected spy.
 * The reason why the spy is not provided by default is for this mock
 * to work on both Jest and Jasmine based test-suites.
 *
 * example:
 * NgxWindowMock(jasmine.createSpy());
 * */
export const NgxWindowMock = (spy: unknown) => ({
	addEventListener: spy,
	defaultView: {
		scrollTo: () => null,
		innerWidth: 720,
		addEventListener: spy,
	},
});

/*
 * Provide a spy for your testing framework because the windowMock requires it.
 *
 * The reason why the spy is not provided by default is for this mock
 * to work on both Jest and Jasmine based test-suites.
 *
 * example:
 * NgxWindowServiceMock(jasmine.createSpy(), 1440);
 * */
export const NgxWindowServiceMock = (spy: unknown, width: number = 1200) => {
	const window = NgxWindowMock(spy) as unknown as Window;
	return {
		width: new BehaviorSubject(width),
		window: NgxWindowMock(spy),
		scrollTo: () => null,
		hasDocument: () => true,
		isBrowser: () => true,
		runInBrowser: (callback: (data: { browserWindow: Window }) => void) =>
			callback({ browserWindow: window }),
	};
};
