import {
	AfterContentChecked,
	Component,
	ContentChildren,
	Input,
	OnDestroy,
	OnInit,
	QueryList,
	TemplateRef,
	WritableSignal,
	forwardRef,
	signal,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIf, NgFor, NgTemplateOutlet, NgStyle } from '@angular/common';

import {
	CdkDragDrop,
	CdkDrag,
	CdkDropList,
	CdkDropListGroup,
	moveItemInArray,
	transferArrayItem,
	CdkDragPlaceholder,
} from '@angular/cdk/drag-drop';

import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { NgxConfigurableLayoutItemComponent } from '../configurable-layout-item/configurable-layout-item.component';
import { NgxConfigurableLayoutItemSizeOption } from '../../types';
import { NgxConfigurableLayoutItemSizePipe } from '../../pipes';

/**
 * This component acts essentially as a layout wrapper. In combination with the
 * `<ngx-configurable-layout-item>` provided with a key as input, this component allows
 * you to dynamically change the order in which the items get rendered.
 *
 * The order of the items in the template does not matter, it gets set by the `[keys]` input.
 * You may also bind a `FormControl<string[][]>` to this component, which will allow you to reactively
 * change the order in which the elements get rendered. The control will always override the`[keys]` input.
 */
@Component({
	selector: 'ngx-configurable-layout',
	templateUrl: './configurable-layout.component.html',
	styleUrl: './configurable-layout.component.scss',
	standalone: true,
	imports: [
		NgxConfigurableLayoutItemComponent,
		NgTemplateOutlet,
		NgFor,
		NgIf,
		NgStyle,
		CdkDropListGroup,
		CdkDropList,
		CdkDrag,
		CdkDragPlaceholder,
		NgxConfigurableLayoutItemSizePipe,
	],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NgxConfigurableLayoutComponent),
			multi: true,
		},
	],
})
export class NgxConfigurableLayoutComponent
	implements ControlValueAccessor, OnInit, AfterContentChecked, OnDestroy
{
	/**
	 * A list of the configurable item templates.
	 */
	@ContentChildren(NgxConfigurableLayoutItemComponent)
	public configurableItemTemplates: QueryList<NgxConfigurableLayoutItemComponent>;

	// This component uses the internal implementation of the `ngx-forms` library.
	// Until we have moved to an NX workspace setup, we are unable to install the required
	//  dependencies to make the `ngx-forms` work.
	//
	// TODO: use the ngx-forms formAccessor instead of copying its internal way of working
	private readonly destroyedSubject: Subject<void> = new Subject();
	private readonly destroyed$: Observable<void> = this.destroyedSubject.asObservable();
	public readonly form: FormControl<string[][]> = new FormControl<string[][]>([]);

	/**
	 * A record of the templates with the unique item `key` and its `templateRef`.
	 */
	public itemTemplateRecord: WritableSignal<Record<string, TemplateRef<any>>> = signal({});

	/**
	 * The keys will determine the order of the `ngx-configurable-layout-item` layout items.
	 *
	 * It is not necessary to provide this input when using a formControl.
	 * Providing both a `control` and the `keys` input will result in the control overriding
	 * the input.
	 */
	@Input() public set keys(keys: string[][]) {
		// Wouter: If no keys are provided, we prevent the patching of the control.
		if (!Boolean(keys)) {
			return;
		}
		// Wouter: Patch the provided keys onto the control.
		this.form.patchValue(keys, { emitEvent: false });
	}

	/**
	 * Determines how much space each item takes in the row. By default, this is 'fill'
	 *
	 * fill - Will make the items take up the available space
	 * fit-content - Will make the items take up the space of the provided template
	 * equal - Will make the items take up equal amount of space throughout the grid
	 */
	@Input() public itemSize: NgxConfigurableLayoutItemSizeOption = 'fill';

	/**
	 * An optional row gap we can provide to create a gap between the rows of the layout.
	 *
	 * This input requires an amount in px, rem, %, etc.
	 */
	@Input() public rowGap: string;

	/**
	 * An optional column gap we can provide to create a gap between the columns of the layout.
	 *
	 * This input requires an amount in px, rem, %, etc.
	 */
	@Input() public columnGap: string;

	/**
	 * Whether drag and drop is enabled for the layout.
	 */
	@Input() public allowDragAndDrop: boolean = false;

	// Lifecycle methods
	// ==============================
	public ngOnInit(): void {
		this.form.valueChanges
			.pipe(
				tap(() => {
					this.onChanged(this.form.value);
					this.onTouched();
				}),
				takeUntil(this.destroyed$)
			)
			.subscribe();
	}

	public ngAfterContentChecked(): void {
		// Iben: Run with content check so that we can dynamically add templates/columns
		this.handleItemTemplates();

		if (!this.form.value.length) {
			console.warn(
				'NgxLayout: Neither a formControl nor a keys input was provided. Therefore no items can be displayed.'
			);
		}
	}

	public ngOnDestroy(): void {
		this.destroyedSubject.next();
		this.destroyedSubject.complete();
	}

	// Component methods
	// ==============================
	// TODO: use the ngx-forms formAccessor instead of copying its internal way of working
	private onChanged: Function = () => {};
	private onTouched: Function = () => {};

	writeValue(value: string[][]): void {
		this.form.setValue(value || [], { emitEvent: false });
	}
	registerOnChange(fn: any): void {
		this.onChanged = fn;
	}
	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}
	setDisabledState?(isDisabled: boolean): void {
		isDisabled
			? this.form.disable({ emitEvent: false })
			: this.form.enable({ emitEvent: false });
	}

	/**
	 * Drag and drop an element in the grid
	 *
	 * @param {CdkDragDrop<string[]>} event - The grid element
	 * @memberof NgxConfigurableLayoutComponent
	 */
	public drop(event: CdkDragDrop<string[]>) {
		// Iben: Fetch the arrays we need to update
		const startArrayIndex = parseInt(event.previousContainer.id.split('ngx-layout-row-')[1]);
		const endArrayIndex = parseInt(event.container.id.split('ngx-layout-row-')[1]);
		const formData = [...this.form.value];
		const startArray = formData[startArrayIndex];
		const endArray = formData[endArrayIndex];

		// Iben: If the drag and drop is within the same row, we move
		if (event.previousContainer === event.container) {
			moveItemInArray(endArray, event.previousIndex, event.currentIndex);
		} else {
			// Iben: If the drag and drop is over multiple rows, we transfer
			transferArrayItem(startArray, endArray, event.previousIndex, event.currentIndex);
			formData[startArrayIndex] = startArray;
		}

		formData[endArrayIndex] = endArray;

		// Iben: Update the form value
		this.form.setValue(formData);
	}

	// Component internal working
	/**
	 * Update the item layout template order.
	 */
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
