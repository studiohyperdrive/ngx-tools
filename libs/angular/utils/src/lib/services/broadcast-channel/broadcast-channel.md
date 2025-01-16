# NgxBroadcastChannelService

This `NgxBroadcastChannelService` service wraps around the [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) and provides some handy functionality on top of some safety measures. It takes SSR into account and will only create channels while in the browser.

It holds a Record of potential BroadcastChannels with the key being their name. By doing this, multiple channels can exist within the same application simultaneously.

## Methods

### initChannel

The `initChannel` method will create a new BroadcastChannel with the given name.

```typescript
import { NgxBroadcastChannelService } from '@studiohyperdrive/ngx-utils';

export class YourComponent {
	constructor(private readonly broadcastChannelService: NgxBroadcastChannelService) {}

	public ngOnInit(): void {
		this.broadcastChannelService.initChannel('your-channel-name');
	}
}
```

#### Safety

The `initChannel` uses the `NgxWindowService` check to ensure it only runs in the browser, taking SSR into account as the BroadcastChannel API is not available in node by default.

If the channel already exists, it will return the existing channel to avoid overriding existing channels and listeners.

If a name is not provided, it will early return and log an error:

```
NgxUtils: There was an attempt to initialize a BroadcastChannel without providing a name.
```

### closeChannel

The `closeChannel` will close a channel with the given name.

```typescript
import { NgxBroadcastChannelService } from '@studiohyperdrive/ngx-utils';

export class YourComponent {
	constructor(private readonly broadcastChannelService: NgxBroadcastChannelService) {}

	public ngOnInit(): void {
		// Open up a channel for this component OnInit.
		this.broadcastChannelService.initChannel('your-channel-name');
	}

	public ngOnDestroy(): void {
		// Close the created channel OnDestroy.
		this.broadcastChannelService.closeChannel('your-channel-name');
	}
}
```

#### Safety

If the channel does not exist on the Record or the name is not provided, it will early return.

### postMessage

The `postMessage` method will post a message to a channel with the given name.

```typescript
import { NgxBroadcastChannelService } from '@studiohyperdrive/ngx-utils';

export class YourComponent {
	constructor(private readonly broadcastChannelService: NgxBroadcastChannelService) {}

	public ngOnInit(): void {
		// Open up a channel for this component OnInit.
		this.broadcastChannelService.initChannel('your-channel-name');
	}

	public ngOnDestroy(): void {
		// Close the created channel OnDestroy.
		this.broadcastChannelService.closeChannel('your-channel-name');
	}

	public sendContextMessage(message: string): void {
		// Send a message through the channel.
		this.broadcastChannelService.postMessage('your-channel-name', message);
	}
}
```

#### Safety

If the channel does not exist on the Record or the name is not provided, it will early return and log an error to give a notice.

```
NgxUtils: There was an attempt to post a message to a channel without providing a name or the selected channel does not exist. The included message was:
```

_This warning will include the message that has been included to give a better understanding of what message was not sent._

### selectChannelMessages

The `selectChannelMessages` method will return a subscription wrapped around the `message` event of the channel with the given name.

```typescript
import { NgxBroadcastChannelService } from '@studiohyperdrive/ngx-utils';

export class YourComponent {
	constructor(private readonly broadcastChannelService: NgxBroadcastChannelService) {}

	public ngOnInit(): void {
		// Open up a channel for this component OnInit.
		this.broadcastChannelService.initChannel('your-channel-name');

		this.broadcastChannelService.selectChannelMessages('your-channel-name').subscribe({
			// Handle the message event.
			next: (message: MessageEvent) => {
				console.log(message.data);
			},
			// When the channelName is not provided, an EMPTY is returned to not break the subscription.
			complete: () => {
				console.log('No channelName provided to the selectChannel method');
			},
		});
	}

	public ngOnDestroy(): void {
		// Close the created channel OnDestroy.
		this.broadcastChannelService.closeChannel('your-channel-name');
	}

	public sendContextMessage(message: string): void {
		// Send a message through the channel.
		this.broadcastChannelService.postMessage('your-channel-name', message);
	}
}
```

#### Safety

If the channel does not exist on the Record or the name is not provided, it will early return an `EMPTY` and log an error.

```angular2html
NgxUtils: There was an attempt to select a BroadcastChannel's messages without providing a name or the selected channel does not exist.
```

### selectChannelMessageErrors

The `selectChannelMessageErrors` method will return a subscription wrapped around the `message` event of the channel with the given name.

```typescript
import { NgxBroadcastChannelService } from '@studiohyperdrive/ngx-utils';

export class YourComponent {
	constructor(private readonly broadcastChannelService: NgxBroadcastChannelService) {}

	public ngOnInit(): void {
		// Open up a channel for this component OnInit.
		this.broadcastChannelService.initChannel('your-channel-name');

		this.broadcastChannelService.selectChannelMessageErrors('your-channel-name').subscribe({
			// Handle the message event.
			next: (messageError: MessageEvent) => {
				console.log(messageError.data);
			},
			// When the channelName is not provided, an EMPTY is returned to not break the subscription.
			complete: () => {
				console.log('No channelName provided to the selectChannel method');
			},
		});
	}

	public ngOnDestroy(): void {
		// Close the created channel OnDestroy.
		this.broadcastChannelService.closeChannel('your-channel-name');
	}

	public sendContextMessage(message: string): void {
		// Send a message through the channel.
		this.broadcastChannelService.postMessage('your-channel-name', message);
	}
}
```

#### Safety

If the channel does not exist on the Record or the name is not provided, it will early return an `EMPTY` and log an error.

```angular2html
NgxUtils: There was an attempt to select a BroadcastChannel's message errors without providing a name or the selected channel does not exist.
```
