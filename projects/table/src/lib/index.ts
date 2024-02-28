import { Cells } from './cell';
import { NgxTableComponent } from './table/ngx-table.component';

export * from './table/ngx-table.component';
export * from './cell';
export * from './interfaces';
export * from './enums';
export * from './pipes';
export * from './token';

/** All the necessary ngx-table components */
export const NgxTable = [NgxTableComponent, ...Cells];
