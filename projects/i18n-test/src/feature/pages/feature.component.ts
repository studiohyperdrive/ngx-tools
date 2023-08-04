import { Component } from '@angular/core';
import { I18nService } from 'i18n';

@Component({
	selector: 'app-feature-page',
	template: ` {{ 'hello-feature' | translate : { currentLanguage } }} `,
})
export class FeaturePageComponent {
	public readonly currentLanguage = this.i18nService.currentLanguage;

	constructor(private readonly i18nService: I18nService) {}
}
