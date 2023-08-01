import { Pipe, PipeTransform, EventEmitter } from '@angular/core';

@Pipe({
	name: 'ngxTableHasObservers',
})
export class NgxTableHasObserversPipe implements PipeTransform {
	/**
	 * Returns true in case an observer was set to an EventEmitter
	 *
	 * @param output - The provided EventEmitter
	 */
	public transform(output: EventEmitter<unknown>): boolean {
		return output && output.observers.length > 0;
	}
}
