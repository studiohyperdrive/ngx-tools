import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { StripHtmlPipeDemoComponent } from './demos';

const StripHtmlPipePage: NgDocPage = {
	title: `StripHtmlPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { StripHtmlPipeDemoComponent },
};

export default StripHtmlPipePage;
