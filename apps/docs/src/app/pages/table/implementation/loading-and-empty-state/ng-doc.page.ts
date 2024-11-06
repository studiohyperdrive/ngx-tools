import { NgDocPage } from '@ng-doc/core';
import TableImplementationCategory from 'apps/docs/src/app/categories/table/sub-categories/implementation/ng-doc.category';
import { TableOneDemoComponent, TableTwoDemoComponent } from './demos';

const LoadingAndEmptyStatePage: NgDocPage = {
	title: `Loading and empty state`,
	mdFile: './index.md',
	category: TableImplementationCategory,
	order: 2,
	demos: { TableOneDemoComponent, TableTwoDemoComponent },
};

export default LoadingAndEmptyStatePage;
