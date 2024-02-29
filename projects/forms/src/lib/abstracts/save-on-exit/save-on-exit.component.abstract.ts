import { Directive, HostListener, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class NgxSaveOnExitComponent implements OnDestroy {
	/**
	 * Handles the unload event of the browser and will warn the user that the application prevented the user from closing the browser
	 *
	 * @param event - The unload event from the browser
	 */
	@HostListener('window:beforeunload', ['$event'])
	handleUnloadEvent(event: BeforeUnloadEvent) {
		// Iben: If the component is dirty, we prevent the browser from closing the window or tab
		if (this.allowBeforeUnloadHandler && this.isDirty()) {
			event.returnValue = true;
		}
	}

	/**
	 * A subject to handle the onDestroy flow
	 */
	private readonly destroyedSubject$ = new Subject();

	/**
	 * An observable that emits the onDestroy event
	 */
	public readonly destroyed$ = this.destroyedSubject$.asObservable();

	/**
	 * Whether or not the beforeUnload event should be intercepted or not. By default, this behavior is set to false
	 * If set to true, closing a tab or the browser will be interrupted and a message will be displayed
	 */
	public readonly allowBeforeUnloadHandler: boolean = false;

	/**
	 * Return whether or not the component is dirty
	 */
	public abstract isDirty(): boolean;

	/**
	 * Return whether or not the component is valid
	 */
	public abstract isValid(): boolean;

	ngOnDestroy() {
		// Iben: Emit if the component gets destroyed
		this.destroyedSubject$.next(undefined);
		this.destroyedSubject$.complete();
	}
}
