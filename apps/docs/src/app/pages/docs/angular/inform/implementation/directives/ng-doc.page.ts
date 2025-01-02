import { NgDocPage } from '@ng-doc/core';
import { InformImplementationCategory } from '../../../../../../categories/angular';
import { TooltipDemoComponent } from './demos';

const DirectivesPage: NgDocPage = {
	title: `Directives`,
	mdFile: './index.md',
	category: InformImplementationCategory,
	order: 0,
	demos: {
		TooltipDemoComponent,
	},
};

export default DirectivesPage;
