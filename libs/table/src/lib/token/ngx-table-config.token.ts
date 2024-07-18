import { InjectionToken, Type } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

type HideHeaderRowOptions = 'when-loading' | 'when-empty';

export type HideHeaderRowOption =
	| 'never'
	| [HideHeaderRowOptions]
	| [HideHeaderRowOptions, HideHeaderRowOptions];

export type ShowDetailRowOption = 'always' | 'on-click' | 'on-single-item';

/**
 * A configuration we can provide to set properties of the ngx-table globally
 */
export interface NgxTableConfig {
	/**
	 * Defines the default open behavior of detail rows. 'always' will open all rows by default, 'on-click' will only open them on click, 'on-single-item' will open the row on click and when there's only one item in the table.
	 */
	showDetailRow?: ShowDetailRowOption;
	/**
	 * A default class that will be set on the ngx-table component itself
	 */
	ngxTableClass?: string;
	/**
	 * Defines whether we always want to show the open-row state indicator for each table.
	 */
	showOpenRowState?: boolean;
	/**
	 * Defines whether multiple rows can be open at once.
	 */
	allowMultipleRowsOpen?: boolean;
	/**
	 * The default key we want to use as a property in the table data to highlight a row
	 */
	highlightKey?: string;
	/**
	 * Defines whether we want a class to be added to the currently opened row
	 */
	showSelectedOpenRow?: boolean;
	/**
	 * Defines whether we want to emit the rowClicked when there's only one item in the table and the showDetailRow is set to 'on-single-item'
	 */
	emitValueOnSingleItem?: boolean;
	/**
	 * Defines whether we want to show the header when the table is empty or loading
	 */
	hideHeaderWhen?: HideHeaderRowOption;
	/**
	 * An optional default component we want to use to render the loading state
	 */
	loadingComponent?: Type<any>;
	/**
	 * An optional default component we want to use to render the error state
	 */
	errorComponent?: Type<any>;
	/**
	 * An optional default component we want to use to render the empty state
	 */
	emptyComponent?: Type<any>;
	/**
	 * An optional default component we want to use to render the sort template
	 */
	sortComponent?: Type<any>;
	/**
	 * An optional default component we want to use to render the checkbox template
	 */
	checkboxComponent?: Type<ControlValueAccessor>;
	/**
	 * An optional default component we want to use to render the radio button template
	 */
	radioComponent?: Type<ControlValueAccessor>;
}

export const NgxTableConfigToken = new InjectionToken<NgxTableConfig>('NgxTableConfig');
