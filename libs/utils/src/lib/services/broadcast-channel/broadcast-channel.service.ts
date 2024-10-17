import { Injectable } from '@angular/core';
import { EMPTY, fromEvent, Observable } from 'rxjs';
import { WindowService } from '../window-service/window.service';

@Injectable({
	providedIn: 'root',
})
export class NgxBroadcastChannelService {
	private broadcastChannel: Record<string, BroadcastChannel> = {};

	constructor(private readonly windowService: WindowService) {}

	/**
	 * initChannel
	 *
	 * The initChannel method initializes a new BroadcastChannel instance.
	 *
	 * @param args{ConstructorParameters<typeof BroadcastChannel>} - The arguments to pass to the BroadcastChannel constructor.
	 */
	public initChannel(...args: ConstructorParameters<typeof BroadcastChannel>): void {
		const [channelName] = args;

		if (!channelName) {
			console.error(
				'NgxUtils: There was an attempt to initialize a BroadcastChannel without providing a name.'
			);

			return;
		}

		if (this.windowService.isBrowser() && !this.broadcastChannel[channelName]) {
			this.broadcastChannel[channelName] = new BroadcastChannel(...args);
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
		if (!channelName || !this.broadcastChannel[channelName]) {
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
		if (!channelName || !this.broadcastChannel[channelName]) {
			console.error(
				'NgxUtils: There was an attempt to post a message to a channel without providing a name or the selected channel does not exist. The included message was:',
				message
			);

			return;
		}

		this.broadcastChannel[channelName].postMessage(message);
	}

	/**
	 * selectChannelMessages
	 *
	 * The selectChannelMessages method subscribes to the `message` (bc.onmessage) event of a selected BroadcastChannel instance.
	 *
	 * @param channelName{string} - The name of the Broadcast Channel.
	 * @returns Observable<MessageEvent> - The message event of the channel wrapped in an observable.
	 */
	public selectChannelMessages(channelName: string): Observable<MessageEvent> {
		if (!channelName || !this.broadcastChannel[channelName]) {
			console.error(
				"NgxUtils: There was an attempt to select a BroadcastChannel's messages without providing a name or the selected channel does not exist."
			);

			return EMPTY;
		}

		return fromEvent<MessageEvent>(this.broadcastChannel[channelName], 'message');
	}

	/**
	 * selectChannelMessageErrors
	 *
	 * The selectChannelMessageErrors method subscribes to the `messageerror` (bc.onmessageerror) event of a selected BroadcastChannel instance.
	 *
	 * @param channelName{string} - The name of the Broadcast Channel.
	 * @returns Observable<MessageEvent> - The messageerror event of the channel wrapped in an observable.
	 */
	public selectChannelMessageErrors(channelName: string): Observable<MessageEvent> {
		if (!channelName || !this.broadcastChannel[channelName]) {
			console.error(
				"NgxUtils: There was an attempt to select a BroadcastChannel's message errors without providing a name or the selected channel does not exist."
			);

			return EMPTY;
		}

		return fromEvent<MessageEvent>(this.broadcastChannel[channelName], 'messageerror');
	}
}
