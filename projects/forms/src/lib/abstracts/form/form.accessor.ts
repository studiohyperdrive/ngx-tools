import {
	ChangeDetectorRef,
	Directive,
	Input,
	OnDestroy,
	OnInit,
	Output,
	QueryList,
	ViewChildren,
} from '@angular/core';
import {
	ValidationErrors,
	ControlValueAccessor,
	AbstractControl,
	FormControl,
} from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { BaseFormAccessor } from '../base-form/base-form.accessor';
import { DataFormAccessor } from '../data-form/data-form.accessor';
import { FormAccessorControlsEntity, FormStateOptionsEntity } from '../../interfaces';
import {
	handleFormAccessorControlDisabling,
	handleFormAccessorMarkAsTouched,
	handleFormAccessorMarkAsDirty,
	hasErrors,
	handleFormAccessorUpdateValueAndValidity,
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

	/**
	 * Whether the first setDisable has run
	 */
	private initialSetDisableHasRun: boolean = false;

	// On destroy flow handler
	protected readonly destroy$ = new Subject();

	// Subject to check whether the form is initialized
	protected readonly initializedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);

	/**
	 * Whether we want to skip the first setDisable (https://github.com/angular/angular/pull/47576).
	 * By default, this is true
	 */
	private skipInitialSetDisable: boolean = true;

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
	 * Whether or not we want to emit a value when we use the disableFields, by default this will emit
	 *
	 * @param  keys - Keys we're about to disable
	 */
	protected emitValueWhenDisableFieldsUsingInput?(
		keys: FormAccessorControlsEntity<FormAccessorFormType>[]
	): boolean;

	constructor(readonly cdRef: ChangeDetectorRef) {}

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
	 * Update the value and validity of the provided form
	 */
	public updateAllValueAndValidity(options: FormStateOptionsEntity): void {
		handleFormAccessorUpdateValueAndValidity(
			this.form,
			this.accessors?.toArray() || [],
			options
		);
		this.cdRef.detectChanges();
	}

	/**
	 * Disables/enables the inner form based on the passed value
	 *
	 * @param isDisabled - Whether or not the form should be disabled
	 */
	public setDisabledState(isDisabled: boolean) {
		// Iben: Skip the initial setDisabled, as this messes up our form approach.
		// https://github.com/angular/angular/pull/47576
		if (this.skipInitialSetDisable && !this.initialSetDisableHasRun) {
			this.initialSetDisableHasRun = true;

			return;
		}

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
