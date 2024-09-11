import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxI18nService } from '@ngx/i18n';

@Component({
	selector: 'app-feature-page',
	template: ` {{ 'hello-feature' | translate : { currentLanguage } }} `,
	standalone: true,
	imports: [TranslateModule],
})
export class FeaturePageComponent {
	public readonly currentLanguage = this.i18nService.currentLanguage;

	constructor(private readonly i18nService: NgxI18nService) {}
}
