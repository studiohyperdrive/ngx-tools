import { of } from 'rxjs';

export /**
 * Returns a mock for the NgxAuthenticatedHttpClient. By default each methods returns an empty observable
 *
 * @param  configuration - Configuration to replace one of the methods with a custom method
 */
const NgxMockAuthenticatedHttpClient = (configuration: {
	download?: unknown;
	get?: unknown;
	patch?: unknown;
	put?: unknown;
	delete?: unknown;
	post?: unknown;
}) => {
	const defaultFunction = () => of();
	return {
		get: configuration.get || defaultFunction,
		download: configuration.download || defaultFunction,
		delete: configuration.delete || defaultFunction,
		patch: configuration.patch || defaultFunction,
		post: configuration.post || defaultFunction,
		put: configuration.put || defaultFunction,
	};
};
