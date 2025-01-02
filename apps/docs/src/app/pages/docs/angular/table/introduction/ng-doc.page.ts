import { NgDocPage } from '@ng-doc/core';

import { TableCategory } from '../../../../../categories';
import { TableIntroductionDemoComponent } from './demos';

const IntroductionPage: NgDocPage = {
	title: `Introduction`,
	mdFile: './index.md',
	category: TableCategory,
	order: 0,
	playgrounds: {
		TablePlayground: {
			target: TableIntroductionDemoComponent,
			template: '<ng-doc-selector></ng-doc-selector>',
			defaults: {
				mode: 'simple',
				selectable: false,
			},
		},
	},
};

export default IntroductionPage;
