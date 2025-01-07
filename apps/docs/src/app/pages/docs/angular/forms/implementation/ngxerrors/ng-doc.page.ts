import { NgDocPage } from '@ng-doc/core';
import { FormsImplementationCategory } from '../../../../../../categories/angular';
import { NgxerrorsDemoComponent } from './demos';

const NGXErrorsPage: NgDocPage = {
	title: `NGXErrors`,
	mdFile: './index.md',
	category: FormsImplementationCategory,
	order: 3,
	demos: {
		NgxerrorsDemoComponent,
	},
};

export default NGXErrorsPage;
