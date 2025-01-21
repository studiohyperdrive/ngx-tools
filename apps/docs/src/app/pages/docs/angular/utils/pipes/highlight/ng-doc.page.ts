import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../../../categories/angular';
import { HighlightPipeCustomDemoComponent, HighlightPipeDemoComponent } from './demos';

const NgxHighlightPipePage: NgDocPage = {
	title: `NgxHighlightPipe`,
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

export default NgxHighlightPipePage;
