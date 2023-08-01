import { NgxTableGetPipe } from './get-pipe/get.pipe';
import { NgxTableHasObserversPipe } from './has-observers.pipe';
import { NgxTableSortIconPipe } from './sort-icon.pipe';

export * from './has-observers.pipe';
export * from './sort-icon.pipe';
export * from './get-pipe/get.pipe';

export const Pipes = [NgxTableHasObserversPipe, NgxTableSortIconPipe, NgxTableGetPipe];
