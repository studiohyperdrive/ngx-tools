import type { NgxTourStepComponent } from '../abstracts';

/** This mock provides an implementation to the CDK Overlay */
export const OverlayMock = (component: NgxTourStepComponent<any>): any => ({
	position: jest.fn().mockReturnValue({
		global: jest.fn().mockReturnValue({
			centerHorizontally: jest.fn().mockReturnThis(),
			centerVertically: jest.fn().mockReturnThis(),
		}),
	}),
	scrollStrategies: {
		block: jest.fn(),
		noop: jest.fn(),
	},
	create: jest.fn().mockReturnValue({
		attach: jest.fn().mockReturnValue({
			instance: component,
		}),
		dispose: jest.fn(),
	}),
});
