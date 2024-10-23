import { Provider, Type } from '@angular/core';
import { NgxAccessibleDragAndDropAbstractService } from '../../abstracts';

export const provideNgxDragAndDropService = (
	service: Type<NgxAccessibleDragAndDropAbstractService>
): Provider => {
	return {
		provide: NgxAccessibleDragAndDropAbstractService,
		useClass: service,
	};
};
