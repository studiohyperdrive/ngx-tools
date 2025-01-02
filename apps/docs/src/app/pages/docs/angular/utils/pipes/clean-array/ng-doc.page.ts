import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../../../categories/angular';
import { CleanArrayPipeDemoComponent } from './demos';

const CleanArrayPipePage: NgDocPage = {
	title: `CleanArrayPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { CleanArrayPipeDemoComponent },
};

export default CleanArrayPipePage;
