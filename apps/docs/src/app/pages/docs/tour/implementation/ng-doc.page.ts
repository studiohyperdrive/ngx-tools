import { NgDocPage } from '@ng-doc/core';
import { TourCategory } from '../../../../categories';
import { SecondaryComponent, TourDemoComponent } from './demos';

const ImplementationPage: NgDocPage = {
	title: `Implementation`,
	mdFile: './index.md',
	category: TourCategory,
	order: 2,
	demos: { TourDemoComponent },
	route: {
		path: 'implementation',
		children: [
			{
				path: 'demo',
				pathMatch: 'full',
				component: TourDemoComponent,
			},
			{
				path: 'secondary',
				pathMatch: 'full',
				component: SecondaryComponent,
			},
		],
	},
};

export default ImplementationPage;
