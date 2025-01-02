import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../../../categories/angular';
import { JoinPipeDemoComponent } from './demos';

const JoinPage: NgDocPage = {
	title: `JoinPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { JoinPipeDemoComponent: JoinPipeDemoComponent },
};

export default JoinPage;
