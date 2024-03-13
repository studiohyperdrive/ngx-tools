import { FormControl } from '@angular/forms';

/**
 * The options to define the rows and columns of the layout container.
 */
export interface NgxGridLayoutOptions {
	rows?: NgxRowColumnCountOption;
	columns?: NgxRowColumnCountOption;
}

/**
 * The options to define the rows and columns of the layout container.
 * This is the entity to be used in a reactive form.
 */
export interface NgxGridLayoutFormOptions {
	rows: FormControl<NgxRowColumnCountOption>;
	columns: FormControl<NgxRowColumnCountOption>;
}

/**
 * The type assignable to the rows and columns of the layout container.
 */
export type NgxRowColumnCountOption = number | 'auto';

/**
 * The type to define whether the layout container should be oriented
 * like rows (vertical) or columns (horizontal).
 */
export type NgxDefaultLayoutOrientation = 'row' | 'column';
