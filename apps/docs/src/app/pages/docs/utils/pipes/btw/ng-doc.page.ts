import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { BtwPipeDemoComponent } from './demos/btw-pipe/btw-pipe.demo.component';

const BtwPipePage: NgDocPage = {
	title: `BtwPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { BtwPipeDemoComponent },
	playgrounds: {
		BtwPipePlayground: {
			target: BtwPipeDemoComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default BtwPipePage;
