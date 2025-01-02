import { NgDocPage } from '@ng-doc/core';
import { LayoutImplementationCategory } from '../../../../../../categories/angular';
import { DisplayContentDemoComponent } from './demos';

const LayoutDirectivesPage: NgDocPage = {
	title: `Directives`,
	mdFile: './index.md',
	category: LayoutImplementationCategory,
	order: 2,
	demos: {
		DisplayContentDemoComponent,
	},
};

export default LayoutDirectivesPage;
