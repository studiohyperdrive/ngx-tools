import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../../categories';
import { HasOwnPropertyPipeDemoComponent } from './demos';

const HasOwnPropertyPipePage: NgDocPage = {
	title: `HasOwnPropertyPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { HasOwnPropertyPipeDemoComponent },
};

export default HasOwnPropertyPipePage;
