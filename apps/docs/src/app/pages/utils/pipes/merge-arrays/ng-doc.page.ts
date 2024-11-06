import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { MergeArraysPipeDemoComponent } from './demos';

const MergeArraysPipePage: NgDocPage = {
	title: `MergeArraysPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { MergeArraysPipeDemoComponent },
};

export default MergeArraysPipePage;
