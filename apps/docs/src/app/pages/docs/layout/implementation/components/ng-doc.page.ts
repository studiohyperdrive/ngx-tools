import { NgDocPage } from '@ng-doc/core';
import {
	LayoutAccordionDemoComponent,
	LayoutConfigurableDemoComponent,
	LayoutEditableDemoComponent,
} from './demos';
import { LayoutImplementationCategory } from '../../../../../categories';

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
