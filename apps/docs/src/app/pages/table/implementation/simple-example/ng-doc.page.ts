import { NgDocPage } from '@ng-doc/core';

import { TableOneDemoComponent, TableTwoDemoComponent, TableThreeDemoComponent } from './demos';
import { TableImplementationCategory } from '../../../../categories';

const SimpleExamplePage: NgDocPage = {
	title: `Simple example`,
	mdFile: './index.md',
	category: TableImplementationCategory,
	demos: { TableOneDemoComponent, TableTwoDemoComponent, TableThreeDemoComponent },
	order: 0,
};

export default SimpleExamplePage;
