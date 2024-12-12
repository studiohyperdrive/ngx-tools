import { NgDocPage } from '@ng-doc/core';
import { FormsImplementationCategory } from '../../../../../categories';
import { SimpleDemoComponent, MapperDemoComponent, OverwriteDemoComponent } from './demos';

const FormAccessorPage: NgDocPage = {
	title: `FormAccessor`,
	mdFile: './index.md',
	category: FormsImplementationCategory,
	order: 1,
	demos: {
		SimpleDemoComponent,
		MapperDemoComponent,
		OverwriteDemoComponent,
	},
};

export default FormAccessorPage;
