import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { LogPipeDemoComponent } from './demos';

const LogPipePage: NgDocPage = {
	title: `LogPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { LogPipeDemoComponent },
};

export default LogPipePage;
