import { NgModule } from '@angular/core';

import { SubscriptionService } from './subscription-service/subscription.service';
import { WindowService } from './window-service/window.service';

@NgModule({
	declarations: [],
	imports: [
	],
	providers: [WindowService, SubscriptionService],
	exports: [],
})
export class UtilsModule { }
