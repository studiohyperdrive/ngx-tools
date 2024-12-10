import { NgDocPage } from '@ng-doc/core';
import { TableImplementationCategory } from '../../../../../categories';
import { DetailRowOneDemoComponent, DetailRowTwoDemoComponent } from './demos';

const DetailRowPage: NgDocPage = {
	title: `Detail row`,
	mdFile: './index.md',
	category: TableImplementationCategory,
	order: 1,
	demos: { DetailRowOneDemoComponent, DetailRowTwoDemoComponent },
};

export default DetailRowPage;
