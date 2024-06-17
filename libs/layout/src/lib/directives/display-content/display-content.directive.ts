import {
	AfterViewInit,
	ChangeDetectorRef,
	Directive,
	Inject,
	Input,
	OnDestroy,
	TemplateRef,
	Type,
	ViewContainerRef,
} from '@angular/core';
import { Subject, distinctUntilChanged, takeUntil, tap } from 'rxjs';
import {
	NgxDisplayContentConditions,
	NgxDisplayContentConfiguration,
	NgxDisplayContentOverrideConfiguration,
	NgxDisplayContentStatus,
} from '../../types';
import { NgxDisplayContentConfigurationToken } from '../../tokens';
import { NgxOnlineService } from '../../services';
import { NgxDisplayContentComponent } from '../../abstracts';

/**
 * NgxDisplayContentDirective handles whether content should be shown based on a loading, error or offline condition by using provided default components or a provided override template
 */
@Directive({
	selector: '[displayContent]',
	standalone: true,
})
export class NgxDisplayContentDirective implements AfterViewInit, OnDestroy {
	/**
	 * A subject to handle the destroyed flow
	 */
	private readonly onDestroySubject: Subject<void> = new Subject<void>();

	/**
	 * A subject to know when we need to update the view
	 */
	private readonly updateViewSubject: Subject<void> = new Subject<void>();

	/**
	 * Holds an optional override configuration
	 */
	private overrideConfiguration: NgxDisplayContentOverrideConfiguration = {};

	/**
	 * Holds the conditions we use to render the component
	 */
	private conditions: NgxDisplayContentConditions = {};

	/**
	 * Renders the item or a default fallback based on the provided conditions
	 */
	@Input() set displayContent(conditions: NgxDisplayContentConditions) {
		// Iben: Update the conditions
		this.updateConditions(conditions);

		// Iben: Notify that the view needs to be updated
		this.updateViewSubject.next();
	}

	/**
	 * Override the existing configuration with custom configuration
	 */
	@Input() set displayContentConfiguration(
		configuration: NgxDisplayContentOverrideConfiguration
	) {
		// Iben: Update the override configuration
		this.overrideConfiguration = configuration;

		// Iben: Notify that the view needs to be updated
		this.updateViewSubject.next();
	}

	constructor(
		private readonly templateRef: TemplateRef<any>,
		private readonly cdRef: ChangeDetectorRef,
		private readonly viewContainer: ViewContainerRef,
		private readonly onlineService: NgxOnlineService,
		@Inject(NgxDisplayContentConfigurationToken)
		private readonly configuration: NgxDisplayContentConfiguration
	) {
		// Iben: If we want to listen to the online status, we set up a listener to the status of the application
		if (configuration.listenToOnlineStatus) {
			this.onlineService.online$
				.pipe(
					distinctUntilChanged(),
					tap((online) => {
						// Iben: Update the conditions with the new status
						this.updateConditions({ offline: !online });

						// Iben: Notify that the view needs to be updated
						this.updateViewSubject.next();
					}),
					takeUntil(this.onDestroySubject)
				)
				.subscribe();
		}
	}

	public ngAfterViewInit(): void {
		// Iben: Listen to whenever we need to update the view and act accordingly
		this.updateViewSubject
			.asObservable()
			.pipe(
				tap(() => {
					// Iben: Clear the current view container
					this.viewContainer.clear();

					// Iben: If we're offline, we render the offline component or template
					if (this.conditions.offline) {
						this.renderTemplate('offline', this.configuration.components.offline);

						return;
					}
					// Iben: If we're loading, we render the loading component or template
					if (this.conditions.loading) {
						this.renderTemplate('loading', this.configuration.components.loading);

						return;
					}
					// Iben: If we've encountered an error, we render the error component or template
					if (this.conditions.error) {
						this.renderTemplate('error', this.configuration.components.error);

						return;
					}

					//Iben: Render the initial template
					this.renderInitialTemplate();
				}),
				// Iben: We add a second tap here, so the detectChanges gets run after each outcome we did earlier
				tap(() => {
					// Iben: Detect the changes so this works with (nested) OnPush component
					this.cdRef.detectChanges();
				}),
				takeUntil(this.onDestroySubject.asObservable())
			)
			.subscribe();
	}

	public ngOnDestroy(): void {
		this.onDestroySubject.next();
		this.onDestroySubject.complete();
	}

	/**
	 * Renders the provided component or template
	 *
	 * @param  status - The status we're handling
	 * @param  component - The component we're wishing to render
	 */
	private renderTemplate(
		status: NgxDisplayContentStatus,
		component: Type<NgxDisplayContentComponent>
	): void {
		// Iben: If an override for this template exists, we render the override template and early exit
		if (this.overrideConfiguration[status]?.template) {
			this.viewContainer.createEmbeddedView(this.overrideConfiguration[status]?.template);

			return;
		}

		// Iben: If a component was provided, we render this component and pass along the provided data and early exit
		if (component) {
			// Iben: Render the component
			const componentRef =
				this.viewContainer.createComponent<NgxDisplayContentComponent>(component);

			// Iben: Pass the data
			componentRef.instance.data = this.overrideConfiguration[status]?.data;

			return;
		}

		// Iben: If we need to hide the template when no template was provided, we early exit
		if (this.configuration.hideWhenNoTemplateProvided) {
			return;
		}

		// Iben: In case we don't need to hide the initial template, we render it
		this.renderInitialTemplate();
	}

	/**
	 * Renders the initial template
	 */
	private renderInitialTemplate(): void {
		this.viewContainer.createEmbeddedView(this.templateRef);
	}

	/**
	 * Updates the conditions
	 *
	 * @param conditions - The conditions we want to merge with the current set
	 */
	private updateConditions(conditions: NgxDisplayContentConditions): void {
		// Iben: Update the conditions, but use a merge so that the online status can be preserved
		if (conditions) {
			this.conditions = {
				...this.conditions,
				...conditions,
			};
		}
	}
}
