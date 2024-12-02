import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../../categories';
import { SafeHtmlPipeDemoComponent } from './demos';

const SafeHtmlPipePage: NgDocPage = {
	title: `SafeHtmlPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { SafeHtmlPipeDemoComponent },
};

export default SafeHtmlPipePage;
