import { NgDocPage } from '@ng-doc/core';
import { FormsImplementationCategory } from '../../../../../../categories';
import { FormAccessorContainerDemoComponent } from './demos';

const FormAccessorContainerPage: NgDocPage = {
	title: `FormAccessorContainer`,
	mdFile: './index.md',
	category: FormsImplementationCategory,
	order: 2,
	demos: {
		FormAccessorContainerDemoComponent,
	},
};

export default FormAccessorContainerPage;
