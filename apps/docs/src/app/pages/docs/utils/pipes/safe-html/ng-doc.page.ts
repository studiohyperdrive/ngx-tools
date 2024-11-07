import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { SafeHtmlPipeDemoComponent } from './demos';

const SafeHtmlPipePage: NgDocPage = {
	title: `SafeHtmlPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { SafeHtmlPipeDemoComponent },
};

export default SafeHtmlPipePage;
