import { NgDocPage } from '@ng-doc/core';

import { TableImplementationCategory } from '../../../../../../categories/angular';
import {
	DefaultTemplatesDemoComponent,
	CustomCellsDemoComponent,
	CustomColumnsDemoComponent,
} from './demos';

const SimpleExamplePage: NgDocPage = {
	title: `Simple example`,
	mdFile: './index.md',
	category: TableImplementationCategory,
	demos: { DefaultTemplatesDemoComponent, CustomCellsDemoComponent, CustomColumnsDemoComponent },
	order: 0,
};

export default SimpleExamplePage;
