import { NgDocPage } from '@ng-doc/core';
import PipesCategory from 'apps/docs/src/app/categories/utils/sub-categories/pipes/ng-doc.category';
import { TruncateTextPipeDemoComponent } from './demos';

const TruncateTextPipePage: NgDocPage = {
	title: `TruncateTextPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { TruncateTextPipeDemoComponent },
};

export default TruncateTextPipePage;
