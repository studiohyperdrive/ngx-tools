import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { NgxSaveOnExitAbstractService, NgxSaveOnExitComponent } from '../../abstracts';

/**
 * Checks whether or not we can navigate away from a page
 *
 * @param {NgxSaveOnExitComponent} component
 * @return {*}  {ObservableBoolean}
 * @memberof SaveOnExitGuard
 */
export const NgxSaveOnExitGuard: CanDeactivateFn<NgxSaveOnExitComponent> = (
	component: NgxSaveOnExitComponent,
	currentRoute: ActivatedRouteSnapshot,
	currentState: RouterStateSnapshot,
	nextState: RouterStateSnapshot
): Observable<boolean> => {
	// Iben: Fetch all injectables
	const saveOnExitService: NgxSaveOnExitAbstractService = inject(NgxSaveOnExitAbstractService);

	// Iben: In case the component is not dirty, we can route without problems
	if (!component.isDirty()) {
		return of(true);
	}

	// Iben: Check if the service has a bypassSaveOnExit function. If it does, run to see of the current route needs to be bypassed
	if (
		saveOnExitService.bypassSaveOnExit &&
		saveOnExitService.bypassSaveOnExit(currentRoute, nextState)
	) {
		return of(true);
	}

	// Iben: In case the component is dirty, we will let the SaveOnExitService know so they can take the appropriate action
	return saveOnExitService.handleDirtyState(component);
};
