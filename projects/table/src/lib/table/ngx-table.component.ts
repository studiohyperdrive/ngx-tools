import {
	AfterContentChecked,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChild,
	ContentChildren,
	EventEmitter,
	HostBinding,
	Inject,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Optional,
	Output,
	QueryList,
	SimpleChanges,
	TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isEmpty } from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { NgxAbstractTableCellDirective } from '../cell/cell.directive';
import { NgxTableSortEvent } from '../interfaces';
import {
	HideHeaderRowOption,
	NgxTableConfig,
	NgxTableConfigToken,
	ShowDetailRowOption,
} from '../token';
import {
	generateNgxTableForm,
	handleNgxTableHeaderValueChanges,
	handleNgxTableValueChanges,
	resetNgxTableForm,
	writeNgxTableValue,
} from '../utils';

interface TableCellTemplate {
	headerTemplate?: TemplateRef<any>;
	cellTemplate?: TemplateRef<any>;
	footerTemplate?: TemplateRef<any>;
	cellClass?: string;
}

@Component({
	selector: 'ngx-table',
	templateUrl: './ngx-table.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./ngx-table.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: NgxTableComponent,
		},
	],
})
export class NgxTableComponent
	implements AfterContentChecked, ControlValueAccessor, OnInit, OnChanges, OnDestroy
{
	/**
	 * Default class that will be put on the ngx-table component
	 */
	@HostBinding('class') private readonly componentClass =
		this.ngxTableConfig?.ngxTableClass || '';

	/**
	 * A QueryList of all the table cell templates
	 */
	@ContentChildren(NgxAbstractTableCellDirective)
	public tableCellTemplates: QueryList<NgxAbstractTableCellDirective>;

	/**
	 * A template to provide a detail row
	 */
	@ContentChild('detailRowTmpl', { static: false })
	public detailRowTemplate: TemplateRef<any>;

	/**
	 * A template to provide an empty view
	 */
	@ContentChild('emptyTmpl', { static: false })
	public emptyTemplate: TemplateRef<any>;

	/**
	 * A template to provide a loading view
	 */
	@ContentChild('loadingTmpl', { static: false })
	public loadingTemplate: TemplateRef<any>;

	/**
	 * A template to provide a checkbox template
	 */
	@ContentChild('checkboxTmpl', { static: false })
	public checkboxTemplate: TemplateRef<any>;

	/**
	 * A template to provide a radio button template
	 */
	@ContentChild('radioTmpl', { static: false })
	public radioTemplate: TemplateRef<any>;

	/**
	 * A template to provide a sort template
	 */
	@ContentChild('sortTmpl', { static: false })
	public sortTemplate: TemplateRef<any>;

	/**
	 * A template to provide a open state template
	 */
	@ContentChild('openRowStateTmpl', { static: false })
	public openRowStateTemplate: TemplateRef<any>;

	/**
	 * A list of all column names we want to represent in the table
	 */
	@Input() public columns: string[] = [];

	/**
	 * An optional list of all columns we wish to attribute to row actions, which are sorted to the end of the row by default
	 */
	@Input() public actions: string[] = [];

	/**
	 * The data we wish to render in the table
	 */
	@Input() public data: any[] = [];

	/**
	 * The loading state of our table
	 */
	@HostBinding('ngx-table-loading') @Input() public loading: boolean = false;

	/**
	 * An optional property that defines whether multiple rows can be open at once.
	 * By default, this is false. The default can be overwritten in the NgxTableConfig.
	 */
	@Input() public allowMultipleOpenRows: boolean =
		this.ngxTableConfig?.allowMultipleRowsOpen || false;

	/**
	 * Whether or not rows in the table are selectable
	 */
	@Input() public selectable: boolean = false;

	/**
	 * In case the rows are selectable, we can pass a key we want to use as return value instead of the index of the row
	 */
	@Input() public selectableKey: string;

	/**
	 * In case the rows are selectable, we pass whether we want a radio button or a checkbox. By default, this is a checkbox
	 */
	@Input() public selectableType: 'checkbox' | 'radio' = 'checkbox';

	/**
	 * In case the rows are selectable, we can determine whether we want to reset the form based on new data. Setting this to false will add new controls to the FormGroup; but will not remove the earlier controls from the form.
	 * This is a useful feature for when the data is being filtered or new data is added through a load more mechanic
	 *
	 * By default, this is true. This default cannot be overwritten in the NgxTableConfig.
	 */
	@Input() public resetFormOnNewData: boolean = true;

	/**
	 * SETTER
	 *
	 * The current sorting event.
	 */
	@Input() public set currentSorting(event: NgxTableSortEvent) {
		this.currentSortingEvent = event;
		this.handleCurrentSort(event);
	}

	/**
	 * An optional property to define whether we want to add a class to the currently opened row.
	 * By default this is false. The default can be overwritten in the NgxTableConfig.
	 */
	@Input() public showSelectedOpenRow: boolean =
		this.ngxTableConfig?.showSelectedOpenRow || false;

	/**
	 * An optional class to add to the rows of the table
	 */
	@Input() public rowClass: string;

	/**
	 * An optional key that can be used in the data in order to highlight a row. If this property is present and true, the highlight class will be provided.
	 * By default, this key is ngx-highlight. The default can be overwritten in the NgxTableConfig
	 */
	@Input() public highlightKey: string = this.ngxTableConfig?.highlightKey || 'ngx-highlight';

	/**
	 * An optional property to define whether we want to show a visual indicator of the open and closed state of a detail row.
	 * By default this is false. The default can be overwritten in the NgxTableConfig.
	 */
	@Input() public showOpenRowState: boolean = this.ngxTableConfig?.showOpenRowState || false;

	/**
	 * An optional property to define the default open state of the detail row.
	 * By default this is 'on-click'. The default can be overwritten in the NgxTableConfig.
	 */
	@Input() public showDetailRow: ShowDetailRowOption =
		this.ngxTableConfig?.showDetailRow || 'on-click';

	/**
	 * An optional property to define whether we want to emit the row when there's only one item in the table and the showDetailRow is set to `on-single-item`
	 * By default this is false. The default can be overwritten in the NgxTableConfig.
	 */
	@Input() public emitValueOnSingleItem: boolean =
		this.ngxTableConfig?.showDetailRow === 'on-single-item' &&
		this.ngxTableConfig?.emitValueOnSingleItem;

	/**
	 * An optional key to open a row by default upon rendering.
	 */
	@Input() public set defaultRowOpen(openedIndex: number) {
		// Wouter: The function findIndex is most likely to be used. It returns
		// -1 if the index was not found.
		if (openedIndex < 0) {
			return;
		}

		// Wouter: This timeout is needed to wait for the TemplateRefs to be found.
		setTimeout(() => {
			this.handleRowClicked(this.data[openedIndex], openedIndex);
			this.cdRef.detectChanges();
		});
	}

	/**
	 * An optional property to define whether we want the header to be hidden in certain cases.
	 * By default this is never. The default can be overwritten in the NgxTableConfig
	 */
	@Input() public hideHeaderWhen: HideHeaderRowOption =
		this.ngxTableConfig?.hideHeaderWhen || 'never';

	@Output() public rowClicked = new EventEmitter<any>();

	public tableCellTemplateRecord: Record<string, TableCellTemplate> = {};
	public sortableTableCellRecord: Record<string, NgxAbstractTableCellDirective> = {};
	public dataSource: any[] = [];
	public openRows: Set<number> = new Set();
	public readonly rowsFormGroup = new FormGroup({});
	public readonly headerControl = new FormControl();
	public readonly radioControl = new FormControl();
	public definedColumns: string[] = [];
	public hasFooterTemplates: boolean = false;
	public selectedRow: number | undefined = undefined;
	public tableColumns: string[] = [];

	private readonly destroyed$ = new Subject();
	private onTouch: Function = () => {};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	private onChanged: Function = (_: any) => {};
	private currentSortingEvent: NgxTableSortEvent;
	private formGenerated: boolean = false;

	constructor(
		private cdRef: ChangeDetectorRef,
		@Optional() @Inject(NgxTableConfigToken) private readonly ngxTableConfig: NgxTableConfig
	) {}

	public writeValue(value: string[] | unknown): void {
		// Iben: In case we're using radio buttons, we set the radio control and early exit
		if (this.selectableType === 'radio') {
			this.radioControl.patchValue(value, { emitEvent: false });

			return;
		}

		// Iben: Reset the form
		this.rowsFormGroup.reset({}, { emitEvent: false });

		// Iben: Early exit if the value is empty or not an array
		if (!Array.isArray(value) || value.length === 0) {
			return;
		}

		// Iben: Patch the value to the form
		this.rowsFormGroup.patchValue(writeNgxTableValue(value, this.selectableKey), {
			emitEvent: false,
		});

		// Wouter: Some rows are not selected, so uncheck the header checkbox
		if (
			Object.values(this.rowsFormGroup.controls).some(
				(control: FormControl) => !Boolean(control?.value)
			)
		) {
			this.headerControl.patchValue(false, { emitEvent: false });
			return;
		}

		// Wouter: Set the header checkbox to `checked`, because all rows are selected
		this.headerControl.patchValue(true, { emitEvent: false });
	}

	public registerOnChange(fn: any): void {
		this.onChanged = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		if (isDisabled) {
			this.rowsFormGroup.disable({ emitEvent: false });
			this.headerControl.disable({ emitEvent: false });
			this.radioControl.disable({ emitEvent: false });
		} else {
			this.rowsFormGroup.enable({ emitEvent: false });
			this.headerControl.enable({ emitEvent: false });
			this.radioControl.enable({ emitEvent: false });
		}
	}

	public handleRowClicked(row: any, index: number) {
		// Iben: Emit a row click event
		this.rowClicked.emit(row);

		if (this.showSelectedOpenRow) {
			if (this.selectedRow === index) {
				// Benoit: If you close the selected row, unselect that row
				this.selectedRow = undefined;
			} else {
				this.selectedRow = index;
			}
		}

		// Iben: If there's no detail row we early exit
		if (!this.detailRowTemplate) {
			return;
		}

		// Iben: Depending on whether we allow multiple rows to be open at the same time, we toggle the open rows accordingly
		if (this.allowMultipleOpenRows) {
			!this.openRows.has(index) ? this.openRows.add(index) : this.openRows.delete(index);
		} else {
			this.openRows = !this.openRows.has(index) ? new Set([index]) : new Set();
		}
	}

	/**
	 * Assigns the templates of each cell to the correct columns
	 */
	private handleTableCellTemplates(): void {
		// Iben: Reset the current table cell and sortable record
		this.tableCellTemplateRecord = {};
		this.sortableTableCellRecord = {};

		// Iben: Loop over all provided table cell templates
		Array.from(this.tableCellTemplates).forEach((tableCellTemplate) => {
			// Iben: Early exit in case for some reason the template is undefined
			if (!tableCellTemplate) {
				return;
			}

			// Iben: Add the template to the template record for easy access in the table template
			const { column, headerTemplate, cellTemplate, footerTemplate, sortable, cellClass } =
				tableCellTemplate;

			this.tableCellTemplateRecord[column] = {
				headerTemplate,
				cellTemplate,
				footerTemplate,
				cellClass,
			};

			// Iben: If the column is sortable, we add it to the sortable record
			if (sortable) {
				this.sortableTableCellRecord[column] = tableCellTemplate;
			}
		});

		// Iben: Check if at least one template has a footer template, so that we know whether or not we have to render the footer row
		this.hasFooterTemplates = Array.from(this.tableCellTemplates).some((cellTemplate) =>
			Boolean(cellTemplate.footerTemplate)
		);

		// Iben:
		this.handleCurrentSort(this.currentSortingEvent);

		// Iben: Detect changes to update the view
		this.cdRef.detectChanges();
	}

	public handleSort(column: string): void {
		if (!this.sortableTableCellRecord[column]) {
			return;
		}

		Object.entries(this.sortableTableCellRecord).forEach(([cellName, cell]) => {
			if (cellName === column) {
				this.sortableTableCellRecord[column].handleSort();
			} else {
				cell.resetSortDirection();
			}
		});
	}

	private handleCurrentSort(event: NgxTableSortEvent): void {
		// Iben: Early exit if the sortable cell record is empty or if the cell already has the sortDirection of the event
		if (
			isEmpty(
				this.sortableTableCellRecord ||
					(event &&
						this.sortableTableCellRecord[event.column].sortDirection ===
							event.direction)
			)
		) {
			return;
		}

		// Iben: We reset all the sort directions by default, so all of them are unsorted.
		Object.values(this.sortableTableCellRecord).forEach((cell) => cell.resetSortDirection());

		// Iben: If there's no sort event passed, we early exit
		if (!event) {
			return;
		}

		// Iben: In case there was a sorting provided and we set the sorting to the provided column and direction
		this.sortableTableCellRecord[event.column].setSortDirection(event.direction);
	}

	/**
	 * Setup the columns array
	 */
	private handleRowColumns(): void {
		// Iben: Make sure that the select option, the open row state and the defined actions are correctly placed
		this.definedColumns = [
			...(this.selectable ? ['ngxTableSelectColumn'] : []),
			...(this.columns || []),
			...(this.actions || []),
			...(this.showOpenRowState && this.detailRowTemplate ? ['ngxOpenRowStateColumn'] : []),
		];

		// Iben: Set the actual table columns
		this.tableColumns = [...(this.columns || []), ...(this.actions || [])];
	}

	// Lifecycle methods
	// ==============================
	public ngAfterContentChecked(): void {
		// Iben: Run with content check so that we can dynamically add templates/columns
		this.handleRowColumns();
		this.handleTableCellTemplates();
	}

	public ngOnChanges(changes: SimpleChanges) {
		if (changes.data) {
			// Wouter: Deselect any row that was selected to prevent faulty class toggle.
			this.selectedRow = undefined;
		}

		// Iben: Setup the form when the data or selectable state changes
		if ((changes.data || changes.selectable) && this.selectable) {
			// Iben: If no form was generated, first generate the form we need
			if (!this.formGenerated) {
				generateNgxTableForm(this.rowsFormGroup, this.data, this.selectableKey);

				this.formGenerated = true;
			} else {
				// Iben: If a form was generated, reset it as required
				resetNgxTableForm(
					this.rowsFormGroup,
					this.data,
					this.selectableKey,
					this.resetFormOnNewData
				);
			}
		}

		// Iben: Add the selectableColumn if the rows are selectable and add an open row state when needed
		if (changes.selectable || changes.columns || changes.showOpenRowState) {
			this.handleRowColumns();
		}

		// Iben: If there's only one item in the data and we open the detail row by default, we emit the row clicked value
		if (
			this.emitValueOnSingleItem &&
			changes.data?.currentValue.length === 1 &&
			this.showDetailRow === 'on-single-item'
		) {
			this.handleRowClicked(changes.data.currentValue[0], 0);
		}

		// Iben: Reset the open rows if the amount of items are no longer the same
		if (
			changes.data &&
			changes.data.previousValue?.length !== changes.data.currentValue?.length
		) {
			this.openRows = new Set();
		}
	}

	public ngOnInit() {
		// Iben: Subscribe to the form to handle the selectable behavior
		this.rowsFormGroup.valueChanges
			.pipe(
				tap((value) => {
					// Iben: If not all items are selected, we uncheck the headerControl without emitting a value to prevent an infinite loop in the next subscription
					this.headerControl.setValue(
						Object.values(value).every((selected) => selected),
						{ emitEvent: false }
					);

					// Iben: Emit the current selection and mark the form as touched\
					this.onChanged(handleNgxTableValueChanges(value));
					this.onTouch();
				}),
				takeUntil(this.destroyed$)
			)
			.subscribe();

		// Iben: Listen to the radio control and update the value accordingly
		this.radioControl.valueChanges
			.pipe(
				tap((value) => {
					this.onChanged(value);
					this.onTouch();
				}),
				takeUntil(this.destroyed$)
			)
			.subscribe();

		// Iben: Subscribe to the headerControl to handle multiSelect behaviour
		this.headerControl.valueChanges
			.pipe(
				tap((selected) => {
					// Iben: Select all items when this control is selected, if not, unselect them all
					if (selected) {
						this.rowsFormGroup.patchValue(
							handleNgxTableHeaderValueChanges(this.rowsFormGroup)
						);
					} else {
						this.rowsFormGroup.reset();
					}
				}),
				takeUntil(this.destroyed$)
			)
			.subscribe();
	}

	public ngOnDestroy() {
		this.destroyed$.next(null);
		this.destroyed$.complete();
	}
}
