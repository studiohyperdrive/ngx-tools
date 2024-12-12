import { NgDocPage } from '@ng-doc/core';
import { TableImplementationCategory } from '../../../../../categories';
import { CustomCellsDemoComponent } from './demos';

const CustomCellsPage: NgDocPage = {
	title: `Custom cells`,
	mdFile: './index.md',
	category: TableImplementationCategory,
	order: 5,
	demos: {
		CustomCellsDemoComponent
	},
};

export default CustomCellsPage;
