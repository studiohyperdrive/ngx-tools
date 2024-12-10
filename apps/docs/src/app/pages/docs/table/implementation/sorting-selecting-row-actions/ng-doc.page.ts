import { NgDocPage } from '@ng-doc/core';
import { TableImplementationCategory } from '../../../../../categories';
import {
	SortingDemoComponent,
	SelectableCheckboxDemoComponent,
	SelectableRadiobuttonDemoComponent,
	ActionsDemoComponent,
} from './demos';

const SortingSelectingRowActionsPage: NgDocPage = {
	title: `Sorting, selecting and row-actions`,
	mdFile: './index.md',
	category: TableImplementationCategory,
	order: 3,
	demos: {
		SortingDemoComponent,
		SelectableCheckboxDemoComponent,
		SelectableRadiobuttonDemoComponent,
		ActionsDemoComponent,
	},
};

export default SortingSelectingRowActionsPage;
