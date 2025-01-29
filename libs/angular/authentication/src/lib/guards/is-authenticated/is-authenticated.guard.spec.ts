import { BehaviorSubject, Observable } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { NgxAuthenticationServiceMock, NgxAuthenticationResponseMock } from '../../mocks';
import { NgxAuthenticationStatus } from '../../types';
import { NgxAuthenticationServiceToken } from '../../tokens';
import { NgxIsAuthenticatedGuard } from './is-authenticated.guard';

describe('NgxIsAuthenticatedGuard', () => {
	const authenticationResponse = new BehaviorSubject(NgxAuthenticationResponseMock);
	const hasAuthenticated = new BehaviorSubject<NgxAuthenticationStatus>('signed-in');
	const authenticationService: any = NgxAuthenticationServiceMock({
		signInSpy: jest.fn(),
		signOutSpy: jest.fn(),
		hasFeatureSpy: jest.fn(),
		hasPermissionSpy: jest.fn(),
		authenticationResponse,
		hasAuthenticated,
	});
	const route: any = {};
	const router: any = {
		navigate: jest.fn(),
		navigateByUrl: jest.fn(),
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

	describe('Authenticated', () => {
		it('should return true if the user can continue when authenticated', () => {
			TestBed.runInInjectionContext(() => {
				const spy = subscribeSpyTo(
					NgxIsAuthenticatedGuard(
						{ data: { shouldBeAuthenticated: true } } as any,
						undefined
					) as Observable<boolean>
				);

				expect(spy.getValues()).toEqual([true]);
			});
		});

		it('should return void if the user cannot continue when authenticated', () => {
			TestBed.runInInjectionContext(() => {
				const spy = subscribeSpyTo(
					NgxIsAuthenticatedGuard(
						{ data: { shouldBeAuthenticated: false } } as any,
						undefined
					) as Observable<boolean>
				);

				expect(spy.getValues()).toEqual([]);
			});
		});
	});

	describe('Not authenticated', () => {
		beforeEach(() => {
			authenticationResponse.next(undefined);
			hasAuthenticated.next('signed-out');
		});
		it('should return true if the user can continue when not authenticated', () => {
			TestBed.runInInjectionContext(() => {
				const spy = subscribeSpyTo(
					NgxIsAuthenticatedGuard(
						{ data: { shouldBeAuthenticated: false } } as any,
						undefined
					) as Observable<boolean>
				);

				expect(spy.getValues()).toEqual([true]);
			});
		});

		it('should return void if the user cannot continue when not authenticated', () => {
			TestBed.runInInjectionContext(() => {
				const spy = subscribeSpyTo(
					NgxIsAuthenticatedGuard(
						{ data: { shouldBeAuthenticated: true } } as any,
						undefined
					) as Observable<boolean>
				);

				expect(spy.getValues()).toEqual([]);
			});
		});
	});
});
