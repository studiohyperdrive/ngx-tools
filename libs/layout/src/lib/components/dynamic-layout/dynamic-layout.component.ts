import {
	AfterContentChecked,
	Component,
	ContentChildren,
	HostBinding,
	Input,
	QueryList,
} from '@angular/core';
import {
	NgxDynamicLayoutData,
	NgxDynamicLayoutSourcePosition,
	NgxDynamicLayoutTemplates,
} from '../../types';
import { NgxDynamicLayoutItemComponent } from '../dynamic-layout-item/dynamic-layout-item.component';
import { CommonModule } from '@angular/common';
import {
	CdkDrag,
	CdkDragDrop,
	CdkDragPlaceholder,
	CdkDropList,
	CdkDropListGroup,
	moveItemInArray,
} from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'ngx-dynamic-layout',
	templateUrl: './dynamic-layout.component.html',
	styleUrl: './dynamic-layout.component.scss',
	imports: [CommonModule, CdkDropListGroup, CdkDropList, CdkDrag, CdkDragPlaceholder],
	standalone: true,
})
export class NgxDynamicLayoutComponent implements AfterContentChecked {
	public templateRecord: Record<string, NgxDynamicLayoutTemplates> = {};
	public keys: string[] = [];
	public form: FormControl<NgxDynamicLayoutData[]> = new FormControl([]);

	@HostBinding('class.is-editable') @Input() public isEditable: boolean = false;

	/**
	 * A QueryList of all the layout items
	 */
	@ContentChildren(NgxDynamicLayoutItemComponent)
	public layoutItems: QueryList<NgxDynamicLayoutItemComponent>;

	@Input({ required: true }) public set data(items: NgxDynamicLayoutData[]) {
		// Iben: Set the new form value
		this.form.setValue(items, { emitEvent: false });

		// Iben: Check if all containers have a unique id, if not, return an error.
		const containerIds = [...items].flat(50).map((item) => item.isContainer && item.id);

		if (containerIds.length !== new Set(containerIds).size) {
			console.error(
				`NgxLayout: Not all containers have a unique id. Please provide a unique id in order to make drag and drop function correctly.`
			);
		}
	}

	@Input() public sourcePosition: NgxDynamicLayoutSourcePosition = 'right';

	public ngAfterContentChecked(): void {
		// Iben: Run with content check so that we can dynamically add templates
		this.templateRecord = {};

		(this.layoutItems?.toArray() || []).forEach((item) => {
			this.templateRecord[item.key] = {
				source: item.sourceTemplate,
				content: item.contentTemplate,
			};
		});

		this.keys = Array.from(new Set(Object.keys(this.templateRecord)));
	}

	public drop(event: CdkDragDrop<any>, containerId?: string) {
		const value = [...this.form.value];

		if (event.previousContainer.id === 'ngx-dynamic-layout-source-list') {
			value.splice(event.currentIndex, 0, {
				key: event.item.element.nativeElement.id,
				isContainer: false,
			});
		} else if (event.previousContainer.id === 'ngx-dynamic-layout-content-list') {
			moveItemInArray(value, event.previousIndex, event.currentIndex);
		}

		this.form.setValue(value);
	}
}
