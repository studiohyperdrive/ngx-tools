import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { IbanPipeDemoComponent } from './demos';

const IbanPipePage: NgDocPage = {
	title: `IbanPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { IbanPipeDemoComponent },
};

export default IbanPipePage;
