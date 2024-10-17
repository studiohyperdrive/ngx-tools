import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { EMPTY, fromEvent, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class BroadcastChannelService {
	private broadcastChannel: Record<string, BroadcastChannel> = {};

	constructor(@Inject(PLATFORM_ID) private platformId: string) {}

	/**
	 * initChannel
	 *
	 * The initChannel method initializes a new BroadcastChannel instance.
	 *
	 * @param channelName{string} - The name of the Broadcast Channel.
	 */
	public initChannel(channelName: string): void {
		if (!channelName) {
			console.warn('channelName is required');

			return;
		}

		if (isPlatformBrowser(this.platformId) && !this.broadcastChannel[channelName]) {
			this.broadcastChannel[channelName] = new BroadcastChannel(channelName);
		}
	}

	/**
	 * closeChannel
	 *
	 * The closeChannel method closes a selected BroadcastChannel instance.
	 *
	 * @param channelName{string} - The name of the Broadcast Channel.
	 */
	public closeChannel(channelName: string): void {
		if (!channelName) {
			console.warn('channelName is required');

			return;
		}

		if (!this.broadcastChannel[channelName]) {
			return;
		}

		this.broadcastChannel[channelName].close();
		delete this.broadcastChannel[channelName];
	}

	/**
	 * postMessage
	 *
	 * The postMessage method sends a message to a selected BroadcastChannel instance.
	 *
	 * @param channelName{string} - The name of the Broadcast Channel.
	 * @param message{any} - The payload to send through the channel.
	 */
	public postMessage(channelName: string, message: any): void {
		if (!channelName) {
			console.warn('channelName is required');

			return;
		}

		if (!this.broadcastChannel[channelName]) {
			console.warn('BroadcastChannel not initialized, message not sent', message);

			return;
		}

		this.broadcastChannel[channelName].postMessage(message);
	}

	/**
	 * subscribeToChannel
	 *
	 * The subscribeToChannel method subscribes to the `message` (bc.onmessage) event of a selected BroadcastChannel instance.
	 *
	 * @param channelName{string} - The name of the Broadcast Channel.
	 * @returns Observable<MessageEvent> - The message event of the channel wrapped in an observable.
	 */
	public selectChannel(channelName: string): Observable<MessageEvent> {
		if (!channelName) {
			console.warn('channelName is required');

			return EMPTY;
		}

		return fromEvent<MessageEvent>(this.broadcastChannel[channelName], 'message');
	}
}
