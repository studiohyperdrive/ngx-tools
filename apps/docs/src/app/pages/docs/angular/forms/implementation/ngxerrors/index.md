---
keyword: NGXErrorsPage
---

Inspired by [Tod Motto](https://github.com/toddmotto)'s NgxErrors approach, `ngx-forms` provides its own implementation of the `ngxErrors` directive which automizes the error message rendering.

Intended to be used in projects that require consistent error messages throughout the entire codebase, this implementation of `ngxErrors` allows for a record of corresponding messages to validator errors to be set on root level, which then can be rendered in either a custom component or a standard `p` element.

The error message is always rendered right below the element the `ngxErrors` directive is placed on.

## Configuration

To implement the `ngxErrors` directive, we have to provide the necessary configuration on root level and import the `NgxFormsErrorsDirective` where used.

A simple example is shown below.

```ts
    // Root
    providers: [
		{
            provide: NgxFormsErrorsConfigurationToken,
            useValue: {
                errors: {
                    required: 'This is a required field.',
                    email: 'This field is not a valid email address.'
                },
                showWhen: 'touched',
            }
        },
    ]

    // Component
    @Component({
        selector: 'test',
        standalone: true,
        imports: [NgxFormsErrorsDirective]
    })
```

## Basic implementation

By default, only two properties are required when setting up the `NgxFormsErrorsDirective`.

The provided `errors` record makes sure that the error key that is found in the `ValidationErrors` of a control will be matched with the message we wish to show to our users.

The `showWhen` property will determine when an error message becomes visible. You can either set it to `touched` or to `dirty`.

Once configured, all we need to do is attach the directive where we wish to render the error. We suggest attaching this directly to the input or your custom input component.

```html
<ng-container [formGroup]="form">
	<p>Hello</p>
	<input *ngxFormsErrors="'hello'" formControlName="hello" type="text" />
</ng-container>
```

The `ngxFormsErrors` directive allows for a string value that matches with the provided control in a `FormGroup`. Alternatively, you can also pass the `AbstractControl` directly.

By using this approach, when the control is invalid and in our case `touched`, the directive will render a `p` element with the `ngx-forms-error` class underneath the input.

## Custom component

Of course, in many projects we do not simply want to add a `p` element. Instead, we wish to use our own custom component where we can add an icon, custom styling and even transform our provided strings using a translation package.

We can do this by providing a custom component to the `component` property in the configuration.

```ts
// Root
providers: [
    {
        provide: NgxFormsErrorsConfigurationToken,
        useValue: {
            errors: {
                required: 'This is a required field.',
                email: 'This field is not a valid email address.',
            },
            showWhen: 'touched',
        component: CustomErrorComponent,
        },
    },
]
```

This `CustomErrorComponent` has to extend the `NgxFormsErrorAbstractComponent`. This will provide the component with several inputs that can be used in our custom component.

The most important Input is the `errors`. This is an array of strings which will contain all error messages that we wish to show in the error component.

The second Input is the `errorKeys` input, which provides us with an array of keys that are found in the validation errors.

On top of that, the `data` input provides us with the actual `ValidationErrors` on the control.

## Multiple errors

By default, the directive only renders a single error, the first one that gets provided in the validation errors object. If we wish to show more errors, we can provide the `show` property in the configuration.

We can either provide a specific number of errors we wish to see or provide the option `all` to see all errors.

## Example

{{ NgDocActions.demo("NgxerrorsDemoComponent", { expanded: true }) }}
