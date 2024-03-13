import {
	AfterContentChecked,
	ChangeDetectorRef,
	Component,
	ContentChildren,
	Input,
	QueryList,
	TemplateRef,
	WritableSignal,
	signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgTemplateOutlet, CommonModule } from '@angular/common';

import { FormAccessor } from '@studiohyperdrive/ngx-forms';
import { NgxConfigurableLayoutItemComponent } from '../configurable-layout-item/configurable-layout-item.component';

@Component({
	selector: 'ngx-configurable-layout',
	templateUrl: './configurable-layout.component.html',
	styleUrl: './configurable-layout.component.scss',
	standalone: true,
	imports: [NgxConfigurableLayoutItemComponent, NgTemplateOutlet, CommonModule],
})
export class NgxConfigurableLayoutComponent
	extends FormAccessor<string[], FormControl<string[]>>
	implements AfterContentChecked
{
	/**
	 * The keys will determine the order of the `ngx-configurable-layout-item` layout items.
	 *
	 * It is not necessary to provide this input when using a formControl.
	 * Providing both a `control` and the `keys` input will result in the input
	 * overriding the provided control.
	 */
	@Input() public set keys(keys: string[]) {
		// Wouter: If no keys are provided, we prevent the patching of the control.
		if (!Boolean(keys)) {
			return;
		}
		// Wouter: Patch the provided keys onto the control.
		this.form.patchValue(keys, { emitEvent: false });
	}

	/**
	 * A record of the templates with the unique item `key` and its `templateRef`.
	 */
	public itemTemplateRecord: WritableSignal<Record<string, TemplateRef<any>>> = signal({});

	/**
	 * A list of the configurable item templates.
	 */
	@ContentChildren(NgxConfigurableLayoutItemComponent)
	public configurableItemTemplates: QueryList<NgxConfigurableLayoutItemComponent>;

	constructor(public readonly cdRef: ChangeDetectorRef) {
		super(cdRef);
	}

	// Lifecycle methods
	// ==============================
	public ngAfterContentChecked(): void {
		// Iben: Run with content check so that we can dynamically add templates/columns
		this.handleItemTemplates();
	}

	// Abstract methods
	// ==============================
	initForm(): FormControl<string[]> {
		return new FormControl<string[]>([]);
	}
	// Component methods
	// ==============================

	private handleItemTemplates(): void {
		// Wouter: Clear the current item template record
		this.itemTemplateRecord.set({});

		Array.from(this.configurableItemTemplates).forEach((itemTemplate) => {
			const { key, template } = itemTemplate;

			// Wouter: Update the item template record with the unique column key and its template ref
			this.itemTemplateRecord.update((value) => ({ ...value, [key]: template }));
		});
	}
}
