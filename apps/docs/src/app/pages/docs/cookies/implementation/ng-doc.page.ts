import { NgDocPage } from '@ng-doc/core';
import { CookiesCategory } from '../../../../categories';
import { JsonPipe } from '@angular/common';

const ImplementationPage: NgDocPage = {
	title: `Implementation`,
	mdFile: './index.md',
	category: CookiesCategory,
	order: 2,
};

export default ImplementationPage;
