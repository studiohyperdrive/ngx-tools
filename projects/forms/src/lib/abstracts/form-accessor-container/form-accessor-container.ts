import { ViewChildren, QueryList, Directive, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { BaseFormAccessor } from '../base-form/base-form.accessor';
import { DataFormAccessor } from '../data-form/data-form.accessor';
import { FormAccessor } from '../form/form.accessor';
import { FormStateOptionsEntity } from '../../interfaces';
import { handleFormAccessorMarkAsDirty, handleFormAccessorMarkAsTouched } from '../../utils';

@Directive()
export class FormAccessorContainer implements OnDestroy {
	/**
	 * A list of all DataFormAccessors en FormAccessors of this component
	 */
	@ViewChildren(BaseFormAccessor) accessors: QueryList<DataFormAccessor | FormAccessor>;

	/**
	 * Destroyed state of the component
	 */
	protected readonly destroyed$ = new Subject();

	/**
	 * Marks the form and all the inputs of every subsequent form-accessors as dirty
	 *
	 * @param  form - The form used in the component
	 * @param options - Options passed to the form state changer
	 */
	public markAsDirty(form: AbstractControl, options: FormStateOptionsEntity = {}): void {
		handleFormAccessorMarkAsDirty(form, this.accessors?.toArray() || [], options);
	}

	/**
	 * Marks the form and all the inputs of every subsequent form-accessors as touched
	 *
	 * @param  form - The form used in the component
	 * @param options - Options passed to the form state changer
	 */
	public markAllAsTouched(form: AbstractControl, options: FormStateOptionsEntity = {}): void {
		handleFormAccessorMarkAsTouched(form, this.accessors?.toArray() || [], options);
	}

	/**
	 * Handle the destroy state of the component
	 */
	public ngOnDestroy(): void {
		this.destroyed$.next(undefined);
		this.destroyed$.complete();
	}
}
