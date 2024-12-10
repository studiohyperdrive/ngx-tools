import { NgDocPage } from '@ng-doc/core';
import { TableImplementationCategory } from '../../../../../categories';
import { EmptyStateDemoComponent, LoadingStateDemoComponent } from './demos';

const LoadingAndEmptyStatePage: NgDocPage = {
	title: `Loading and empty state`,
	mdFile: './index.md',
	category: TableImplementationCategory,
	order: 2,
	demos: { EmptyStateDemoComponent, LoadingStateDemoComponent },
};

export default LoadingAndEmptyStatePage;
