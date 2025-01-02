import { NgDocPage } from '@ng-doc/core';
import { FormsImplementationCategory } from '../../../../../../categories/angular';
import {
	SimpleDemoComponent,
	MapperDemoComponent,
	OverwriteDemoComponent,
	DataFormAccessorDemoComponent,
} from './demos';

const FormAccessorPage: NgDocPage = {
	title: `FormAccessor`,
	mdFile: './index.md',
	category: FormsImplementationCategory,
	order: 1,
	demos: {
		SimpleDemoComponent,
		MapperDemoComponent,
		OverwriteDemoComponent,
		DataFormAccessorDemoComponent,
	},
};

export default FormAccessorPage;
