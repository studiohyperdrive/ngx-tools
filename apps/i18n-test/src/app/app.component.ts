import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from '@ngx/i18n';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [RouterOutlet, TranslateModule],
})
export class AppComponent {
	constructor(private readonly i18nService: I18nService) {
		i18nService.initI18n('nl').subscribe();
	}
}
