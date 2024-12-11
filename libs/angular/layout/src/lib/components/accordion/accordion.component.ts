import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Subject, take, tap } from 'rxjs';

import { NgxAccordionOpenBehavior } from '../../types';
import { NgxAccordionItemComponent } from './item/accordion-item.component';

/**
 * A WCAG/ARIA compliant implementation of the accordion pattern.
 *
 * https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 */
@Component({
	selector: 'ngx-accordion',
	template: '<ng-content/>',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'ngx-accordion',
		role: 'region',
	},
})
export class NgxAccordionComponent implements OnDestroy {
	/**
	 * A subject to hold a registered event
	 */
	private itemRegisteredSubject: Subject<void> = new Subject<void>();

	/**
	 * A subject to hold the destroyed event
	 */
	private destroyedSubject: Subject<void> = new Subject<void>();

	/**
	 * A list of all accordion items
	 */
	public items: NgxAccordionItemComponent[] = [];

	/**
	 * Open the specific items in the accordion
	 */
	@Input() public set open(open: NgxAccordionOpenBehavior) {
		this.itemRegisteredSubject
			.pipe(
				take(1),
				tap(() => {
					// Iben: Use a setTimeOut so we wait an extra tick
					setTimeout(() => {
						// Iben: Open all items
						if (open === 'all') {
							this.items.forEach((item) => item.updateAccordionItemState(true));
						} else {
							// Iben: Open specific items
							const indexes =
								open === 'first' ? [0] : Array.isArray(open) ? open : [open];

							indexes.forEach((index) => {
								this.items[index]?.updateAccordionItemState(true);
							});
						}
					});
				})
			)
			.subscribe();
	}

	/**
	 * Register an accordion item to the container
	 *
	 * @param item - An accordion item
	 */
	public registerItem(item: NgxAccordionItemComponent): void {
		this.itemRegisteredSubject.next();
		this.items.push(item);
	}

	/**
	 * Removes an accordion item from the container
	 *
	 * @param item - An accordion item
	 */
	public removeItem(item: NgxAccordionItemComponent): void {
		// Iben: Get the index of the item
		const index = this.items.findIndex(({ id }) => id === item.id);

		// Iben: If no item was found, we early exit
		if (index === undefined) {
			return;
		}

		// Iben: Remove the item
		this.items = [...this.items.slice(0, index), ...this.items.slice(index + 1)];
	}

	/**
	 * Moves the focus to an accordion
	 *
	 * @param  id - The id of the current item
	 * @param  direction - The direction we move in
	 */
	public moveFocus(id: string, direction: 'up' | 'down' | 'first' | 'last') {
		// Iben: If we go to the first or last accordion, we don't need to find the index
		if (direction === 'first' || direction === 'last') {
			this.items[direction === 'first' ? 0 : this.items.length - 1].focus();

			return;
		}

		// Iben: Find the index and move to the next
		const index = this.items.findIndex((item) => id === item.id);

		this.items[direction === 'down' ? index + 1 : index - 1]?.focus();
	}

	/**
	 * Handle the destroyed state
	 */
	public ngOnDestroy(): void {
		this.destroyedSubject.next();
		this.destroyedSubject.complete();
	}
}
