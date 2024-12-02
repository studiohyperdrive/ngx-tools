import { NgDocPage } from '@ng-doc/core';
import { StoreCategory } from 'apps/docs/src/app/categories';

const ImplementationPage: NgDocPage = {
	title: `Implementation`,
	mdFile: './index.md',
	category: StoreCategory,
	order: 2,
};

export default ImplementationPage;
