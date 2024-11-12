import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../categories';
import { ToArrayPipeDemoComponent } from './demos';

const ToArrayPipePage: NgDocPage = {
	title: `ToArrayPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { ToArrayPipeDemoComponent },
};

export default ToArrayPipePage;
