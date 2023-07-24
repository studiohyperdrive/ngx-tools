import {
	ChangeDetectorRef,
	Directive,
	Injector,
	Input,
	OnDestroy,
	OnInit,
	Output,
	QueryList,
	ViewChildren,
	inject,
} from '@angular/core';
import {
	ValidationErrors,
	ControlValueAccessor,
	AbstractControl,
	ControlContainer,
	FormControl,
} from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { BaseFormAccessor } from '../base-form/base-form.accessor';
import { DataFormAccessor } from '../data-form/data-form.accessor';
import { FormAccessorControlsEntity, FormStateOptionsEntity } from '../../interfaces';
import {
	handleFormAccessorControlDisabling,
	customUpdateValueAndValidity,
	handleFormAccessorMarkAsTouched,
	handleFormAccessorMarkAsDirty,
	hasErrors,
} from '../../utils';

@Directive()
export abstract class FormAccessor<
	DataType = unknown,
	FormAccessorFormType extends AbstractControl = FormControl,
	FormValueType = DataType
> implements ControlValueAccessor, OnInit, OnDestroy
{
	/**
	 * A list of all DataFormAccessors en FormAccessors of this component
	 */
	@ViewChildren(BaseFormAccessor) accessors: QueryList<DataFormAccessor | FormAccessor>;

	// On destroy flow handler
	protected readonly destroy$ = new Subject();

	// Iben: A handler to know when the update value and validity has been set
	private readonly hasSetUpdateValueAndValiditySubject$ = new Subject();

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
	public form: FormAccessorFormType;

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

	/**
	 * Method to set up the inner form
	 */
	abstract initForm(): FormAccessorFormType;

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
	 * Whether or not we want to emit a value when we use the disableFields, by default this will emit
	 *
	 * @param  keys - Keys we're about to disable
	 */
	protected emitValueWhenDisableFieldsUsingInput?(
		keys: FormAccessorControlsEntity<FormAccessorFormType>[]
	): boolean;

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

	public ngOnInit(): void {
		// Set the inner form
		this.form = this.initForm();

		this.initializedSubject$.next(true);

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

	public ngOnDestroy(): void {
		this.destroy$.next(undefined);
		this.destroy$.complete();
	}
}
