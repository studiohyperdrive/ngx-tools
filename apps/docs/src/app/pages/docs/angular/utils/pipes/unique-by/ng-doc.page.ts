import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../../../categories';
import { UniqueByPipeDemoComponent } from './demos';

const UniqueByPipePage: NgDocPage = {
	title: `UniqByPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { UniqueByPipeDemoComponent },
	playgrounds: {
		UniqueByPipePlayground: {
			target: UniqueByPipeDemoComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default UniqueByPipePage;
