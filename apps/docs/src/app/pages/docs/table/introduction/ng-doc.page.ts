import { NgDocPage } from '@ng-doc/core';
import TableCategory from '../../../../categories/table/ng-doc.category';
import { TableOneDemoComponent } from './demos';

const IntroductionPage: NgDocPage = {
	title: `Introduction`,
	mdFile: './index.md',
	category: TableCategory,
	order: 0,
	playgrounds: {
		TablePlayground: {
			target: TableOneDemoComponent,
			template: '<ng-doc-selector></ng-doc-selector>',
			defaults: {
				mode: 'simple',
				selectable: false,
			},
		},
	},
};

export default IntroductionPage;
