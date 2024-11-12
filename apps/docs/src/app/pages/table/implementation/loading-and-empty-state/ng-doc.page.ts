import { NgDocPage } from '@ng-doc/core';
import { TableImplementationCategory } from '../../../../categories';
import { TableOneDemoComponent, TableTwoDemoComponent } from './demos';

const LoadingAndEmptyStatePage: NgDocPage = {
	title: `Loading and empty state`,
	mdFile: './index.md',
	category: TableImplementationCategory,
	order: 2,
	demos: { TableOneDemoComponent, TableTwoDemoComponent },
};

export default LoadingAndEmptyStatePage;
