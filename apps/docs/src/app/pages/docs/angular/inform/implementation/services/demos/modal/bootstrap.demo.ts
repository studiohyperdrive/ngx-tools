import { ApplicationConfig } from '@angular/core';
import { ConfirmModalComponent } from './confirm.component';
import { provideNgxModalConfiguration } from '@ngx/inform';

export const modalAppConfig: ApplicationConfig = {
	providers: [
		provideNgxModalConfiguration({
			modals: {
				confirm: {
					component: ConfirmModalComponent,
					role: 'alertdialog',
					panelClass: 'modeeeeeeel-panel',
				},
			},
			panelClass: 'modal-panelelelelele',
		}),
	],
};
