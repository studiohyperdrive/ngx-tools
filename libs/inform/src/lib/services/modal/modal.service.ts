import { Inject, Injectable, Optional, Type } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import {
	combineLatest,
	filter,
	map,
	NEVER,
	Observable,
	startWith,
	Subject,
	takeUntil,
	tap,
} from 'rxjs';

import { NgxModalConfiguration, NgxModalOptions } from '../../types';
import { NgxModalConfigurationToken } from '../../tokens';
import { NgxModalAbstractComponent } from '../../abstracts';

/**
 * A wrapper service to Angular CDK Dialog that provides a WCAG/ARIA compliant implementation of modals
 *
 * @export
 * @class NgxModalService
 */
@Injectable({ providedIn: 'root' })
export class NgxModalService {
	/**
	 * A subject to hold the close event
	 */
	private modalClosedSubject: Subject<void>;

	constructor(
		@Optional()
		@Inject(NgxModalConfigurationToken)
		private readonly configuration: NgxModalConfiguration,
		private readonly dialogService: Dialog
	) {}

	/**
	 * Opens a modal based on the provided options
	 *
	 * @param {NgxModalOptions<ActionType>} options - The modal options
	 */
	public open<ActionType extends string = string>(
		options: NgxModalOptions<ActionType>
	): Observable<ActionType> {
		// Iben: If there still is an active subject running, the modal is still active and we early exit
		if (!this.modalClosedSubject?.closed) {
			console.warn(
				'NgxInform: An active modal is currently displayed, close the active modal before opening a new one'
			);

			return NEVER;
		}

		// Iben: Create a new subject
		this.modalClosedSubject = new Subject();

		// Iben: Fetch the type of component we wish to show
		const configuration = this.configuration?.modals?.[options.type];
		const component: Type<NgxModalAbstractComponent<ActionType>> =
			options.component ||
			(this.configuration?.modals?.[options.type].component as Type<
				NgxModalAbstractComponent<ActionType>
			>);

		// Iben: Check if all the correct parameters are set and return NEVER when they're not correctly set
		if (!this.runARIAChecks<ActionType>(options, component)) {
			return NEVER;
		}

		// Iben: Render the modal
		const modal = this.createModalComponent<ActionType>(options, component);

		// Iben: Return the modal action
		return combineLatest([
			// Iben: Set the start value to undefined so both actions at least emit once
			modal.action.pipe(startWith(undefined)),
			modal.close.pipe(
				// Iben: Map so we can keep the emit value void, but can work with the filter later down the line
				map(() => 'NgxModalClose'),
				// Iben: Set the start value to undefined so both actions at least emit once
				startWith(undefined)
			),
		]).pipe(
			// Iben: Only emit if one of the two actions actually has an emit
			filter(([action, closed]: [ActionType, 'NgxModalClose']) => {
				return Boolean(action) || Boolean(closed);
			}),
			map(([action, closed]: [ActionType, 'NgxModalClose']) => {
				return closed || action;
			}),
			tap((action: ActionType | 'NgxModalClose') => {
				// Iben: If the autoClose is specifically set to false, we early exit unless we're running in a close event
				if (
					action !== 'NgxModalClose' &&
					((options.autoClose !== undefined && options.autoClose === false) ||
						(configuration?.autoClose !== undefined &&
							configuration.autoClose === false))
				) {
					return;
				}

				// Iben: Close the modal
				this.close(options.onClose);
			}),
			// Iben: Map the action back to the ActionType
			map((action: ActionType | 'NgxModalClose') => {
				return action === 'NgxModalClose' ? undefined : (action as ActionType);
			}),
			takeUntil(this.modalClosedSubject)
		);
	}

	/**
	 * Closes the currently active modal
	 *
	 * * @param onClose - An optional onClose function
	 */
	public close(onClose?: () => void): void {
		// Iben: Close the modal
		this.dialogService.closeAll();

		// Iben: Mark the modal as closed
		this.modalClosedSubject.next();
		this.modalClosedSubject.complete();

		// Iben: Run an optional onClose function
		if (onClose) {
			onClose();
		}
	}

	/**
	 * Checks if all the necessary preconditions are met
	 *
	 * @param options - The options of the modal
	 * @param  component - The component we wish to render
	 */
	private runARIAChecks<ActionType extends string = string>(
		options: NgxModalOptions<ActionType>,
		component: Type<NgxModalAbstractComponent<ActionType>>
	): boolean {
		// Iben: If no component was found, we return NEVER and throw an error
		if (!component) {
			console.error(
				'NgxInform: No component was provided or found in the configuration to render.'
			);

			return false;
		}

		// Iben: If no description was provided when required, we return NEVER and throw an error
		if (!this.hasRequiredDescription(options)) {
			console.error(
				'NgxInform: The role of the modal was set to "alertdialog" but no "describedById" was provided.'
			);

			return false;
		}

		return true;
	}

	/**
	 * Creates the modal component
	 *
	 * @param options - The options of the modal
	 * @param  component - The component we wish to render
	 */
	private createModalComponent<ActionType extends string = string>(
		options: NgxModalOptions<ActionType>,
		component: Type<NgxModalAbstractComponent<ActionType>>
	): NgxModalAbstractComponent<ActionType> {
		const configuration = this.configuration?.modals?.[options.type];

		// Iben: Create the modal and render it
		const dialogRef = this.dialogService.open(component, {
			role: configuration?.role || options.role,
			ariaLabel: options.label,
			ariaLabelledBy: options.labelledById,
			ariaDescribedBy: options.describedById,
			disableClose: true,
			restoreFocus: this.getValue(undefined, options.restoreFocus, true),
			autoFocus: this.getValue(undefined, options.autoFocus, true),
			viewContainerRef: options.viewContainerRef,
			direction: configuration?.direction || options.direction,
			hasBackdrop: this.getValue(configuration?.hasBackdrop, options.hasBackdrop, true),
			panelClass: this.getValue(configuration?.panelClass, options.panelClass, []),
			closeOnNavigation: this.getValue(
				configuration?.closeOnNavigation,
				options.closeOnNavigation,
				true
			),
			closeOnDestroy: true,
			closeOnOverlayDetachments: true,
		});
		const modal = dialogRef.componentInstance;

		// Iben: Set the data of the modal
		modal.data = this.getValue(configuration?.data, options.data, undefined);

		return modal;
	}

	/**
	 * Checks if the description is provided when the role requires it
	 *
	 * @param options - The options of the modal
	 */
	private hasRequiredDescription<ActionType extends string = string>(
		options: NgxModalOptions<ActionType>
	): boolean {
		// Iben: If the options has provided a default type, we check based on the configuration role
		if (options.type) {
			const configuration = this.configuration?.modals[options.type];

			return !(configuration.role === 'alertdialog' && !options.describedById);
		}

		//  Iben: Check based on the options role
		return !(options.role === 'alertdialog' && !options.describedById);
	}

	/**
	 * Returns a value based on whether one of the overwrites is defined
	 *
	 * @private
	 * @param configurationValue - The overwrite on configuration level
	 * @param optionsValue - The overwrite on options level
	 * @param defaultValue - The default value if no overwrite was defined
	 */
	private getValue(configurationValue: any, optionsValue: any, defaultValue: any): any {
		if (configurationValue === undefined && optionsValue === undefined) {
			return defaultValue;
		}

		if (optionsValue !== undefined) {
			return optionsValue;
		}

		return configurationValue;
	}
}
