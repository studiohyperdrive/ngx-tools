// Iben: This mock provides an implementation to the CDK Overlay
export const OverlayMock: any = {
	position: jest.fn(),
	scrollStrategies: {
		block: jest.fn(),
	},
	create: jest.fn(),
};
