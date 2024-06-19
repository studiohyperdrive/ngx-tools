import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { NgxTourInteraction } from '../../types';

/**
 * An abstract class that defines the minimum properties needed for the step component to be rendered
 */
@Directive()
export abstract class NgxTourStepComponent<DataType = any> {
	/**
	 * The title of the step
	 */
	@Input({ required: true }) title: string;

	/**
	 * The content of the step
	 */
	@Input({ required: true }) content: string;

	/**
	 * The index of the step
	 */
	@Input({ required: true }) currentStep: number;

	/**
	 * The total amount of steps
	 */
	@Input({ required: true }) amountOfSteps: number;

	/**
	 * Optional data we wish to use in a step
	 */
	@Input() data: DataType;

	/**
	 * Emits the possible interactions with a step
	 */
	@Output() handleInteraction: EventEmitter<NgxTourInteraction> =
		new EventEmitter<NgxTourInteraction>();
}
