import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../categories';
import { ArrayContainsOnePipeDemoComponent } from './demos/array-contains-one/array-contains-one.demo.component';

const ArrayContainsOnePipePage: NgDocPage = {
	title: `ArrayContainsOnePipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { ArrayContainsOnePipeDemoComponent },
	playgrounds: {
		ArrayContainsOnePipePlayground: {
			target: ArrayContainsOnePipeDemoComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default ArrayContainsOnePipePage;
