import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { NgxSaveOnExitComponent } from './save-on-exit.component.abstract';

export abstract class NgxSaveOnExitAbstractService {
	/**
	 * Take action when the component is dirty
	 */
	public abstract handleDirtyState: (component: NgxSaveOnExitComponent) => Observable<boolean>;

	/**
	 * An optional method that, if implemented, provides the ability to bypass the guard
	 */
	public bypassSaveOnExit?: (
		currentRoute: ActivatedRouteSnapshot,
		nextState: RouterStateSnapshot
	) => boolean;
}
