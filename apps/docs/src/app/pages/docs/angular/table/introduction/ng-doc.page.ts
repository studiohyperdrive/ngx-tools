import { NgDocPage } from '@ng-doc/core';

import { TableCategory } from '../../../../../categories/angular';
import { NgxTableStylingDemoComponent, NgxTableConfigurationDemoComponent } from './demos';

const IntroductionPage: NgDocPage = {
	title: `Introduction`,
	mdFile: './index.md',
	category: TableCategory,
	order: 0,
	playgrounds: {
		TableStylingPlayground: {
			target: NgxTableStylingDemoComponent,
			template: '<ng-doc-selector></ng-doc-selector>',
			defaults: {
				Styling: 'Hyperdrive',
			},
		},
		TableConfigurationPlayground: {
			target: NgxTableConfigurationDemoComponent,
			template: '<ng-doc-selector></ng-doc-selector>',
		},
	},
};

export default IntroductionPage;
