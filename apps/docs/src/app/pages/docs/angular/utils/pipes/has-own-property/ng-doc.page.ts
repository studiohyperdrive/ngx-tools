import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../../../categories/angular';
import { HasOwnPropertyPipeDemoComponent } from './demos';

const HasOwnPropertyPipePage: NgDocPage = {
	title: `HasOwnPropertyPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { HasOwnPropertyPipeDemoComponent },
	playgrounds: {
		HasOwnPropertyPipePlayground: {
			target: HasOwnPropertyPipeDemoComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default HasOwnPropertyPipePage;
