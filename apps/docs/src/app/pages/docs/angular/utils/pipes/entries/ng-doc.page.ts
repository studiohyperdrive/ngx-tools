import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../../../categories/angular';
import { EntriesPipeDemoComponent } from './demos';

const EntriesPipePage: NgDocPage = {
	title: `EntriesPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { EntriesPipeDemoComponent },
};

export default EntriesPipePage;
