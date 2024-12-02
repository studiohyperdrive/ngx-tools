import { NgDocPage } from '@ng-doc/core';

import { TableImplementationCategory } from '../../../../../categories';
import { TableOneDemoComponent, TableTwoDemoComponent, TableThreeDemoComponent } from './demos';

const SimpleExamplePage: NgDocPage = {
	title: `Simple example`,
	mdFile: './index.md',
	category: TableImplementationCategory,
	demos: { TableOneDemoComponent, TableTwoDemoComponent, TableThreeDemoComponent },
	order: 0,
};

export default SimpleExamplePage;
