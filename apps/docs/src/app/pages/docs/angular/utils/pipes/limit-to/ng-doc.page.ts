import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../../../categories/angular';
import { LimitToPipeDemoComponent } from './demos';

const LimitToPipePage: NgDocPage = {
	title: `LimitToPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { LimitToPipeDemoComponent },
	playgrounds: {
		LimitToPipePlayground: {
			target: LimitToPipeDemoComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default LimitToPipePage;
