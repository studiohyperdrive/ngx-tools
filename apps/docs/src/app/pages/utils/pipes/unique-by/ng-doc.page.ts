import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { UniqueByPipeDemoComponent } from './demos';

const UniqueByPipePage: NgDocPage = {
	title: `UniqByPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { UniqueByPipeDemoComponent },
};

export default UniqueByPipePage;
