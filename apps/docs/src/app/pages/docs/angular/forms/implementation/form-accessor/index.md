---
keyword: FormAccessorPage
---

A `FormAccessor` can represent a control, group or array form, and has its own validation, disabled and touched state.

This approach allows us to easily compartmentalize larger forms into smaller components, which then hold their own logic and allow them to be re-used throughout the entire application with ease. An added benefit to this approach is the ability to specifically map the data to an interface that best matches the form UI, whilst preserving the initial interface of the data throughout the rest of the application.

`FormAccessor` is an abstract layer on top of the `CustomControlValueAccessor`, and provides a default implementation for the most commonly implemented methods that are needed for a [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor). These methods are: [writeValue](https://angular.io/api/forms/ControlValueAccessor#writeValue), [onChange](https://angular.io/api/forms/ControlValueAccessor#registerOnChange), [validate](https://angular.io/api/forms/NG_VALIDATORS), [setDisabledState](https://angular.io/api/forms/ControlValueAccessor#setdisabledstate), [markAsTouched](https://angular.io/api/forms/AbstractControl#markAsTouched) and [markAsPristine](https://angular.io/api/forms/AbstractControl#markaspristine). Each of these methods has a default implementation that can be overwritten for specific use-cases.

## Base implementation

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

## Extended implementation

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

## Disabling and enabling control

If we wish to disable or enable all controls within a FormAccessor, we can simply disable/enable the parent control that is connected to this accessor.

If we wish to disable specific controls within the a FormAccessor, we can use the `disableFields` input to pass down the keys of these controls. By default, disabling these will cause a valueChanges emit. This behavior can be overwritten by implementing the `emitValueWhenDisableFieldsUsingInput` function.

## setDisableState

By default, Angular [always](https://github.com/angular/angular/pull/47576) runs `setDisableState` on `ControlValueAccessors`. Due to the implementation of the `FormAccessor`, this might interfere with FormGroups defined in the `initForm`.

To prevent this interference, the first `setDisableState` is ignored by default. If you wish to opt out of this behavior, you can set the `skipInitialSetDisable` to false.

## DataFormAccessor

A special case of the FormAccessor, the DataFormAccessor allows you to provide a set of data to the `data` input which will be used when creating the underlying form. Common examples for this use case include using an array of data to build up a set of controls in the form.

Given that the DataFormAccessor is a special case of the regular FormAccessor, all earlier mentioned methods and @Inputs are still applicable.

## createAccessorProviders

In order to make a component accessible through an `AbstractControl`, the `NG_VALUE_ACCESSOR` needs to be provided to the component. In the same vain, in order to make the validation work, the `NG_VALIDATORS` needs to be provided.

To simplify this process, `ngx-forms` provides a helpful util function called `createAccessorProviders`. This will automatically generate all the necessary providers for the `ngx-forms` workflow.

In the examples section you will find out how this is implemented.

## Examples

### Simple example

{{ NgDocActions.demo("SimpleDemoComponent") }}

### Mapper example

{{ NgDocActions.demo("MapperDemoComponent") }}

### Overwrite example

{{ NgDocActions.demo("OverwriteDemoComponent") }}

### DataFormAccessor

{{ NgDocActions.demo("DataFormAccessorDemoComponent") }}
