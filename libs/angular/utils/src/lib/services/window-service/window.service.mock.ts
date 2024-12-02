import { BehaviorSubject } from 'rxjs';

/*
 * This windowMock constant return an object with a selected spy.
 * The reason why the spy is not provided by default is for this mock
 * to work on both Jest and Jasmine based test-suites.
 *
 * example:
 * windowMock(jasmine.createSpy());
 * */
export const windowMock = (spy: unknown) => ({
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
 * windowServiceMock(jasmine.createSpy(), 1440);
 * */
export const windowServiceMock = (spy: unknown, width: number = 1200) => ({
	width: new BehaviorSubject(width),
	window: windowMock(spy),
	scrollTo: () => null,
	hasDocument: () => true,
	isBrowser: () => true,
	runInBrowser: (callback: () => void) => callback(),
});
