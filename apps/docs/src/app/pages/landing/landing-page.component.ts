import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ERoutes } from '../../shared/types';

@Component({
	imports: [RouterLink],
	selector: 'landing-page',
	templateUrl: 'landing-page.component.html',
	styleUrl: 'landing-page.component.scss',
	animations: [
		trigger('slideIn', [
			state(
				'open',
				style({
					width: '100%',
				})
			),
			state(
				'closed',
				style({
					width: '0%',
				})
			),
			transition('open => closed', [animate('1s ease-in-out')]),
		]),
	],
})
export class LandingPageComponent {
	public routes: typeof ERoutes = ERoutes;

	isCovered = true;

	@ViewChild('quote', { static: false }) private quote: ElementRef<HTMLDivElement> | undefined;

	@HostListener('window:scroll', ['$event'])
	isScrolledIntoView() {
		if (this.quote && this.isCovered) {
			const rect = this.quote.nativeElement.getBoundingClientRect();
			const topShown = rect.top >= 0;
			const bottomShown = rect.bottom <= window.innerHeight;
			this.isCovered = !(topShown && bottomShown);
		}
	}
}
