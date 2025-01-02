import { NgDocPage } from '@ng-doc/core';
import { TableImplementationCategory } from '../../../../../../categories';
import { HeaderEmptyStateDemoComponent, HeaderLoadingStateDemoComponent } from './demos';

const HeaderPage: NgDocPage = {
	title: `Header`,
	mdFile: './index.md',
	category: TableImplementationCategory,
	order: 4,
	demos: {
		HeaderLoadingStateDemoComponent,
		HeaderEmptyStateDemoComponent,
	},
};

export default HeaderPage;
