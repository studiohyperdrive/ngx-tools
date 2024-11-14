import { NgDocPage } from '@ng-doc/core';
import { TableImplementationCategory } from '../../../../../categories';
import { TableOneDemoComponent, TableTwoDemoComponent } from './demos';

const DetailRowPage: NgDocPage = {
	title: `Detail row`,
	mdFile: './index.md',
	category: TableImplementationCategory,
	order: 1,
	demos: { TableOneDemoComponent, TableTwoDemoComponent },
};

export default DetailRowPage;
