import { NgxWindowMock } from '@studiohyperdrive/ngx-core';
import { WindowService } from './window.service';

describe('WindowService', () => {
	describe('with no document', () => {
		let service: WindowService;
		const document: any = null;
		const platform = 'server';

		beforeEach(() => {
			service = new WindowService(document, platform);
		});

		describe('construct', () => {
			it('should set the width$ BehaviorSubject to a default value of 1200 for SSR', () => {
				expect((service as any).widthSubject$.getValue()).toBe(1200);
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
		const document: any = NgxWindowMock(jasmine.createSpy());
		const platform = 'browser';

		beforeEach(() => {
			service = new WindowService(document, platform);
		});

		describe('construct', () => {
			it('should set the width$ BehaviorSubject to the value of the window-width', () => {
				expect((service as any).widthSubject$.getValue()).toBe(
					NgxWindowMock(jasmine.createSpy()).defaultView.innerWidth
				);
			});
		});

		describe('scrollTo', () => {
			it('should use the window.scrollTo to move to a position on the page', () => {
				service.window.scrollTo = jasmine.createSpy();

				service.scrollTo(200);

				expect(service.window.scrollTo).toHaveBeenCalledWith(0 as any, 200 as any);
			});
		});

		describe('hasDocument', () => {
			it('should return true', () => {
				expect(service.hasDocument()).toBeTrue();
			});
		});

		describe('scrollListeners', () => {
			it('should have called addEventListeners', () => {
				expect(service.window.addEventListener).toHaveBeenCalled();
			});
		});

		describe('isBrowser', () => {
			it('should return true', () => {
				expect(service.isBrowser()).toBeTrue();
			});
		});
	});
});
