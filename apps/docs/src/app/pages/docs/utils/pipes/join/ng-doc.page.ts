import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { JoinPipeDemoComponent } from './demos';

const JoinPage: NgDocPage = {
	title: `JoinPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { JoinPipeDemoComponent: JoinPipeDemoComponent },
};

export default JoinPage;
