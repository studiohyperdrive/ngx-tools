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
	},
});

export const windowServiceMock = (width: number = 1200) => ({
	width: new BehaviorSubject(width),
	window: windowMock,
	scrollTo: () => null,
	hasDocument: () => true,
	isBrowser: () => true,
});
