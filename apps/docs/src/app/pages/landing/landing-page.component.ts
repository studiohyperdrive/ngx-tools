import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ERoutes } from '../../shared/types';

@Component({
    imports: [RouterLink, RouterOutlet],
    selector: 'landing-page',
    templateUrl: 'landing-page.component.html'
})
export class LandingPageComponent {
	public routes: typeof ERoutes = ERoutes;
}
