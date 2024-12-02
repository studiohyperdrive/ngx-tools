import { NgxAccessibleDragAndDropItemDirective } from './drag-and-drop-item.directive';
import { NgxAccessibleDragAndDropContainerDirective } from './drag-and-drop-container.directive';
import { NgxAccessibleDragAndDropHostDirective } from './drag-and-drop-host.directive';

/**
 * All the needed directives for the accessible drag and drop implementation
 */
export const NgxAccessibleDragAndDrop = [
	NgxAccessibleDragAndDropItemDirective,
	NgxAccessibleDragAndDropContainerDirective,
	NgxAccessibleDragAndDropHostDirective,
] as const;
