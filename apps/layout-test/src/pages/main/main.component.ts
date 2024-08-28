import { ChangeDetectorRef, Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { from, map, of, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpecialTourItemComponent } from '../../tour/special-tour.component';
import {
	NgxConfigurableLayoutComponent,
	NgxConfigurableLayoutItemComponent,
	NgxConfigurableLayoutGrid,
	NgxConfigurableLayoutItemDropEvent,
	NgxDisplayContentDirective,
	NgxTooltipDirective,
} from '@ngx/layout';
import { NgxTourItemDirective, NgxTourService, useMockDataDuringTour } from '@ngx/tour';

@Component({
	selector: 'main',
	templateUrl: './main.component.html',
	styleUrl: './main.component.scss',
	standalone: true,
	imports: [
		NgxConfigurableLayoutComponent,
		NgxConfigurableLayoutItemComponent,
		ReactiveFormsModule,
		NgxDisplayContentDirective,
		NgxTourItemDirective,
		CommonModule,
		NgxTooltipDirective,
	],
})
export class MainComponent {
	public control: FormControl<NgxConfigurableLayoutGrid> = new FormControl([]);
	public isActive: FormControl<boolean> = new FormControl(false);
	public dragAndDrop: FormControl<boolean> = new FormControl(true);
	public form: FormGroup = new FormGroup({
		loading: new FormControl<boolean>(false),
		offline: new FormControl<boolean>(false),
		error: new FormControl<boolean>(false),
	});
	public tooltipWithLinkText =
		'This is a test with a link! <a tabIndex="0" href="www.google.com" target="_blank">Link me!</a>';

	public dataString$ = of('Start the tour!').pipe(
		useMockDataDuringTour<string>('The tour is running!')
	);

	constructor(
		private readonly tourService: NgxTourService,
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly cdRef: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.control.patchValue([
			[
				{ key: '1', isActive: true },
				{ key: '2', isActive: true },
				{ key: 'a', isActive: false },
			],
			[{ key: 'b', isActive: true }],
		]);

		this.tourService.currentTour$
			.pipe(
				map((tour) => Boolean(tour)),
				tap((isTourActive) => console.log('Tour active:', isTourActive))
			)
			.subscribe();
	}

	drop(event: NgxConfigurableLayoutItemDropEvent): boolean {
		if (event.eventType == 'sorting') {
			return true;
		}

		const grid = event.showInactive
			? event.currentGrid
			: [...event.currentGrid].map((row) => row.filter((item) => item.isActive));

		return grid[event.targetRowIndex].length < 2;
	}

	startTour() {
		this.tourService
			.startTour(
				[
					{
						title: 'Welcome to the tour',
						content: 'This is a test!',
					},
					{
						tourItem: 'start',
						content: 'This is a test',
						title: 'Hello world',
						stepClass: 'hello-world',
						beforeVisible: () => {
							return of(undefined).pipe(
								tap(() => console.log('Running this before step 1'))
							);
						},
						afterVisible: () => {
							console.log('Running this after visible step 1');
						},
					},
					{
						tourItem: 'middle',
						content: 'This is a test',
						title: 'Hello world 1',
						component: SpecialTourItemComponent,
					},
					{
						beforeVisible: () => {
							this.router.navigate(['']);
						},
						tourItem: 'not-existing',
						content: 'This is a test',
						title: 'Hello world 1',
					},
					{
						title: 'Navigating to the next page',
						content: 'This is a test!',
					},
					{
						tourItem: 'secondary',
						content: 'Secondary',
						title: 'Secondary',
						beforeVisible: () => {
							this.router.navigate(['secondary'], { relativeTo: this.route });
						},
					},
					{
						delay: 1000,
						tourItem: 'async',
						content: 'Async content',
						title: 'Async',
					},
					{
						tourItem: 'item',
						content: 'Get the first repeated item',
						title: 'Repeated item',
					},
					{
						beforeVisible: () => {
							this.router.navigate(['']);
						},
						tourItem: 'middle',
						content: 'This is a test',
						title: 'Hello world 1',
					},
					{
						tourItem: 'scrollToMe',
						content: 'This is a test',
						title: 'Hello world 2',
						position: 'above',
					},
				],
				() => {
					return from(this.router.navigate([''])).pipe(
						tap(() => {
							this.cdRef.detectChanges();
							console.log('This is the onClose callback');
						})
					);
				}
			)
			.pipe(
				tap(() => {
					console.log(
						'The tour has ended and all is reverted to their original state. This is ran at the very last.'
					);
				})
			)
			.subscribe();
	}
}
