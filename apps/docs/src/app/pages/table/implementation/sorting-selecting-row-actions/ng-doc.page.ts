import { NgDocPage } from '@ng-doc/core';
import { TableImplementationCategory } from '../../../../categories';
import {
	TableOneDemoComponent,
	TableTwoDemoComponent,
	TableThreeDemoComponent,
	TableFourDemoComponent,
} from './demos';

const SortingSelectingRowActionsPage: NgDocPage = {
	title: `Sorting, selecting and row-actions`,
	mdFile: './index.md',
	category: TableImplementationCategory,
	order: 3,
	demos: {
		TableOneDemoComponent,
		TableTwoDemoComponent,
		TableThreeDemoComponent,
		TableFourDemoComponent,
	},
};

export default SortingSelectingRowActionsPage;
