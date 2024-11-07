import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { LimitToPipeDemoComponent } from './demos';

const LimitToPipePage: NgDocPage = {
	title: `LimitToPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { LimitToPipeDemoComponent },
};

export default LimitToPipePage;
