export interface ExpressStatusResponse {
	project: {
		name: string;
		version: string;
		environment: string;
		context: string;
	};
	node: {
		version: string;
		timezone: string;
		time: string;
	};
	success: boolean;
}
