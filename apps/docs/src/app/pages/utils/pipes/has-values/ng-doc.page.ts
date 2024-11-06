import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { HasValuesPipeDemoComponent } from './demos';

const HasValuesPipePage: NgDocPage = {
	title: `HasValuesPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { HasValuesPipeDemoComponent },
};

export default HasValuesPipePage;
