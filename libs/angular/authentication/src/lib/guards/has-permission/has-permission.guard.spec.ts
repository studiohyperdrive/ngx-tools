import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { NgxAuthenticationServiceMock, NgxAuthenticationResponseMock } from '../../mocks';
import { NgxAuthenticationServiceToken } from '../../tokens';
import { NgxHasPermissionGuard } from './has-permission.guard';

describe('NgxHasPermissionGuard', () => {
	const authenticationService: any = NgxAuthenticationServiceMock({
		signInSpy: jest.fn(),
		signOutSpy: jest.fn(),
		hasFeatureSpy: jest.fn(),
		hasPermissionSpy: jest.fn(),
		authenticationResponse: new BehaviorSubject(NgxAuthenticationResponseMock),
		hasAuthenticated: new BehaviorSubject('signed-in'),
	});
	const route: any = {};
	const router: any = {
		navigate: jest.fn(),
		navigateByUrl: jest.fn(),
	};

	const snapshotWithSinglePermission: any = {
		data: {
			permission: 'A',
			redirectTo: ['..'],
		},
	};
	const snapshotWithPermissionList: any = {
		data: {
			permission: ['A', 'B'],
			redirectTo: ['..'],
		},
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: NgxAuthenticationServiceToken,
					useValue: authenticationService,
				},
				{
					provide: ActivatedRoute,
					useValue: route,
				},
				{
					provide: Router,
					useValue: router,
				},
			],
		});
	});

	describe('Permission enabled:', () => {
		beforeEach(() => {
			authenticationService.hasPermission.mockReturnValue(of(true));
		});

		it('should return true when a permission is enabled', () => {
			TestBed.runInInjectionContext(() => {
				const spy = subscribeSpyTo(
					NgxHasPermissionGuard(
						snapshotWithSinglePermission,
						undefined
					) as Observable<boolean>
				);

				expect(spy.getValues()).toEqual([true]);
			});
		});

		it('should return true when a list of permissions is enabled', () => {
			TestBed.runInInjectionContext(() => {
				const spy = subscribeSpyTo(
					NgxHasPermissionGuard(
						snapshotWithPermissionList,
						undefined
					) as Observable<boolean>
				);

				expect(spy.getValues()).toEqual([true]);
			});
		});

		it('should allow redirect when the permission is active', () => {
			TestBed.runInInjectionContext(() => {
				const spy = subscribeSpyTo(
					NgxHasPermissionGuard(
						{
							data: {
								...snapshotWithSinglePermission,
								shouldNavigateOnPermission: true,
							},
						} as any,
						undefined
					) as Observable<boolean>
				);

				expect(spy.getValues()).toEqual([true]);
			});
		});
	});

	describe('Permission not enabled:', () => {
		beforeEach(() => {
			authenticationService.hasPermission.mockReturnValue(of(false));
		});

		it('should return void when a permission is not enabled', () => {
			TestBed.runInInjectionContext(() => {
				const spy = subscribeSpyTo(
					NgxHasPermissionGuard(
						snapshotWithSinglePermission,
						undefined
					) as Observable<boolean>
				);

				expect(spy.getValues()).toEqual([]);
			});
		});

		it('should return void when a list of permissions is not enabled', () => {
			TestBed.runInInjectionContext(() => {
				const spy = subscribeSpyTo(
					NgxHasPermissionGuard(snapshotWithPermissionList, undefined) as Observable<any>
				);

				expect(spy.getValues()).toEqual([]);
			});
		});

		it('should allow route navigation when the permission is active', () => {
			TestBed.runInInjectionContext(() => {
				const spy = subscribeSpyTo(
					NgxHasPermissionGuard(
						{
							data: {
								...snapshotWithSinglePermission,
								shouldNavigateOnPermission: true,
							},
						} as any,
						undefined
					) as Observable<boolean>
				);

				expect(spy.getValues()).toEqual([true]);
			});
		});
	});
});
