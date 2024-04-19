import { AbstractControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Listen to the touched event of a control
 *
 * @param control - An AbstractControl
 */
export const touchedEventListener = (control: AbstractControl): Observable<boolean> => {
	// Iben: Grab the current markAsTouched and UnTouched methods
	const markAsTouched = control.markAsTouched;
	const markAsUnTouched = control.markAsUntouched;

	// Iben: Set a subject with the current touched state
	const touchedSubject = new BehaviorSubject<boolean>(control.touched);

	// Iben: Overwrite the existing functions and emit the touched state
	control.markAsTouched = (options?: { onlySelf: boolean }) => {
		touchedSubject.next(true);
		markAsTouched.bind(control)(options);
	};

	control.markAsUntouched = (options?: { onlySelf: boolean }) => {
		touchedSubject.next(false);
		markAsUnTouched.bind(control)(options);
	};

	// Iben: Return the touched state
	return touchedSubject.asObservable();
};
