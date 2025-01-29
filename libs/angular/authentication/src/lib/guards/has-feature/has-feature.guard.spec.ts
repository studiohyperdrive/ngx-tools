import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { NgxAuthenticationServiceMock, NgxAuthenticationResponseMock } from '../../mocks';
import { NgxAuthenticationServiceToken } from '../../tokens';
import { NgxHasFeatureGuard } from './has-feature.guard';

describe('NgxHasFeatureGuard', () => {
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

	const snapshotWithSingleFeature: any = {
		data: {
			feature: 'A',
			redirectTo: ['..'],
		},
	};
	const snapshotWithFeatureList: any = {
		data: {
			feature: ['A', 'B'],
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

	describe('Feature enabled:', () => {
		beforeEach(() => {
			authenticationService.hasFeature.mockReturnValue(of(true));
		});

		it('should return true when a feature is enabled', () => {
			TestBed.runInInjectionContext(() => {
				const spy = subscribeSpyTo(
					NgxHasFeatureGuard(snapshotWithSingleFeature, undefined) as Observable<boolean>
				);

				expect(spy.getValues()).toEqual([true]);
			});
		});

		it('should return true when a list of features is enabled', () => {
			TestBed.runInInjectionContext(() => {
				const spy = subscribeSpyTo(
					NgxHasFeatureGuard(snapshotWithFeatureList, undefined) as Observable<boolean>
				);

				expect(spy.getValues()).toEqual([true]);
			});
		});

		it('should allow redirect when the feature is active', () => {
			TestBed.runInInjectionContext(() => {
				const spy = subscribeSpyTo(
					NgxHasFeatureGuard(
						{
							data: {
								...snapshotWithSingleFeature,
								shouldNavigateOnFeature: true,
							},
						} as any,
						undefined
					) as Observable<boolean>
				);

				expect(spy.getValues()).toEqual([true]);
			});
		});
	});

	describe('Feature not enabled:', () => {
		beforeEach(() => {
			authenticationService.hasFeature.mockReturnValue(of(false));
		});

		it('should return void when a feature is not enabled', () => {
			TestBed.runInInjectionContext(() => {
				const spy = subscribeSpyTo(
					NgxHasFeatureGuard(snapshotWithSingleFeature, undefined) as Observable<boolean>
				);

				expect(spy.getValues()).toEqual([]);
			});
		});

		it('should return void when a list of features is not enabled', () => {
			TestBed.runInInjectionContext(() => {
				const spy = subscribeSpyTo(
					NgxHasFeatureGuard(snapshotWithFeatureList, undefined) as Observable<any>
				);

				expect(spy.getValues()).toEqual([]);
			});
		});

		it('should allow route navigation when the feature is active', () => {
			TestBed.runInInjectionContext(() => {
				const spy = subscribeSpyTo(
					NgxHasFeatureGuard(
						{
							data: {
								...snapshotWithSingleFeature,
								shouldNavigateOnFeature: true,
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
