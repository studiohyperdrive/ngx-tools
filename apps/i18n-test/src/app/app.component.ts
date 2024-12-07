import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { NgxI18nRootService, NgxI18nService } from '@ngx/i18n';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet, TranslateModule]
})
export class AppComponent {
	constructor(
		private readonly i18nService: NgxI18nService,
		private readonly rootService: NgxI18nRootService
	) {
		setTimeout(() => {
			rootService.setAvailableLanguages(['nl', 'fr']);
		}, 3000);
		i18nService.initI18n('nl').subscribe();
	}
}
