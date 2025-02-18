---
keyword: ImplementationPage
---

The implementation of the package consists of a three individual parts, being the `NgxTourService`, the `NgxTourItemDirective` and the `NgxTourStepComponent` abstract class.

### Setup

`ngx-tour` uses the Angular CDK so it does require an initial setup in order for it to be used properly throughout the application. The following styles need to be imported at root level in order to function correctly.

```scss
@import '@angular/cdk/overlay-prebuilt.css';
```

Throughout the tour, we want to visualize individual steps to the user, usually including a way to navigate between the steps of the tour.

In order to do that, we need to provide a default component that is an implementation of the `NgxTourStepComponent` abstract. We do this by using the `provideNgxTourConfiguration` util in our main app providers array.

```ts
// main
providers: [...provideNgxTourConfiguration(CustomTourStepComponent)];
```

Using this provider, it is possible to provide either a custom component, or a configuration object. This object contains the following properties:

| NgxTourTokenConfiguration |                                                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| component                 | The default component of the entire tour. This can be overridden in individual steps as specified later on.          |
| offset                    | An object that consists of an optional `top` and `bottom` key. These specify the offset of the cutout on the y-axis. |

```ts
// main
providers: [
	...provideNgxTourConfiguration({
		component: CustomTourStepComponent,
		offset: { top: 10, bottom: 13 },
	}),
];
```

### NgxTourService

The core of the tour is the `NgxTourService`, which is a singleton service that handles all tour related methods and observables.

We define a tour by providing an array of tour steps to the tour service and running the `startTour` method. At it's core, a tour step only has two required properties, being `title` and `content`.

```ts
this.tourService.startTour([{ title: 'Hello', content: 'World' }]).subscribe();
```

By default, this step will be rendered in the middle of the screen. Of course, in real world applications, we want to render the step next to a highlighted element. We can do this using by adding the `tourItem` tag of the `NgxTourItemDirective` to an element, and provide the tag to the step. By doing so, the tour will locate the item, and attach the step to it.

```html
<p tourItem="helloWorld">Hello world!</p>
```

```ts
this.tourService
	.startTour([
		{
			title: 'Hello',
			content: 'World',
			tourItem: 'helloWorld',
		},
	])
	.subscribe();
```

Now whenever the tour navigates, it will try to find the provided element and attach the step to this element. We can provide where we want to render this step by passing a `position`, which can be `above`, `left`, `right` or `below`. By default, this is `below`.

When highlighting a step, the service automatically provides a cutout in the backdrop around the element to highlight it. By default, this cutout has a margin of 5px, but this can be overwritten by using the `cutoutMargin` property.

```ts
this.tourService
	.startTour([
		{
			title: 'Hello',
			content: 'World',
			tourItem: 'helloWorld',
			position: 'top',
			cutoutMargin: 10,
		},
	])
	.subscribe();
```

Sometimes, elements in the UI require some time before they're visible, for instance because we're waiting for a loading spinner. We can add an optional amount of time we wish to wait before the tour skips the current steps and moves on to the next step. This can be provided by the `delay` property. By default, the tour service will wait 100 ms before moving on to the next step.

```ts
this.tourService
	.startTour([
		{
			title: 'Hello',
			content: 'World',
			tourItem: 'helloWorld',
			delay: 2000,
		},
	])
	.subscribe();
```

`ngx-tour` also allows for actions to be run throughout the tour. For each step, we have the ability to run provided functions before, when and after an element is visible. We can do this by providing a `beforeVisible`, `onVisible` and `afterVisible` method respectively. This can be useful for use cases where we want to route during the tour.

```ts
this.tourService
	.startTour([
		{
			title: 'Hello',
			content: 'World',
			tourItem: 'helloWorld',
			beforeVisible: () => {
				this.router.navigate(['second-page']);
			},
			onVisible: (step, index) => {
				return this.analyticsService.sentEvent({ stepReached: index });
			},
			afterVisible: () => {
				this.router.navigate(['third-page']);
			},
		},
	])
	.subscribe();
```

Individual steps in the tour can be further customized with several properties, `component`, `disableBackdrop`, `data`, `stepClass` and `offset`.

First of, we can override the default component with a custom one using the `component` property. This is useful in use-cases where we want to have a step look completely different from the default step, like for instance an introduction step.

Using `disableBackdrop` and `stepClass` we can have even more visual control over the step, by either disabling the backdrop or attaching a custom class to the step using the properties respectively.

Additionally, we can pass extra data to a step by using the `data` property. This allows for full customizability beyond the default title and content properties.

Finally, we can specify an `offset` on the y-axis for each step. When specified, it will override the global config in the _main.ts_ provider. If the element should be shifted down by 90 pixels (before browser zoom calculations), `top: 90` can be specified. The inverse logic applies to the bottom property.

```ts
this.tourService
	.startTour([
		{
			title: 'Hello',
			content: 'World',
			stepClass: 'this-is-my-custom-class',
			component: SpecialIntroductionStepComponent,
			disableBackdrop: true,
			data: { userName: 'Mark' },
			offset: { top: 0 },
		},
	])
	.subscribe();
```

Next to the tour, we can also provide a closing function and a startIndex to the `startTour` method. This can be used to route back to the start page whenever a user has gone through a tour or can allow us to start a tour at a specific index.

```ts
this.tourService.startTour(
    [...],
    (step, index) => {
        return this.analyticsService.tourStoppedAt(index);
    },
    2
    ).subscribe()
```

Finally, the `NgxTourService` also provides a set of Observables we can listen to. Using `tourStarted$` and `tourEnded$` respectively, we can listen to the start and/or end of the tour.

Using `currentStep$`, `currentIndex$`, `previousStep$` and `currentTour$`, we can listen to the states of the current step, the previous step and the currently displayed tour.

### NgxTourItemDirective

The `NgxTourItemDirective` is used to highlight elements during the tour. Simply using the `tourItem` tag will match the provided input with the corresponding step.

When an item is highlighted, the item also gets the `ngx-tour-item-active` class.

### NgxTourStepComponent

The `NgxTourStepComponent` presents us with 7 Inputs and one Output we need to handle the tours.

By default, the two most important Inputs are `title` and `content`, which correspond with the two data properties we passed in the step. Additionally, the amount of steps in the tour and the current index of the step can be visualized using `amountOfSteps` and `currentIndex`. To maximize customisability, we can also pass a `data` property to the component. This data can be anything, and can be used to enrich a step.

For accessibility reasons it is important that there is an element in the tour-step that has the tag `#stepTitle`. By doing so, the package will automatically set the correct `aria-labbeledby` properties.

The `position` and `stepClass` inputs are used to automatically set classes to the tour step, but can still be used freely. By default, the tour step component always gets the `ngx-tour-step` class, depending on its position it will also have a corresponding `ngx-tour-step-position-left|right|below|above` class. The step class will be set automatically as well.

In order to navigate through the tour and close it when needed, the component has an Output called `handleInteraction` that takes three possible states, being `next`, `back` and `close`. Each of these interactions will continue the tour, go back in the tour or close the tour respectively.

### useMockDataDuringTour

During a tour, we might want to show different data in our views, to ensure that everything fits just right for the tour. We can use the `useMockDataDuringTour` operator to do so! Provide mock data to the operator, and depending on whether the tour is active, the correct data will be shown.

```ts
...

public readonly label$: Observable<string> = this.dataService.label$.pipe(
    useMockDataDuringTour('This is a mock!')
)
```

This operator only works within an injection context, and therefor cannot be used in methods or outside of the constructor.

### Example

{{ NgDocActions.demo("StartDemoComponent", {fullscreenRoute: "demo", expanded: true}) }}
