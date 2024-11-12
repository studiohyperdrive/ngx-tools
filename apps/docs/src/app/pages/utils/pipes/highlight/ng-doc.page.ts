import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../categories';
import { HighlightPipeCustomDemoComponent, HighlightPipeDemoComponent } from './demos';

const HighlightPipePage: NgDocPage = {
	title: `HighlightPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { HighlightPipeDemoComponent, HighlightPipeCustomDemoComponent },
};

export default HighlightPipePage;
