import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { WindowService } from './window.service';
import { windowMock } from './window.service.mock';

describe('WindowService', () => {
	describe('with no document', () => {
		let service: WindowService;

		beforeEach(async () => {
			await TestBed.configureTestingModule({
				providers: [{
					provide: DOCUMENT,
					useValue: null,
				}, {
					provide: PLATFORM_ID,
					useValue: 'server',
				},
					WindowService,
				],
			}).compileComponents();

			service = TestBed.inject(WindowService);
		});

		describe('construct', () => {
			it('should set the width$ BehaviourSubject to a default value of 1200 for SSR', () => {
				expect(service.width$.getValue()).toBe(1200);
			});
		});

		describe('hasDocument', () => {
			it('should return false', () => {
				expect(service.hasDocument()).toBeFalse();
			});
		});

		describe('isBrowser', () => {
			it('should return false', () => {
				expect(service.isBrowser()).toBeFalse();
			});
		});
	});

	describe('with a document', () => {
		let service: WindowService;

		beforeEach(async () => {
			await TestBed.configureTestingModule({
				providers: [{
					provide: DOCUMENT,
					useValue: windowMock,
				}, {
					provide: PLATFORM_ID,
					useValue: 'browser',
				},
					WindowService,
				],
			}).compileComponents();

			service = TestBed.inject(WindowService);
		});

		describe('construct', () => {
			it('should set the width$ BehaviourSubject to the value of the window-width', () => {
				expect(service.width$.getValue()).toBe(windowMock.defaultView.innerWidth);
			});
		});

		describe('scrollTo', () => {
			it('should use the window.scrollTo to move to a position on the page', () => {
				// tslint:disable-next-line: no-string-literal
				const spy = spyOn(service['window'], 'scrollTo');

				service.scrollTo(200);

				expect(spy).toHaveBeenCalledWith(0, 200);
			});
		});

		describe('hasDocument', () => {
			it('should return true', () => {
				expect(service.hasDocument()).toBeTrue();
			});
		});

		describe('isBrowser', () => {
			it('should return true', () => {
				expect(service.isBrowser()).toBeTrue();
			});
		});
	});
});
