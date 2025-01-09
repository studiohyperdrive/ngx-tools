import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { NgxNavigationConfiguration, NgxNavigationItem, NgxNavigationItems } from '../../types';

@Component({
	selector: 'ngx-navigation',
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.ngx-navigation-horizontal]': 'isHorizontal()',
		'[class.ngx-navigation-vertical]': '!isHorizontal()',
		'[class.ngx-navigation-top]': 'isTop()',
		'[class.ngx-navigation-bottom]': '!isTop()',
		'[class.ngx-navigation-left]': 'isLeft()',
		'[class.ngx-navigation-right]': '!isLeft()',
	},
})
export class NgxNavigationComponent {
	private readonly isHorizontal: WritableSignal<boolean> = signal(false);
	private readonly isLeft: WritableSignal<boolean> = signal(false);
	private readonly isTop: WritableSignal<boolean> = signal( false );

	public readonly openable: WritableSignal<boolean> = signal( false );

	@Input({ required: true }) public items: NgxNavigationItems = [];

	@Input({ required: true }) public set configuration(configuration: NgxNavigationConfiguration) {
		this.isHorizontal.set(configuration.display === 'horizontal');

		if (configuration.display === 'horizontal') {
			this.isTop.set( configuration.position === 'top' );
			this.openable.set( false );
		} else {
			this.isLeft.set(configuration.position === 'left');
			this.openable.set( configuration.openable );
		}
	}

	@Input() public open: boolean = false;

	@Output() public opened: EventEmitter<boolean> = new EventEmitter<boolean>();
}
