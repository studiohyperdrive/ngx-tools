import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../categories';
import { IbanPipeDemoComponent } from './demos';

const IbanPipePage: NgDocPage = {
	title: `IbanPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { IbanPipeDemoComponent },
};

export default IbanPipePage;
