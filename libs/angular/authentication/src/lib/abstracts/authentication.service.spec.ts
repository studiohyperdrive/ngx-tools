import { AuthenticationResponse, AuthenticatedUserSession } from '@studiohyperdrive/types-auth';
import { Observable, of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { NgxAuthenticationAbstractService } from './authentication.service';

class TestAuthenticationService extends NgxAuthenticationAbstractService<
	AuthenticationResponse<
		{
			name: string;
		},
		AuthenticatedUserSession<'A' | 'B', 'Admin' | 'User'>
	>,
	any,
	any,
	void
> {
	protected signInUser(): Observable<
		AuthenticationResponse<
			{ name: string },
			AuthenticatedUserSession<'A' | 'B', 'Admin' | 'User'>,
			any
		>
	> {
		return of({
			user: {
				name: 'test',
			},
			session: {
				features: ['B'],
				permissions: ['User'],
			},
			metadata: {
				shouldUpdatePassword: false,
			},
		});
	}
	protected signOutUser(): Observable<void> {
		return of();
	}
}

describe('NgxAuthenticationAbstractService', () => {
	let service: TestAuthenticationService;

	beforeEach(() => {
		service = new TestAuthenticationService();
		service.signIn({}).subscribe();
	});

	describe('Features', () => {
		it('should return false if a feature is not present', () => {
			const spy = subscribeSpyTo(service.hasFeature(['A']));

			expect(spy.getLastValue()).toBe(false);
		});

		it('should return true if a feature is present', () => {
			const spy = subscribeSpyTo(service.hasFeature(['B']));

			expect(spy.getLastValue()).toBe(true);
		});

		it('should return true if one of the features is present when not all are needed', () => {
			const spy = subscribeSpyTo(service.hasFeature(['B', 'A'], false));

			expect(spy.getLastValue()).toBe(true);
		});

		it('should return false if one of the features is present when all are needed', () => {
			const spy = subscribeSpyTo(service.hasFeature(['B', 'A']));

			expect(spy.getLastValue()).toBe(false);
		});
	});

	describe('Permissions', () => {
		it('should return false if a permission is not present', () => {
			const spy = subscribeSpyTo(service.hasPermission(['Admin']));

			expect(spy.getLastValue()).toBe(false);
		});

		it('should return true if a permission is present', () => {
			const spy = subscribeSpyTo(service.hasPermission(['User']));

			expect(spy.getLastValue()).toBe(true);
		});

		it('should return true if one of the permissions is present when not all are needed', () => {
			const spy = subscribeSpyTo(service.hasPermission(['Admin', 'User'], false));

			expect(spy.getLastValue()).toBe(true);
		});

		it('should return false if one of the permissions is present when all are needed', () => {
			const spy = subscribeSpyTo(service.hasPermission(['Admin', 'User']));

			expect(spy.getLastValue()).toBe(false);
		});
	});

	describe('Data', () => {
		it('should return the user data', () => {
			const spy = subscribeSpyTo(service.user$);

			expect(spy.getLastValue()).toEqual({ name: 'test' });
		});

		it('should return the session data', () => {
			const spy = subscribeSpyTo(service.session$);

			expect(spy.getLastValue()).toEqual({ features: ['B'], permissions: ['User'] });
		});

		it('should return the meta data', () => {
			const spy = subscribeSpyTo(service.metadata$);

			expect(spy.getLastValue()).toEqual({ shouldUpdatePassword: false });
		});
	});

	describe('Status', () => {
		it('should be marked as authenticated', () => {
			const spy = subscribeSpyTo(service.isAuthenticated$);

			expect(spy.getValues()).toEqual([true]);
		});
	});
});
