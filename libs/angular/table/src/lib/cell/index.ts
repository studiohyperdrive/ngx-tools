import { NgxAbstractTableCellDirective } from './cell.directive';
import { NgxCurrencyTableCellComponent } from './currency-cell.component';
import { NgxDateTableCellComponent } from './date-cell.component';
import { NgxTableCellDirective } from './generic-cell.directive';

export * from './cell.directive';
export * from './currency-cell.component';
export * from './date-cell.component';
export * from './generic-cell.directive';

export const Cells = [
	NgxAbstractTableCellDirective,
	NgxTableCellDirective,
	NgxCurrencyTableCellComponent,
	NgxDateTableCellComponent,
];
