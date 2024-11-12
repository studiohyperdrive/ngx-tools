import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../categories';
import { LimitToPipeDemoComponent } from './demos';

const LimitToPipePage: NgDocPage = {
	title: `LimitToPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { LimitToPipeDemoComponent },
};

export default LimitToPipePage;
