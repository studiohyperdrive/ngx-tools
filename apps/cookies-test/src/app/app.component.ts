import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CookieAlertComponent } from './cookies.component';
import {
	NgxCookieService,
	NgxCookiesFallbackComponentToken,
	NgxHasCookieDirective,
} from '@ngx/cookies';

@Component({
	standalone: true,
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [CommonModule, NgxHasCookieDirective],
	providers: [
		{
			provide: NgxCookiesFallbackComponentToken,
			useValue: CookieAlertComponent,
		},
	],
})
export class AppComponent {
	title = 'cookies-test';

	generalAccepted$: Observable<boolean> = this.ngxCookieService.hasAcceptedCategory('general');
	analyticsAccepted$: Observable<boolean> =
		this.ngxCookieService.hasAcceptedCategory('analytics');
	gaAccepted$: Observable<boolean> = this.ngxCookieService.hasAcceptedService('analytics', 'ga');
	youtubeAccepted$: Observable<boolean> = this.ngxCookieService.hasAcceptedService(
		'analytics',
		'youtube'
	);
	isAuthenticated$: Observable<boolean> =
		this.ngxCookieService.getCookieObservable<boolean>('authenticated');

	constructor(private readonly ngxCookieService: NgxCookieService) {}

	ngAfterViewInit() {
		this.ngxCookieService.setupCookiesHandler(
			{
				general: {
					enabled: true,
					readOnly: true,
				},
				analytics: {
					services: {
						ga: {},
						youtube: {},
					},
				},
			},
			{
				default: 'nl',
				translations: {
					nl: '../assets/nl/consent.json',
				},
			}
		);
	}

	ngOnInit() {
		this.ngxCookieService.setCookie({ name: 'authenticated', value: true });
		this.ngxCookieService.setCookie({ name: 'kbo', value: true });
	}

	showCookies() {
		this.ngxCookieService.showModal();
	}

	acceptGA() {
		this.ngxCookieService.acceptService('analytics', 'ga');
	}

	removeCookie(cookie: string) {
		this.ngxCookieService.removeCookie(cookie);
	}
}
