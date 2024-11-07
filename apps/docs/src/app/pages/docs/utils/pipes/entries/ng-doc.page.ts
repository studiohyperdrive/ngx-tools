import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { EntriesPipeDemoComponent } from './demos';

const EntriesPipePage: NgDocPage = {
	title: `EntriesPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { EntriesPipeDemoComponent },
};

export default EntriesPipePage;
