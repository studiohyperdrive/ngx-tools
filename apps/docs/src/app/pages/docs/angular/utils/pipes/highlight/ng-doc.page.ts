import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../../../categories';
import { HighlightPipeCustomDemoComponent, HighlightPipeDemoComponent } from './demos';

const HighlightPipePage: NgDocPage = {
	title: `HighlightPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { HighlightPipeDemoComponent, HighlightPipeCustomDemoComponent },
	playgrounds: {
		HighlightPipePlayground: {
			target: HighlightPipeCustomDemoComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default HighlightPipePage;
