import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../../../categories/angular';
import { MergeArraysPipeDemoComponent } from './demos';

const MergeArraysPipePage: NgDocPage = {
	title: `MergeArraysPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { MergeArraysPipeDemoComponent },
};

export default MergeArraysPipePage;
