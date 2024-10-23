import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { CdkDropList } from '@angular/cdk/drag-drop';

import { NgxAccessibleDragAndDropAbstractService } from '../../abstracts';
import { NgxAccessibleDragAndDropMoveEvent } from '../../types';
import { NgxHasFocusDragAndDropDirective } from './has-focus.directive';
import { NgxAccessibleDragAndDropDirective } from './drag-and-drop.directive';

@Directive({
	selector: '[ngxAccessibleDragAndDropItem]',
	exportAs: 'ngxAccessibleDragAndDropItem',
	standalone: true,
})
export class NgxAccessibleDragAndDropItemDirective extends NgxHasFocusDragAndDropDirective {
	private isSelected: boolean = false;
	private oldIndex: number;

	@HostBinding('tabIndex') public tabIndex: number = 0;

	@HostListener('keydown.Enter') public onEnter(): void {
		this.handlePress();
	}

	@HostListener('keydown.Space') public onSpace(): void {
		this.handlePress();
	}

	@HostListener('keydown.ArrowUp') public onArrowUp(): void {
		this.moveItem('up');
	}
	@HostListener('keydown.ArrowDown') public onArrowDown(): void {
		this.moveItem('down');
	}
	@HostListener('keydown.ArrowLeft') public onArrowLeft(): void {
		this.moveItem('left');
	}
	@HostListener('keydown.ArrowRight') public onArrowRight(): void {
		this.moveItem('right');
	}

	@Input({ required: true, alias: 'ngxAccessibleDragAndDropItemIndex' }) itemIndex: number;
	@Input({ required: true, alias: 'ngxAccessibleDragAndDropLabel' }) label: string;
	@Input({ alias: 'ngxAccessibleDragAndDropDisabled' }) set disabled(isDisabled: boolean) {
		this.tabIndex = isDisabled ? -1 : 0;
	}

	@Output() ngxAccessibleDragAndDropItemMove: EventEmitter<NgxAccessibleDragAndDropMoveEvent> =
		new EventEmitter<NgxAccessibleDragAndDropMoveEvent>();

	constructor(
		private readonly dragAndDropService: NgxAccessibleDragAndDropAbstractService,
		private readonly dropList: CdkDropList,
		private readonly dropContainer: NgxAccessibleDragAndDropDirective
	) {
		super();
	}

	private moveItem(key: 'up' | 'down' | 'left' | 'right'): void {
		if (!this.disabled && this.hasFocus && this.isSelected) {
			let newIndex: number;
			let newContainer: number;

			const currentContainer = this.dropContainer.index;
			const isHorizontal = this.dropList.orientation === 'horizontal';
			const isUpOrDown: boolean = key === 'up' || key === 'down';

			// Iben: In this case we're changing the current container
			if ((isUpOrDown && isHorizontal) || (!isUpOrDown && !isHorizontal)) {
				newIndex = this.itemIndex;
				newContainer =
					key === 'up' || key === 'left' ? currentContainer - 1 : currentContainer + 1;
			}

			// Iben: In this case, we're changing the order of the items
			if ((!isUpOrDown && isHorizontal) || (isUpOrDown && !isHorizontal)) {
				newIndex = key === 'up' || key === 'left' ? this.itemIndex - 1 : this.itemIndex + 1;
				newContainer = currentContainer;
			}

			// Iben: Emit the move event
			this.ngxAccessibleDragAndDropItemMove.emit({
				previousIndex: this.itemIndex,
				newIndex,
				previousContainer: currentContainer,
				newContainer,
			});
		}
	}

	private handlePress(): void {
		this.handleWhenFocussed(() => {
			this.oldIndex = this.itemIndex;

			this.isSelected = !this.isSelected;
			this.dragAndDropService
				.setMessage({
					type: this.isSelected ? 'grabbed' : 'dropped',
					data: this.label,
				})
				.subscribe();
		});
	}
}
