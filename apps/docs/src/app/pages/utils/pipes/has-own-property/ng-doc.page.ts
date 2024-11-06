import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { HasOwnPropertyPipeDemoComponent } from './demos';

const HasOwnPropertyPipePage: NgDocPage = {
	title: `HasOwnPropertyPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { HasOwnPropertyPipeDemoComponent },
};

export default HasOwnPropertyPipePage;
