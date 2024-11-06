import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { HighlightPipeCustomDemoComponent, HighlightPipeDemoComponent } from './demos';

const HighlightPipePage: NgDocPage = {
	title: `HighlightPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { HighlightPipeDemoComponent, HighlightPipeCustomDemoComponent },
};

export default HighlightPipePage;
