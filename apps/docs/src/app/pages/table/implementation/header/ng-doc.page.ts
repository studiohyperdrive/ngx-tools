import { NgDocPage } from '@ng-doc/core';
import TableImplementationCategory from 'apps/docs/src/app/categories/table/sub-categories/implementation/ng-doc.category';
import { TableOneDemoComponent, TableTwoDemoComponent } from './demos';

const HeaderPage: NgDocPage = {
	title: `Header`,
	mdFile: './index.md',
	category: TableImplementationCategory,
	order: 4,
	demos: {
		TableOneDemoComponent,
		TableTwoDemoComponent,
	},
};

export default HeaderPage;
