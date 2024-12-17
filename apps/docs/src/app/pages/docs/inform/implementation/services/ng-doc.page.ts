import { NgDocPage } from '@ng-doc/core';
import { InformImplementationCategory } from '../../../../../categories';
import { ModalDemoComponent } from './demos';

const ServicesPage: NgDocPage = {
	title: `Services`,
	mdFile: './index.md',
	category: InformImplementationCategory,
	order: 1,
	demos: {
		ModalDemoComponent,
	},
};

export default ServicesPage;
