import { filter, map, Observable, of, take, tap } from 'rxjs';
import { inject } from '@angular/core';

import { NgxLiveRegionService } from '../../services';
import {
	NgxAccessibleDragAndDropMessage,
	NgxAccessibleDragAndDropMessageRecord,
} from '../../types';
import { NgxAccessibleDragAndDropMessageRecords } from '../../const';

/**
 * An abstract service that is used to make drag and drop components accessible for assistive technologies
 */
export abstract class NgxAccessibleDragAndDropAbstractService {
	/**
	 * The live region service
	 */
	private readonly liveRegionService: NgxLiveRegionService = inject(NgxLiveRegionService);

	/**
	 * A method that passes the current language, can either be a string or an Observable
	 */
	abstract get currentLanguage(): string | Observable<string>;

	/**
	 * A custom set of messages used for the drag and drop events.
	 *
	 *  Please check the readme for more information on what is necessary to make these messages accessible.
	 */
	public customMessages: Record<string, NgxAccessibleDragAndDropMessageRecord>;

	/**
	 * Sets a message to the live region
	 *
	 * @param message - The provided message
	 */
	public setMessage(message: NgxAccessibleDragAndDropMessage): Observable<void> {
		// Iben: Take the current language to fetch the message
		return (
			typeof this.currentLanguage === 'string'
				? of(this.currentLanguage)
				: this.currentLanguage
		).pipe(
			filter(Boolean),
			take(1),
			tap((currentLanguage) => {
				// Iben: Fetch the necessary data
				const { type, data } = message;
				const messageRecord = this.customMessages || NgxAccessibleDragAndDropMessageRecords;

				let result: string = messageRecord[currentLanguage][type];

				// Iben: If no message was found, we early exit and throw an error
				if (!result) {
					console.error(
						'NgxAccessibleDragAndDropAbstractService: No message for the corresponding drag-and-drop event was found'
					);

					return;
				}

				// Iben: Replace the necessary substrings
				if (type === 'dropped' || type === 'grabbed' || type === 'cancelled') {
					result = result.replace('{{#item}}', data);
				} else if (type === 'moved' || type === 'reordered') {
					result = result
						.replace('{{#item}}', data.item)
						.replace(`{{#from}}`, data.from)
						.replace(`{{#to}}`, data.to);
				}

				// Iben: Update the message in the live region
				this.liveRegionService.setMessage(result);
			}),
			map(() => null)
		);
	}
}
