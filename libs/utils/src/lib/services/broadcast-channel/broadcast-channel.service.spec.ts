import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Subscription } from 'rxjs';
import { BroadcastChannelService } from './broadcast-channel.service';

class MockBroadcastChannel {
	private listeners: { [key: string]: Function[] } = {};

	constructor(public name: string) {}

	postMessage(message: any) {
		if (this.listeners['message']) {
			this.listeners['message'].forEach((listener) => listener({ data: message }));
		}
	}

	close() {
		this.listeners = {};
	}

	addEventListener(event: string, listener: Function) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(listener);
	}

	removeEventListener(event: string, listener: Function) {
		if (!this.listeners[event]) {
			return;
		}

		this.listeners[event] = this.listeners[event].filter((l) => l !== listener);
	}
}

// Replace the global BroadcastChannel with the mock
(globalThis as any).BroadcastChannel = MockBroadcastChannel;
// Prevent the window from reloading
window.onbeforeunload = jasmine.createSpy();

describe('BroadcastChannelService', () => {
	describe('in browser', () => {
		let service: BroadcastChannelService;
		let subscriptions: Subscription[] = [];

		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [BroadcastChannelService, { provide: PLATFORM_ID, useValue: 'browser' }],
			});

			service = TestBed.inject(BroadcastChannelService);
		});

		afterEach(() => {
			subscriptions.forEach((sub) => sub.unsubscribe());
			subscriptions = [];
		});

		describe('initChannel', () => {
			it('should return early if channelName is not provided', () => {
				const consoleWarnSpy = spyOn(console, 'warn');

				service.initChannel('');

				expect(consoleWarnSpy).toHaveBeenCalledWith('channelName is required');
			});

			it('should initialize a new BroadcastChannel instance', () => {
				service.initChannel('testChannel');

				expect(service['broadcastChannel']['testChannel']).toBeDefined();
			});
		});

		describe('closeChannel', () => {
			it('should return early if channelName is not provided', () => {
				const consoleWarnSpy = spyOn(console, 'warn');

				service.closeChannel('');

				expect(consoleWarnSpy).toHaveBeenCalledWith('channelName is required');
			});

			it('should return early if channel is not initialized', () => {
				service.closeChannel('nonExistentChannel');

				expect(service['broadcastChannel']['nonExistentChannel']).toBeUndefined();
			});

			it('should close a selected BroadcastChannel instance', () => {
				service.initChannel('testChannel');
				service.closeChannel('testChannel');

				expect(service['broadcastChannel']['testChannel']).toBeUndefined();
			});
		});

		describe('postMessage', () => {
			it('should return early if channelName is not provided', () => {
				const consoleWarnSpy = spyOn(console, 'warn');

				service.postMessage('', 'message');

				expect(consoleWarnSpy).toHaveBeenCalledWith('channelName is required');
			});

			it('should return early if channel is not initialized', () => {
				const consoleWarnSpy = spyOn(console, 'warn');

				service.postMessage('nonExistentChannel', 'message');

				expect(consoleWarnSpy).toHaveBeenCalledWith(
					'BroadcastChannel not initialized, message not sent',
					'message'
				);
			});

			it('should send a message to a selected BroadcastChannel instance', (done) => {
				service.initChannel('testChannel');

				service['broadcastChannel'].testChannel.addEventListener('message', (event) => {
					expect(event.data).toBe('message');
					done();
				});

				service.postMessage('testChannel', 'message');
			});
		});

		describe('selectChannel', () => {
			it('should return early if channelName is not provided', (done) => {
				const consoleWarnSpy = spyOn(console, 'warn');
				subscriptions.push(
					service.selectChannel('').subscribe({
						complete: () => {
							expect(consoleWarnSpy).toHaveBeenCalledWith('channelName is required');

							done();
						},
					})
				);
			});

			it('should select the broadcast channel and return an observable of its message event', (done) => {
				service.initChannel('testChannel');

				subscriptions.push(
					service.selectChannel('testChannel').subscribe((event) => {
						expect(event.data).toBe('message');

						done();
					})
				);

				service.postMessage('testChannel', 'message');
			});
		});
	});

	describe('not in browser', () => {
		let service: BroadcastChannelService;

		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [BroadcastChannelService, { provide: PLATFORM_ID, useValue: 'server' }],
			});

			service = TestBed.inject(BroadcastChannelService);
		});

		describe('initChannel', () => {
			it('should return early if platform is not browser', () => {
				service.initChannel('testChannel');

				expect(service['broadcastChannel']['testChannel']).toBeUndefined();
			});
		});
	});
});
