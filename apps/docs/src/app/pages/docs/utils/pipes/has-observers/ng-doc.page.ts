import { NgDocPage } from '@ng-doc/core';
import { PipesCategory } from '../../../../../categories';
import { HasObserversPipeDemoComponent } from './demos';
import { HasObserversPipeDemoParentComponent } from './demos/has-observers-parent-component/has-observers-parent.demo.component';

const HasObserversPipePage: NgDocPage = {
	title: `HasObserversPipe`,
	mdFile: './index.md',
	category: PipesCategory,
	demos: { HasObserversPipeDemoComponent, HasObserversPipeDemoParentComponent },
};

export default HasObserversPipePage;
