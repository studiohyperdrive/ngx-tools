# Angular Tools: forms (`@studiohyperdrive/ngx-forms`)

Install the package first:
```shell
npm install @studiohyperdrive/ngx-forms
```

## 1. Validators

A set of extra custom validators compatible with the default Angular validators and reactive forms.

### extendedEmail
Extends the default e-mail validator with a required period in the tld part of te email. 

### allOrNothingRequired
A FormGroup validator that checks whether either all controls in a FormGroup are filled in, or no controls are. This validator is particularly useful when dealing with optional FormGroups within a form.

### atLeastOneRequired
A FormGroup validator that checks whether at least one of the provided controls was filled in. A separate function to determine the filled in state can be provided.

### dependedRequired
A FormGroup validator that checks whether a series of controls are filled in when another control was filled in. A separate function to determine the filled in state can be provided.

### decimalsAfterComma
A validator that checks whether a provided number matches with a maximum amount of decimals after the comma.

### chronologicalDates
A validator that checks whether two dates are in chronological order.

### dateRangeValidator
A validator that checks whether a date falls between a provided range. The start and end date of the range are exclusive.

### set/clearFormError
In custom validators, it is often useful to be able to quickly add or remove a specific error from the control. Using the `setFormError` we can easily set a specific error on a control, whilst `clearFormError` will remove said error.

## 2. FormAccessor

### Concept

A `FormAccessor` can represent a control, group or array form, and has its own validation, disabled and touched state.

This approach allows us to easily compartmentalize larger forms into smaller components, which then hold their own logic and allow them to be re-used throughout the entire application with ease. An added benefit to this approach is the ability to specifically map the data to an interface that best matches the form UI, whilst preserving the initial interface of the data throughout the rest of the application.

`FormAccessor` is an abstract layer on top of the `CustomControlValueAccessor`, and provides a default implementation for the most commonly implemented methods that are needed for a [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor). These methods are: [writeValue](https://angular.io/api/forms/ControlValueAccessor#writeValue), [onChange](https://angular.io/api/forms/ControlValueAccessor#registerOnChange), [validate](https://angular.io/api/forms/NG_VALIDATORS), [setDisabledState](https://angular.io/api/forms/ControlValueAccessor#setdisabledstate), [markAsTouched](https://angular.io/api/forms/AbstractControl#markAsTouched) and [markAsPristine](https://angular.io/api/forms/AbstractControl#markaspristine). Each of these methods has a default implementation that can be overwritten for specific use-cases.

### Base implementation

In order to use this way of working, we create a component and extend the `FormAccessor` class. To make sure that the internal process is typed, we pass a data type for the form data by passing the `FormDataType`, and the kind of control we want to use internally by passing a `FormControlType`

```ts
export class TestComponent extends FormAccessor<FormDataType, FormControlType>
```

The `FormAccessor` requires a single method to be implemented by its extender, being `initForm`. This method should return an [AbstractControl](https://angular.io/api/forms/AbstractControl) to which we'll write the data to.

```ts
initForm(): FormGroup {
	return new FormGroup({
		foo: new FormControl(),
		bar: new FormControl()
	})
}
```

### Extended implementation

As mentioned earlier, this approach allows us to map the data to a specific interface that is beneficial for the form. For example, whilst the external API expects an object, internally in the form, using an array is easier. The `FormAccessor` has an extended implementation to make this possible.

We start by providing a third interface when extending, so we know which type of data we use internally.

```ts
export class TestComponent extends FormAccessor<FormDataType, FormControlType, InternalFormDataType>
```

When writing the data from the exterior form to this component, we can now map the data from the interface `FormDataType` to `InternalFormDataType` by using the optional `onWriteValueMapper` method.

```ts
onWriteValueMapper({value: {foo: true, bar: false}) {
	return [
		... value.foo ? ['foo'] : [],
		... value.bar ? ['bar'] : []
		]
}
```

In the example above, we changed an object to an string array, because our form UI input components expect us to provide this type. When the input then changes, we want to ensure that the external form now gets the correct data we initially patched to this accessor. We do this by implementing the optional `onChangeMapper` method.

```ts
onChangeMapper({value: string[]) {
	return {
		foo: value.includes('foo'),
		bar: value.includes('bar')
	}
}
```

### Disabling and enabling control

If we wish to disable or enable all controls within a FormAccessor, we can simply disable/enable the parent control that is connected to this accessor.

If we wish to disable specific controls within the a FormAccessor, we can use the `disableFields` input to pass down the keys of these controls. By default, disabling these will cause a valueChanges emit. This behavior can be overwritten by implementing the `emitValueWhenDisableFieldsUsingInput` function.

### setDisableState

By default, Angular [always](https://github.com/angular/angular/pull/47576) runs `setDisableState` on `ControlValueAccessors`. Due to the implementation of the `FormAccessor`, this might interfere with FormGroups defined in the `initForm`. 

To prevent this interference, the first `setDisableState` is ignored by default. If you wish to opt out of this behavior, you can set the `skipInitialSetDisable` to false.

### DataFormAccessor

A special case of the FormAccessor, the DataFormAccessor allows you to provide a set of data to the `data` input which will be used when creating the underlying form. Common examples for this use case include using an array of data to build up a set of controls in the form. 

Given that the DataFormAccessor is a special case of the regular FormAccessor, all earlier mentioned methods and @Inputs are still applicable. 

### Examples

#### Simple example

```ts
interface UserName {
	name: string;
	firstName: string;
}

interface UserNameForm {
    name: FormControl<string>,
    firstName: FormControl<string>
}

@Component({
	selector: 'user-name-form',
	templateUrl: './user-name.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => UserNameFormComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => UserNameFormComponent),
			multi: true
		}
	]
})
export class UserNameFormComponent extends FormAccessor<UserName, FormGroup<UserNameForm>> implements OnChanges {
	constructor(readonly cdRef: ChangeDetectorRef, private readonly formBuilder: FormBuilder) {
		super(cdRef);
	}

	initForm(): FormGroup<UserNameForm> {
		return this.formBuilder.group({
			name: [null, Validators.required],
			firstName: [null, Validators.required]
		});
	}
}
```

#### Mapper example

```ts
interface UserName {
	name: string;
	firstName: string;
}

interface UserNameForm {
    name: FormControl<string>,
    firstName: FormControl<string>
}

@Component({
	selector: 'user-name-form',
	templateUrl: './user-name.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => UserNameFormComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => UserNameFormComponent),
			multi: true
		}
	]
})
export class UserNameFormComponent extends FormAccessor<string, FormGroup<UserNameForm>, UserName> implements OnChanges {
	constructor(readonly cdRef: ChangeDetectorRef, private readonly formBuilder: FormBuilder) {
		super(cdRef);
	}

	initForm(): FormGroup<UserNameForm> {
		return this.formBuilder.group({
			name: [null, Validators.required],
			firstName: [null, Validators.required]
		});
	}

	onWriteValueMapper(value: string) {
		const [firstName, name] = value.split('-');

		return { firstName, name };
	}

	onChangeMapper(value: UserName) {
		return `${value.firstName}-${value.name}`;
	}
}
```

#### Overwrite example

```ts
interface UserName {
	name: string;
	firstName: string;
}

interface UserNameForm {
    name: FormControl<string>,
    firstName: FormControl<string>
}

@Component({
	selector: 'user-name-form',
	templateUrl: './user-name.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => UserNameFormComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => UserNameFormComponent),
			multi: true
		}
	]
})
export class UserNameFormComponent extends FormAccessor<UserName, FormGroup<UserNameForm>> implements OnChanges {
	constructor(readonly cdRef: ChangeDetectorRef, private readonly formBuilder: FormBuilder) {
		super(cdRef);
	}

	initForm(): FormGroup<UserNameForm> {
		return this.formBuilder.group({
			name: [null, Validators.required],
			firstName: [null, Validators.required]
		});
	}

	validate() {
		return form.valid ? null : { invalidUserName: true };
	}
}
```

#### DataFormAccessor
```ts
interface SurveyQuestion {
	name: string;
	id: string;
}

interface SurveyForm {
    name: FormControl<string>;
    [key:id]: FormControl<string>;
}

@Component({
	selector: 'survey-form',
	templateUrl: './survey.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SurveyFormComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => SurveyFormComponent),
			multi: true
		}
	]
})
export class SurveyFormComponent extends DataFormAccessor<SurveyQuestion[], Record<string, string>, FormGroup<SurveyForm>> implements OnChanges {
	constructor(readonly cdRef: ChangeDetectorRef, private readonly formBuilder: FormBuilder) {
		super(cdRef);
	}

	initForm(questions: SurveyQuestion[]): FormGroup<SurveyForm> {
		const form = this.formBuilder.group({
			name: [null, Validators.required]
		});

        questions.forEach(question => {
            form.addControl(question.id, this.formBuilder.control('', Validators.required))
        })

        return form;
	}
}

```

## 3. FormAccessorContainer

In order to mark all controls of several (nested) `FormAccessors` as touched or dirty or update the value and validity, we use the `FormAccessorContainer`. 

### BaseFormAccessor

In order to reach all FormAccessors and their children, we need to provide the `BaseFormAccessor` value in the providers array of the accessors.

```ts
		{
			provide: BaseFormAccessor,
			useExisting: forwardRef(() => BasicRegistrationDataFormComponent)
		}
```

### markAllAsTouched

Calling this method on a `FormAccessorContainer` will recursively mark each `FormAccessor` and their corresponding `FormAccessor` children in the template as touched.

### markAsDirty

Calling this method on a `FormAccessorContainer` will recursively mark each `FormAccessor` and their corresponding `FormAccessor` children in the template as dirty.

### UpdateValueAndValidity

Calling this method on a `FormAccessorContainer` will recursively update the value and validity for each `FormAccessor` and their corresponding `FormAccessor` children in the template.

## 3. NGXErrors

Inspired by [Tod Motto](https://github.com/toddmotto)'s NgxErrors approach, `ngx-forms` provides its own implementation of the `ngxErrors` directive which automizes the error message rendering.

Intended to be used in projects that require consistent error messages throughout the entire codebase, this implementation of `ngxErrors` allows for a record of corresponding messages to validator errors to be set on root level, which then can be rendered in either a custom component or a standard `p` element.

The error message is always rendered right below the element the `ngxErrors` directive is placed on.

### Configuration
To implement the `ngxErrors` directive, we have to import the `NgxFormsErrorsModule` on root level and provide the necessary config in the `forRoot` method.

A simple example is shown below.
``` ts
		NgxFormsErrorsModule.forRoot({
			errors: {
				required: 'This is a required field.',
				email: 'This field is not a valid email address.'
			},
			showWhen: 'touched',
		}),
```

### Basic implementation
By default, only two properties are required when setting up the `NgxFormsErrorsModule`. 

The provided `errors` record makes sure that the error key that is found in the `ValidationErrors` of a control will be matched with the message we wish to show to our users.

The `showWhen` property will determine when an error message becomes visible. You can either set it to `touched` or to `dirty`.

Once configured, all we need to do is attach the directive where we wish to render the error. We suggest attaching this directly to the input or your custom input component.

``` html
<ng-container [formGroup]="form">
    <p>Hello</p>
    <input *ngxFormsErrors="'hello'" formControlName="hello" type="text" />
</ng-container>
```

The `ngxFormsErrors` directive allows for a string value that matches with the provided control in a `FormGroup`. Alternatively, you can also pass the `AbstractControl` directly. 

By using this approach, when the control is invalid and in our case `touched`, the directive will render a `p` element with the `ngx-forms-error` class underneath the input.

### Custom component
Of course, in many projects we do not simply want to add a `p` element. Instead, we wish to use our own custom component where we can add an icon, custom styling and even transform our provided strings using a translation package.

We can do this by providing a custom component to the `component` property in the configuration.

``` ts
		NgxFormsErrorsModule.forRoot({
			errors: {
				required: 'This is a required field.',
				email: 'This field is not a valid email address.'
			},
			showWhen: 'touched',
            component: CustomErrorComponent,
		}),
```

This `CustomErrorComponent` has to extend the `NgxFormsErrorAbstractComponent`. This will provide the component with several inputs that can be used in our custom component.

The most important Input is the `errors`. This is an array of strings which will contain all error messages that we wish to show in the error component.

The second Input is the `errorKeys` input, which provides us with an array of keys that are found in the validation errors.

On top of that, the `data` input provides us with the actual `ValidationErrors` on the control.
### Multiple errors

By default, the directive only renders a single error, the first one that gets provided in the validation errors object. If we wish to show more errors, we can provide the `show` property in the configuration.

We can either provide a specific number of errors we wish to see or provide the option `all` to see all errors.

## build information
This project has been build with:
- Angular CLI : `16.1.4`
- Angular: `16.1.5`
- nodejs: `18.17.0`
- npm: `9.6.7`

For a complete list of packages and version check out the `package.json` file.

## Team

This bundle of tools has been created and is maintained by [Studio Hyperdrive](https://studiohyperdrive.be).

Contributors:
- [Denis Valcke](https://github.com/DenisValcke)
- [Iben Van de Veire](https://github.com/IbenTesara)
- [Jasper De Smet](https://github.com/jsprds)
- [Wouter Heirstrate](https://github.com/WHeirstrate)
