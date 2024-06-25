import { Directive, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { NgxTourInteraction, NgxTourStepPosition } from '../../types';

/**
 * An abstract class that defines the minimum properties needed for the step component to be rendered
 */
@Directive()
export abstract class NgxTourStepComponent<DataType = any> implements OnInit {
	/**
	 * The ngx-tour-step class of the component
	 */
	@HostBinding('class') protected rootClass: string;

	/**
	 * The position of the step
	 */
	@Input({
		required: true,
	})
	public position: NgxTourStepPosition | undefined;

	/**
	 * The title of the step
	 */
	@Input({ required: true }) public title: string;

	/**
	 * The content of the step
	 */
	@Input({ required: true }) public content: string;

	/**
	 * The index of the step
	 */
	@Input({ required: true }) public currentStep: number;

	/**
	 * The total amount of steps
	 */
	@Input({ required: true }) public amountOfSteps: number;

	/**
	 * Optional data we wish to use in a step
	 */
	@Input() public data: DataType;

	/**
	 * A custom step class we can set
	 */
	@Input() public stepClass: string;

	/**
	 * Emits the possible interactions with a step
	 */
	@Output() public handleInteraction: EventEmitter<NgxTourInteraction> =
		new EventEmitter<NgxTourInteraction>();

	public ngOnInit(): void {
		// Iben: We set the correct host class. As this step is rendered and not changed afterwards, we do not have to adjust this in the onChanges
		const positionClass = this.position ? `ngx-tour-step-position-${this.position}` : '';
		this.rootClass = `ngx-tour-step ${positionClass} ${this.stepClass || ''}`;
	}
}
