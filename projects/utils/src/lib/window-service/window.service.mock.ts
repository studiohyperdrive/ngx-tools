import { BehaviorSubject } from 'rxjs';

export const windowMock = {
	addEventListener: jasmine.createSpy(),
	defaultView: {
		scrollTo: () => null,
		addEventListener: () => null,
		innerWidth: 720,
	},
};

export const windowServiceMock = (width: number = 1200) => ({
	width: new BehaviorSubject(width),
	window: windowMock,
	scrollTo: () => null,
	hasDocument: () => true,
	isBrowser: () => true,
});
