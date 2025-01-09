import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxAccordion } from '@ngx/layout';

@Component({
	imports: [RouterModule, NgxAccordion],
	templateUrl: './demos-page.component.html',
	styleUrl: './demos-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemosPageComponent {
	public testData = [
		{
			title: 'Tour demo',
			content: 'Go to tour demo',
			route: 'tour',
		},
	];
}

const routes: Routes = [
	{
		path: '',
		component: DemosPageComponent,
		children: [
			{
				path: 'tour',
				children: [
					{
						path: '',
						loadComponent: () =>
							import(
								'../angular/tour/implementation/demos/tour/pages/main/main.component'
							).then((m) => m.MainComponent),
					},
					{
						path: 'secondary',
						loadComponent: () =>
							import(
								'../angular/tour/implementation/demos/tour/pages/secondary/secondary.component'
							).then((m) => m.SecondaryComponent),
					},
				],
			},
		],
	},
];

export default routes;
