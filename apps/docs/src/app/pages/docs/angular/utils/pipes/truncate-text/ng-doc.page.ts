import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../../../categories/angular';
import { TruncateTextPipeDemoComponent } from './demos';

const TruncateTextPipePage: NgDocPage = {
	title: `TruncateTextPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { TruncateTextPipeDemoComponent },
};

export default TruncateTextPipePage;
