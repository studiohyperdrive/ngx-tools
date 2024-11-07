import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { CleanArrayPipeDemoComponent } from './demos';

const CleanArrayPipePage: NgDocPage = {
	title: `CleanArrayPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { CleanArrayPipeDemoComponent },
};

export default CleanArrayPipePage;
