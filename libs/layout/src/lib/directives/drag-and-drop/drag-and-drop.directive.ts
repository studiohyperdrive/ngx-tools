import { Directive, Input } from '@angular/core';

@Directive({
	selector: '[ngxAccessibleDragAndDropContainer]',
	exportAs: 'ngxAccessibleDragAndDropContainer',
	standalone: true,
})
export class NgxAccessibleDragAndDropDirective {
	@Input({ required: true, alias: 'ngxAccessibleDragAndDropContainerIndex' })
	public index: number;
}
