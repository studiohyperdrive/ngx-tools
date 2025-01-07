import { Component } from '@angular/core';
import { NgxDisplayContentComponent } from '@ngx/layout';

@Component({
	selector: 'app-offline',
	standalone: true,
	template: 'You are offline!',
})
export class DisplayContentOfflineComponent extends NgxDisplayContentComponent {}
