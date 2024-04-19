import {
	AfterContentChecked,
	Component,
	ContentChildren,
	HostBinding,
	Input,
	QueryList,
	ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	CdkDrag,
	CdkDragDrop,
	CdkDragPlaceholder,
	CdkDropList,
	CdkDropListGroup,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';
import { asapScheduler } from 'rxjs';
import { NgxDynamicLayoutItemComponent } from '../dynamic-layout-item/dynamic-layout-item.component';
import {
	NgxDynamicLayoutData,
	NgxDynamicLayoutSourcePosition,
	NgxDynamicLayoutTemplates,
} from '../../types';

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
	public containerIds = [];
	public items: NgxDynamicLayoutData[];
	public dropLists: CdkDropList[] = [];

	@ViewChildren(CdkDropList) dropListQueryList: QueryList<CdkDropList>;

	@HostBinding('class.is-editable') @Input() public isEditable: boolean = false;

	/**
	 * A QueryList of all the layout items
	 */
	@ContentChildren(NgxDynamicLayoutItemComponent)
	public layoutItems: QueryList<NgxDynamicLayoutItemComponent>;

	@Input({ required: true }) public set data(items: NgxDynamicLayoutData[]) {
		// Iben: Set the new form value
		this.items = items;
		this.form.setValue(items, { emitEvent: false });

		// Iben: Check if all containers have a unique id, if not, return an error.
		this.containerIds = this.getContainerIds(items);

		if (this.containerIds.length !== new Set(this.containerIds).size) {
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

	public ngAfterViewInit(): void {
		this.getDropLists();
	}

	public drop(event: CdkDragDrop<any>): void {
		console.log(event);
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

			return;
		}

		if (event.previousContainer.id === 'ngx-dynamic-layout-source-list') {
			event.container.data.splice(event.currentIndex, 0, {
				key: event.item.data.key,
			});

			return;
		}

		transferArrayItem(
			event.previousContainer.data,
			event.container.data,
			event.previousIndex,
			event.currentIndex
		);
	}

	private getDropLists() {
		asapScheduler.schedule(() => {
			this.dropLists = this.dropListQueryList.toArray().reverse();
		});
	}

	private getContainerIds(containers: NgxDynamicLayoutData[]): string[] {
		let result = [];

		containers.forEach((container) => {
			if (!container.isContainer) {
				return;
			}

			result = [...result, container.id];

			if (!container.children) {
				return;
			}

			result = [...result, ...this.getContainerIds(container.children)];
		});

		return result.reverse();
	}
}
