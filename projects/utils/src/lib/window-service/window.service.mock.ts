import { BehaviorSubject } from 'rxjs';

export const windowMock = {
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
