import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../categories';
import { StripHtmlPipeDemoComponent } from './demos';

const StripHtmlPipePage: NgDocPage = {
	title: `StripHtmlPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { StripHtmlPipeDemoComponent },
};

export default StripHtmlPipePage;
