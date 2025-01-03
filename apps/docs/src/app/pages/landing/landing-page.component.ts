import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ERoutes } from '../../shared/types';

@Component({
	imports: [RouterLink],
	selector: 'landing-page',
	templateUrl: 'landing-page.component.html',
	styleUrl: 'landing-page.component.scss',
})
export class LandingPageComponent {
	public routes: typeof ERoutes = ERoutes;
}
