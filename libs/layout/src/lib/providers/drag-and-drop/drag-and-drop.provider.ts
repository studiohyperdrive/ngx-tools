import { Provider, Type } from '@angular/core';
import { NgxAccessibleDragAndDropAbstractService } from '../../abstracts';

/**
 * Provides a custom implementation of the NgxDragAndDropService
 *
 * @param service - The custom implementation for the NgxDragAndDropService
 */
export const provideNgxDragAndDropService = (
	service: Type<NgxAccessibleDragAndDropAbstractService>
): Provider => {
	return {
		provide: NgxAccessibleDragAndDropAbstractService,
		useClass: service,
	};
};
