import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { TransformPipeDemoComponent } from './demos';

const TransformPipePage: NgDocPage = {
	title: `TransformPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { TransformPipeDemoComponent },
};

export default TransformPipePage;
