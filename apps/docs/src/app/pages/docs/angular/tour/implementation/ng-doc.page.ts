import { NgDocPage } from '@ng-doc/core';
import { TourCategory } from '../../../../../categories/angular';
import {StartDemoComponent} from "./demos/tour/start-demo.component";

const ImplementationPage: NgDocPage = {
	title: `Implementation`,
	mdFile: './index.md',
	category: TourCategory,
	order: 2,
	demos: { StartDemoComponent },
	route: {
		path: 'implementation',
		children: [
			{
				path: 'demo',
				pathMatch: 'full',
				redirectTo: '/demos/tour',
			},
		],
	},
};

export default ImplementationPage;
