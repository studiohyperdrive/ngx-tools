import { ComponentRef, Inject, Injectable, PLATFORM_ID, Type } from '@angular/core';
import {
	BehaviorSubject,
	Observable,
	Subject,
	auditTime,
	concatMap,
	distinctUntilChanged,
	filter,
	of,
	switchMap,
	take,
	takeUntil,
	tap,
} from 'rxjs';
import { ConnectedPosition, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { isPlatformBrowser } from '@angular/common';

import { NgxTourStepComponent } from '../../abstracts';
import { NgxTourItemDirective } from '../../directives';
import { NgxTourStepToken } from '../../tokens';
import {
	NgxTourDirection,
	NgxTourAction,
	NgxTourStep,
	NgxTourInteraction,
	NgxTourStepPosition,
} from '../../types';
import { elementIsVisibleInViewport } from '../../utils';

/**
 * A singleton service used to run help tours through an application.
 */
@Injectable({
	providedIn: 'root',
})
export class NgxTourService {
	/**
	 * A record of registered step elements we wish to highlight
	 */
	private elements: Record<string, BehaviorSubject<NgxTourItemDirective>> = {};
	/**
	 * A record of positions to place the
	 */
	private readonly positionMap: Record<NgxTourStepPosition, ConnectedPosition> = {
		below: { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
		above: { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
		left: { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom' },
		right: { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'bottom' },
	};

	/**
	 * The currently active overlay
	 */
	private overlayRef: OverlayRef;

	/**
	 * The amount of steps of the current tour
	 */
	private amountOfSteps: number = 0;

	/**
	 * The current direction we're moving the tour in
	 */
	private currentDirection: NgxTourDirection;

	/**
	 * The currently active step in the tour as a subject
	 */
	private readonly currentStepSubject: BehaviorSubject<NgxTourStep> =
		new BehaviorSubject<NgxTourStep>(undefined);

	/**
	 * The previously active step in the tour as a subject
	 */
	private readonly previousStepSubject: BehaviorSubject<NgxTourStep> =
		new BehaviorSubject<NgxTourStep>(undefined);

	/**
	 * The index of the current step of the tour as a subject
	 */
	private readonly currentIndexSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

	/**
	 * Whether the tour has started as a subject
	 */
	private readonly tourStartedSubject: Subject<void> = new Subject();

	/**
	 * Whether the tour has ended as a subject
	 */
	private readonly tourEndedSubject: Subject<void> = new Subject();

	/**
	 * The currently active tour as a subject
	 */
	private readonly currentTourSubject: BehaviorSubject<NgxTourStep[]> = new BehaviorSubject<
		NgxTourStep[]
	>(undefined);

	/**
	 * The start scroll position of the page
	 */
	private startingScrollPosition: number;

	/**
	 * The currently active tour
	 */
	public readonly currentTour$: Observable<NgxTourStep[]> =
		this.currentTourSubject.asObservable();

	/**
	 * The currently active step
	 */
	public readonly currentStep$: Observable<NgxTourStep> = this.currentStepSubject
		.asObservable()
		.pipe(distinctUntilChanged(), filter(Boolean));

	/**
	 * The currently active index
	 */
	public readonly currentIndex$: Observable<number> = this.currentIndexSubject
		.asObservable()
		.pipe(distinctUntilChanged());

	/**
	 * The previously active step
	 */
	public readonly previousStep$: Observable<NgxTourStep> = this.previousStepSubject
		.asObservable()
		.pipe(distinctUntilChanged(), filter(Boolean));

	/**
	 * Whether the tour has ended
	 */
	public readonly tourEnded$: Observable<void> = this.tourEndedSubject.asObservable();

	/**
	 * Whether the tour has started
	 */
	public readonly tourStarted$: Observable<void> = this.tourStartedSubject.asObservable();

	constructor(
		private readonly cdkOverlayService: Overlay,
		@Inject(PLATFORM_ID) private readonly platformId: string,
		@Inject(NgxTourStepToken) private readonly component: Type<NgxTourStepComponent>
	) {}

	/**
	 * Start a provided tour
	 *
	 * @param tour - The tour we wish to start
	 * @param onClose - An optional on close function we wish to run
	 * @param startIndex - An optional index we wish to start the tour from , default this is 0
	 */
	public startTour(
		tour: NgxTourStep[],
		onClose?: NgxTourAction,
		startIndex = 0
	): Observable<NgxTourInteraction> {
		// Iben: Save the current scroll position so we can return to it when we close the tour
		this.runInBrowser(() => {
			this.startingScrollPosition = window.scrollY;
		});

		// Iben: Loop over the tour and set subjects for all elements that haven't been found yet
		tour.forEach((step) => {
			if (!this.elements[step.tourItem]) {
				this.elements[step.tourItem] = new BehaviorSubject<NgxTourItemDirective>(undefined);
			}
		});

		// Iben: Set the new tour
		this.currentTourSubject.next(tour);

		// Iben: Set the amount of steps based on the length of the tour
		this.amountOfSteps = tour.length;

		// Iben: Set the first two starting subjects
		this.currentIndexSubject.next(startIndex);
		this.tourStartedSubject.next();

		// Iben: Listen to the end of the tour and run the end function when needed
		this.tourEndedSubject
			.asObservable()
			.pipe(
				take(1),
				switchMap(() => this.runStepFunction(onClose)),
				tap(() => {
					// Iben: Scroll back to the starting position
					this.runInBrowser(() => {
						window.scrollTo({ top: this.startingScrollPosition });
					});
				})
			)
			.subscribe();

		// Iben: Start the first tour, and run it until the tour is ended
		return this.setStep(tour[startIndex]).pipe(takeUntil(this.tourEndedSubject.asObservable()));
	}

	/**
	 * Registers a template element so it can be highlighted
	 *
	 * @param element - The highlighted element
	 */
	public registerElement(element: NgxTourItemDirective): void {
		// Iben: Early exit if no element was found
		if (!element) {
			return;
		}

		// Iben: Check if there is already an item with the current id. If it is, update it, if not, make a new BehaviorSubject
		const elementSubject = this.elements[element.tourItem];

		if (elementSubject) {
			elementSubject.next(element);
			return;
		}

		this.elements[element.tourItem] = new BehaviorSubject<NgxTourItemDirective>(element);
	}

	/**
	 * Removes an element from the record
	 *
	 * @param element - The id of the element
	 */
	public unregisterElement(element: string): void {
		this.elements[element]?.next(undefined);
	}

	/**
	 * Closes the currently running tour
	 */
	public closeTour(): Observable<NgxTourInteraction> {
		// Iben: Remove the current overlay
		if (this.overlayRef) {
			this.overlayRef.dispose();
			this.overlayRef = undefined;
		}

		// Iben: Reset the tour and the tour length
		this.currentTourSubject.next(undefined);
		this.amountOfSteps = 0;

		// Iben: Emit the end of the tour
		this.tourEndedSubject.next();

		// Iben: Return an empty Observable
		return of(null);
	}

	/**
	 * Sets a provided step in the tour
	 *
	 * @param currentStep - The provided step we want to set
	 */
	private setStep(currentStep: NgxTourStep): Observable<NgxTourInteraction> {
		// Iben: If there's already an overlay, detach it
		if (this.overlayRef) {
			this.overlayRef.detach();
			this.overlayRef.dispose();
			this.overlayRef = undefined;
		}

		// Iben: Get the previous step, if it exists
		const previousStep = this.currentStepSubject.getValue();
		const previousItem = this.elements[previousStep?.tourItem]?.getValue();

		// Iben: Set the previous item back to inactive
		if (previousItem) {
			previousItem.setActive(false);
		}

		// Iben: Run the afterVisible of the previous step
		return this.runStepFunction(previousStep?.afterVisible).pipe(
			// Iben: Run the beforeVisible of the current step
			concatMap(() => {
				return this.runStepFunction(currentStep.beforeVisible);
			}),
			concatMap(() => {
				// Iben: If no tourItem was provided, we render the step in the center of the page
				if (!currentStep.tourItem) {
					return this.handleStepInteractions(currentStep);
				}

				// Iben: If a tourItem was provided, we know we have to search for the element
				return this.elements[currentStep.tourItem].pipe(
					// Iben: Check if the item already exists. If not, we wait and grab the latest emit using auditTime
					// We do this to avoid a delay when going back and forth in the tour
					concatMap((item) => {
						return item
							? of(item)
							: this.elements[currentStep.tourItem].pipe(
									// Iben: If no delay was provided, we use the default of 100ms
									auditTime(currentStep.delay || 100)
							  );
					}),
					take(1),
					switchMap((item) => {
						// Iben: If an item wasn't found, we move in the current direction until we find an element
						if (!item) {
							return this.handleNext(this.currentDirection || 'next');
						}
						// Iben: If the item was found, we visualize the step
						return this.handleStepInteractions(currentStep, item);
					})
				);
			})
		);
	}

	/**
	 * Handles the next action in the tour
	 *
	 * @param direction - The direction we wish to move in
	 */
	private handleNext(direction: NgxTourDirection): Observable<NgxTourInteraction> {
		// Iben set the current direction so we know in which way we're moving the tour
		this.currentDirection = direction;

		// Iben: Get the new index
		const index =
			direction === 'next'
				? this.currentIndexSubject.getValue() + 1
				: this.currentIndexSubject.getValue() - 1;

		// Iben: Update the new index
		this.currentIndexSubject.next(index);

		// Iben: Set the next step in the tour
		return this.setStep(this.currentTourSubject.getValue()[index]);
	}

	/**
	 * Visualizes the current step
	 *
	 * @private
	 * @param currentStep - The step we wish to visualize
	 * @param item - The item we wish to highlight
	 */
	private visualizeStep(
		currentStep: NgxTourStep,
		item?: NgxTourItemDirective
	): ComponentRef<NgxTourStepComponent> {
		// Iben: Update the previous and current step subject
		this.previousStepSubject.next(this.currentStepSubject.getValue());
		this.currentStepSubject.next(currentStep);

		// Iben: Scroll item into view if it's not in view
		this.runInBrowser(() => {
			if (item && !elementIsVisibleInViewport(item.elementRef.nativeElement)) {
				item.elementRef.nativeElement.scrollIntoView();
			}
		});

		// Iben: Determine the position of the item based on whether a tourItem was provided
		const positionStrategy = item
			? this.cdkOverlayService
					.position()
					.flexibleConnectedTo(item.elementRef)
					.withPositions([this.positionMap[currentStep.position || 'below']])
			: this.cdkOverlayService.position().global().centerHorizontally().centerVertically();

		// Iben: Create an overlay
		const config = new OverlayConfig({
			hasBackdrop: !currentStep.disableBackDrop,
			scrollStrategy: this.cdkOverlayService.scrollStrategies.block(),
			positionStrategy,
		});

		// Iben: Create an overlay
		this.overlayRef = this.cdkOverlayService.create(config);

		// Iben: Create a portal and attach the component
		const portal = new ComponentPortal<NgxTourStepComponent>(
			// Iben: If the currentStep has its own component, we overwrite it
			currentStep.component || this.component
		);

		const componentRef = this.overlayRef.attach(portal);
		const component = componentRef.instance;

		// Iben: Update the data of the component
		component.content = currentStep.content;
		component.title = currentStep.title;
		component.currentStep = this.currentIndexSubject.getValue();
		component.amountOfSteps = this.amountOfSteps;

		// Iben: Highlight the current html item as active if one is provided
		if (item) {
			// Iben: Set the active class of the item
			item.setActive(true);

			// Iben: Set the clip path of the backdrop
			this.setClipPath(
				this.overlayRef.backdropElement,
				item.elementRef.nativeElement,
				currentStep.cutoutMargin === undefined ? 5 : currentStep.cutoutMargin
			);
		}

		// Iben: Return the new component
		return componentRef;
	}

	/**
	 * Handles the interactions with a step
	 *
	 * @param  currentStep - The provided step
	 * @param  item - An optional item
	 */
	private handleStepInteractions(
		currentStep: NgxTourStep,
		item?: NgxTourItemDirective
	): Observable<NgxTourInteraction> {
		// Iben: If the item was found, we visualize the step
		const componentRef = this.visualizeStep(currentStep, item);

		return this.runStepFunction(currentStep.onVisible).pipe(
			concatMap(() => {
				return componentRef.instance.handleInteraction.pipe(
					take(1),
					concatMap((interaction: NgxTourInteraction) => {
						return interaction === 'close'
							? this.closeTour()
							: this.handleNext(interaction);
					})
				);
			})
		);
	}

	/**
	 * Returns an observable based on whether a step function was provided
	 *
	 * @param stepFunction - The provided step function
	 */
	private runStepFunction(stepFunction?: NgxTourAction): Observable<unknown> {
		// Iben: If no step function was provided, we simply return a single void of
		if (!stepFunction) {
			return of(null);
		}

		// Iben: Run the step function and depending on the result, we return the result or an of.
		return (
			stepFunction(this.currentStepSubject.getValue(), this.currentIndexSubject.getValue()) ||
			of(null)
		).pipe(
			// Iben: We add a take(1) as an extra safety measure in case users end up not taking care of this
			take(1)
		);
	}

	/**
	 * Surrounds the provided item with a cutout in the backdrop
	 *
	 * @private
	 * @param backdrop - The provided backdrop
	 * @param item - The item we wish to surround
	 * @param cutoutMargin - The amount of margin we want around the item
	 */
	private setClipPath(backdrop: HTMLElement, item: HTMLElement, cutoutMargin: number): void {
		// Iben: Early exit in case no backdrop or item is present
		if (!backdrop || !item) {
			return;
		}

		// Iben: Get the positions of the path around the item
		const { top, left, bottom, right } = item.getBoundingClientRect();
		const positionTop = top - cutoutMargin;
		const positionLeft = left - cutoutMargin;
		const positionBottom = bottom + cutoutMargin;
		const positionRight = right + cutoutMargin;

		// Iben: Create the box around the item
		const box = `${positionLeft}px ${positionTop}px, ${positionRight}px ${positionTop}px, ${positionRight}px ${positionBottom}px, ${positionLeft}px ${positionBottom}px, ${positionLeft}px ${positionTop}px`;

		// Iben: Clip the box out of the backdrop
		backdrop.style.clipPath = `polygon(evenodd, 0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%,${box})`;
	}

	//TODO: Iben: Remove this function in service of the WindowService once it is shared
	private runInBrowser(callBack: () => void): void {
		if (isPlatformBrowser(this.platformId)) {
			callBack();
		}
	}
}
