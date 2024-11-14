import { NgDocPage } from '@ng-doc/core';
import LayoutImplementationCategory from 'apps/docs/src/app/categories/layout/sub-categories/implementation/ng-doc.category';
import {
	LayoutAccordionDemoComponent,
	LayoutConfigurableDemoComponent,
	LayoutEditableDemoComponent,
} from './demos';

const ComponentsPage: NgDocPage = {
	title: `Components`,
	mdFile: './index.md',
	category: LayoutImplementationCategory,
	order: 0,
	demos: {
		LayoutAccordionDemoComponent,
		LayoutConfigurableDemoComponent,
		LayoutEditableDemoComponent,
	},
};

export default ComponentsPage;
