import { Directive, Input } from '@angular/core';

/**
 * A directive to handle accessible drag and drop flows. This directive is meant to be placed on the drag and drop container(s).
 */
@Directive({
	selector: '[ngxAccessibleDragAndDropContainer]',
	exportAs: 'ngxAccessibleDragAndDropContainer',
	standalone: true,
})
export class NgxAccessibleDragAndDropContainerDirective {
	/**
	 * The index of the container
	 */
	@Input({ required: true, alias: 'ngxAccessibleDragAndDropContainerIndex' })
	public index: number;

	/**
	 * An optional label used in the event messages
	 */
	@Input({ alias: 'ngxAccessibleDragAndDropContainerLabel' }) public label: string;
}
