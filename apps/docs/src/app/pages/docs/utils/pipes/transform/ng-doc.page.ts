import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../../categories';
import { TransformPipeDemoComponent } from './demos';

const TransformPipePage: NgDocPage = {
	title: `TransformPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { TransformPipeDemoComponent },
};

export default TransformPipePage;
