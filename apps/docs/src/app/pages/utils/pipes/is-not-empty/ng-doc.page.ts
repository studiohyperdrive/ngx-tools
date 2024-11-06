import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { IsNotEmptyPipeDemoComponent } from './demos';

const IsNotEmptyPipePage: NgDocPage = {
	title: `IsNotEmptyPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { IsNotEmptyPipeDemoComponent },
};

export default IsNotEmptyPipePage;
