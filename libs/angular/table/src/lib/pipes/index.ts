import { NgxTableGetPipe } from './get-pipe/get.pipe';
import { NgxTableHasObserversPipe } from './has-observers.pipe';
import { NgxTableSortIconPipe } from './sort-icon.pipe';
import { NgxTableShowHeaderPipe } from './show-header/show-header.pipe';
import { NgxAriaSortPipe } from './aria-sort/aria-sort.pipe';

export * from './has-observers.pipe';
export * from './sort-icon.pipe';
export * from './get-pipe/get.pipe';
export * from './show-header/show-header.pipe';
export * from './aria-sort/aria-sort.pipe';

export const Pipes = [
	NgxTableHasObserversPipe,
	NgxTableSortIconPipe,
	NgxTableGetPipe,
	NgxTableShowHeaderPipe,
	NgxAriaSortPipe,
];
