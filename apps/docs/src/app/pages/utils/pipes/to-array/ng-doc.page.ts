import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { ToArrayPipeDemoComponent } from './demos';

const ToArrayPipePage: NgDocPage = {
	title: `ToArrayPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { ToArrayPipeDemoComponent },
};

export default ToArrayPipePage;
