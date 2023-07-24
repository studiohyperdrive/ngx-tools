import {
	ChangeDetectorRef,
	Directive,
	inject,
	Injector,
	Input,
	OnDestroy,
	Output,
	QueryList,
	ViewChildren,
} from '@angular/core';
import {
	AbstractControl,
	ControlContainer,
	ControlValueAccessor,
	FormControl,
	ValidationErrors,
} from '@angular/forms';
import { isEqual } from 'lodash';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { BaseFormAccessor } from '../base-form/base-form.accessor';
import { FormAccessor } from '../form/form.accessor';
import { FormStateOptionsEntity, FormAccessorControlsEntity } from '../../interfaces';
import {
	handleFormAccessorControlDisabling,
	customUpdateValueAndValidity,
	handleFormAccessorMarkAsTouched,
	handleFormAccessorMarkAsDirty,
	hasErrors,
} from '../../utils';

@Directive()
export abstract class DataFormAccessor<
	ConstructionDataType = unknown,
	DataType = unknown,
	FormAccessorFormType extends AbstractControl = FormControl,
	FormValueType = DataType
> implements OnDestroy, ControlValueAccessor
{
	/**
	 * A list of all DataFormAccessors en FormAccessors of this component
	 */
	@ViewChildren(BaseFormAccessor) accessors: QueryList<DataFormAccessor | FormAccessor>;

	// Iben: Keep a reference to the current data so we don't make a new form if the data itself hasn't changed
	private currentData: ConstructionDataType;

	// Iben: A handler to know when the update value and validity has been set
	private readonly hasSetUpdateValueAndValiditySubject$ = new Subject();

	// On destroy flow handler
	protected readonly destroy$ = new Subject();

	// Subject to check whether the form is initialized
	protected readonly initializedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);

	/**
	 * Stream to know whether the form has been initialized
	 */
	@Output()
	public readonly initialized$: Observable<boolean> = this.initializedSubject$.asObservable();

	/**
	 * Inner form to write to
	 */
	form: FormAccessorFormType;

	/**
	 * Method to set up the inner form
	 */
	abstract initForm(data: ConstructionDataType): FormAccessorFormType;

	/**
	 * Optional method to map the inner form value to an outer form specific format
	 *
	 * @param value - Value from the form
	 */
	public onChangeMapper?(value: Partial<FormValueType>): DataType;

	/**
	 * Optional method to map the outer form value to an inner form specific format
	 *
	 * @param value - Value from the form
	 */
	public onWriteValueMapper?(value: DataType): FormValueType;

	/**
	 * An optional handler to call right before the value and validity is updated
	 *
	 * @param options - The options passed to the updateValueAndValidity function
	 */
	public onUpdateValueAndValidity?(options: FormStateOptionsEntity): void;

	/**
	 * An optional handler to call right before the value and validity is updated
	 *
	 * @param options - The options passed to the updateValueAndValidity function

	/**
	 * Whether or not we want to emit a value when we use the disableFields, by default this will emit
	 *
	 * @param  keys - Keys we're about to disable
	 */
	protected emitValueWhenDisableFieldsUsingInput?(
		keys: FormAccessorControlsEntity<FormAccessorFormType>[]
	): boolean;

	/**
	 * Keys of the fields we wish to disable.
	 * By default this will emit a valueChanges, this can be overwritten by the emitValueWhenDisableFieldsUsingInput in the Accessor
	 *
	 * @memberof FormAccessor
	 */
	@Input() set disableFields(keys: FormAccessorControlsEntity<FormAccessorFormType>[]) {
		// Iben: Early exit in case the keys are not provided
		if (!keys) {
			return;
		}

		// Iben: Setup a subject to track whether we're still disabling the fields
		const disabling = new Subject();

		// Iben: Add the keys to a set for more performant lookup and convert those to a string to not have Typescript issues later down the line
		const controlKeys = new Set(keys);

		// Iben: Check if we need to dispatch the disable or enable event
		const emitEvent = this.emitValueWhenDisableFieldsUsingInput
			? this.emitValueWhenDisableFieldsUsingInput(keys)
			: true;

		// Iben: Listen to the initialized state of the form
		this.initialized$
			.pipe(
				filter(Boolean),
				tap(() => {
					// TODO: Iben: Remove this setTimeout once we're in a Signal based component
					setTimeout(() => {
						// Iben: Handle the disabling of the fields
						handleFormAccessorControlDisabling(this.form, controlKeys, emitEvent);
					});

					// Iben: Set the disabling subject so that we can complete this subscription
					disabling.next(undefined);
					disabling.complete();
				}),
				takeUntil(disabling)
			)
			.subscribe();
	}

	@Input({ required: true }) public set data(data: ConstructionDataType) {
		// Iben: If we already have current data and the current data matches the new data, we don't make a new form
		if (this.currentData && isEqual(this.currentData, data)) {
			this.currentData = data;
			return;
		}

		this.initializedSubject$.next(false);
		this.currentData = data;

		// Iben: Emit to the destroy so the previous subscription is cancelled
		this.destroy$.next(undefined);

		// Set the inner form
		this.form = this.initForm(data);

		// Denis: set the initialized property
		this.setInitializedWithData(data);

		// Iben: Check if the form is valid depending on the provided value
		this.validate();
		this.cdRef.detectChanges();

		// Iben: Subscribe to the value changes
		this.form.valueChanges
			.pipe(
				tap<FormValueType>((value) => {
					// In case there's a mapper we map the value, else we send the form value
					this.onChange(this.onChangeMapper ? this.onChangeMapper(value) : value);
				}),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	constructor(readonly cdRef: ChangeDetectorRef) {
		// Iben: Get the injector so that we can have the parent control
		const injector = inject(Injector);

		try {
			// Iben: Grab the controlContainer
			const container = injector.get(ControlContainer);

			this.initialized$
				.pipe(
					filter(Boolean),
					tap(() => {
						// Iben: If the container exists and we have an actual control assigned to this container, we can overwrite the updateValueAndValidity of this control
						if (container && container.control) {
							// Iben: Grab the control and keep a reference to the original update value and validity of the control
							const control = container.control;
							const updateValueAndValidity =
								control.updateValueAndValidity.bind(control);

							// Iben: We'll overwrite the updateValueAndValidity to also update the value and validity of the form itself;
							control.updateValueAndValidity = (
								options: FormStateOptionsEntity = {}
							) => {
								// Iben: Call the handler before the updateValueAndValidity has been called
								if (this.onUpdateValueAndValidity) {
									this.onUpdateValueAndValidity(options);
								}

								// Iben: Call the custom updateValueAndValidty
								customUpdateValueAndValidity(
									this.form,
									updateValueAndValidity,
									options
								);
							};
						}

						// Iben: Close the subscription
						this.hasSetUpdateValueAndValiditySubject$.next(undefined);
						this.hasSetUpdateValueAndValiditySubject$.complete();
					}),
					takeUntil(this.hasSetUpdateValueAndValiditySubject$)
				)
				.subscribe();
		} catch {
			console.warn(
				'You are using a FormAccessor with a single control instead of a control inside a form group. The updateValueAndValidity function could not be overwritten.'
			);
		}
	}

	private onTouch: Function = () => {}; // tslint:disable-line:no-empty
	private onChange: Function = (_: any) => {}; // tslint:disable-line:no-empty

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}
	public registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	/**
	 * Writes value to the inner form
	 *
	 * @param value - Value to patch in the inner form
	 */
	public writeValue(value: DataType | undefined | null): void {
		this.form.reset(undefined, { emitEvent: false });

		if (value !== undefined && value !== null) {
			this.form.patchValue(this.onWriteValueMapper ? this.onWriteValueMapper(value) : value, {
				emitEvent: false,
			});
		}

		this.validate();
		this.cdRef.detectChanges();
	}

	/**
	 * Mark all controls of the form as touched
	 */
	public markAsTouched(options: FormStateOptionsEntity = {}): void {
		handleFormAccessorMarkAsTouched(this.form, this.accessors?.toArray() || [], options);
		this.cdRef.detectChanges();
	}

	/**
	 * Mark all controls of the form as dirty
	 */
	public markAsDirty(options: FormStateOptionsEntity): void {
		handleFormAccessorMarkAsDirty(this.form, this.accessors?.toArray() || [], options);
		this.cdRef.detectChanges();
	}

	/**
	 * Disables/enables the inner form based on the passed value
	 *
	 * @param isDisabled - Whether or not the form should be disabled
	 */
	public setDisabledState(isDisabled: boolean) {
		if (isDisabled) {
			this.form.disable({ emitEvent: false });
		} else {
			this.form.enable({ emitEvent: false });
		}

		this.cdRef.detectChanges();
	}

	/**
	 * Validates the inner form
	 */
	public validate(): ValidationErrors | null {
		// Iben: If the form itself is invalid, we return the invalidForm: true right away
		if (this.form.invalid) {
			return { invalidForm: true };
		}

		// Iben: In case the form is invalid, we check if the child controls are possibly invalid
		return hasErrors(this.form) ? { invalidForm: true } : null;
	}

	public ngOnDestroy(): void {
		this.destroy$.next(undefined);
		this.destroy$.complete();
	}

	/**
	 * setInitialized
	 *
	 * This method sets the initialized property to true when the form is initialized.
	 * This functionality has been moved to a separate method to enable
	 * overwriting this method to fit certain use-cases.
	 *
	 * @param {ConstructionDateType} data
	 * @returns void
	 * @private
	 */
	protected setInitializedWithData(data: ConstructionDataType): void {
		this.initializedSubject$.next(Array.isArray(data) ? data && data.length > 0 : !!data);
	}
}
