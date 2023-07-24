# shared/ui/forms FormAccessor

> An abstract layer for control value accessor with provided default implementations

## Concept

A `FormAccessor` can represent a control, group or array form, and has its own validation, disabled and touched state.

This approach allows us to easily compartmentalize larger forms into smaller components, which then hold their own logic and allow them to be re-used throughout the entire application with ease. An added benefit to this approach is the ability to specifically map the data to an interface that best matches the form UI, whilst preserving the initial interface of the data throughout the rest of the application.

`FormAccessor` is an abstract layer on top of the `CustomControlValueAccessor`, and provides a default implementation for the most commonly implemented methods that are needed for a [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor). These methods are: [writeValue](https://angular.io/api/forms/ControlValueAccessor#writeValue), [onChange](https://angular.io/api/forms/ControlValueAccessor#registerOnChange), [validate](https://angular.io/api/forms/NG_VALIDATORS), [setDisabledState](https://angular.io/api/forms/ControlValueAccessor#setdisabledstate), [markAsTouched](https://angular.io/api/forms/AbstractControl#markAsTouched) and [markAsPristine](https://angular.io/api/forms/AbstractControl#markaspristine). Each of these methods has a default implementation that can be overwritten for specific use-cases.

## Base implementation

In order to use this way of working, we create a component and extend the `FormAccessor` class. To make sure that the internal process is typed, we pass a type to the accessor.

```ts
export class TestComponent extends FormAccessor<FormDataInterface>
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

## Extended implementation

As mentioned earlier, this approach allows us to map the data to a specific interface that is beneficial for the form. For example, whilst the external API expects an object, internally in the form, using an array is easier. The `FormAccessor` has an extended implementation to make this possible.

We start by providing a second interface when extending, so we know which type of data we use internally.

```ts
export class TestComponent extends FormAccessor<FormDataInterface, InternalFormDataInterface>
```

When writing the data from the exterior form to this component, we can now map the data from the interface `FormDataInterface` to `InternalFormDataInterface` by using the optional `onWriteValueMapper` method.

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

## Disabling and enabling control

If we wish to disable or enable all controls within a (Data)FormAccessor, we can simply disable/enable the parent control that is connected to this accessor.

If we wish to disable specific controls within the a (Data)FormAccessor, we can use the `disableFields` input to pass down the keys of these controls. By default, disabling these will cause a valueChanges emit. This behavior can be overwritten by implementing the `emitValueWhenDisableFieldsUsingInput` function.

## UpdateValueAndValidity

As Angular does not by default support a recursive `updateValueAndValidity` and therefore cannot update the value and validity of the inner controls of the accessor, we have a custom implementation that will recursively update all the controls.

In case we wish to handle any logic _before_ this, we can implement the `onUpdateValueAndValidity` function.

## Examples

### Simple example

```ts
interface UserName {
	name: string;
	firstName: string;
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
export class UserNameFormComponent extends FormAccessor<UserName> implements OnChanges {
	constructor(injector: Injector, readonly cdRef: ChangeDetectorRef, private readonly formBuilder: FormBuilder) {
		super(injector, cdRef);
	}

	initForm(): FormGroup {
		return this.formBuilder.group({
			name: [null, Validators.required],
			firstName: [null, Validators.required]
		});
	}
}
```

### Mapper example

```ts
interface UserName {
	name: string;
	firstName: string;
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
export class UserNameFormComponent extends FormAccessor<string, UserName> implements OnChanges {
	constructor(injector: Injector, readonly cdRef: ChangeDetectorRef, private readonly formBuilder: FormBuilder) {
		super(injector, cdRef);
	}

	initForm(): FormGroup {
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

### Overwrite example

```ts
interface UserName {
	name: string;
	firstName: string;
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
export class UserNameFormComponent extends FormAccessor<UserName> implements OnChanges {
	constructor(injector: Injector, readonly cdRef: ChangeDetectorRef, private readonly formBuilder: FormBuilder) {
		super(injector, cdRef);
	}

	initForm(): FormGroup {
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
