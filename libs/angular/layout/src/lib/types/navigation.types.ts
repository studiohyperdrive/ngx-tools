type NgxDirection = 'left' | 'right' | 'bottom' | 'top';

type NgxHorizontalOverflowHandling<FlyoutType = 'bottom' | 'top'> =
	| 'multi-line'
	| { label: string; minimum: number; flyout: FlyoutType };

interface NgxNavigationBaseConfiguration {
	position: NgxDirection;
	display: 'horizontal' | 'vertical';
	flyout: 'none' | NgxDirection;
	label: string;
}

interface NgxNavigationTopHorizontalConfiguration extends NgxNavigationBaseConfiguration {
	position: 'top';
	display: 'horizontal';
	flyout: 'none' | 'bottom';
	overflow: NgxHorizontalOverflowHandling<'bottom'>;
}

interface NgxNavigationBottomHorizontalConfiguration extends NgxNavigationBaseConfiguration {
	position: 'bottom';
	display: 'horizontal';
	flyout: 'none' | 'top';
	overflow: NgxHorizontalOverflowHandling<'top'>;
}

interface NgxNavigationRightVerticalConfiguration extends NgxNavigationBaseConfiguration {
	position: 'right';
	display: 'vertical';
	flyout: 'none' | 'left';
	openable: boolean;
}

interface NgxNavigationLeftVerticalConfiguration extends NgxNavigationBaseConfiguration {
	position: 'left';
	display: 'vertical';
	flyout: 'none' | 'right';
	openable: boolean;
}

export type NgxNavigationConfiguration =
	| NgxNavigationTopHorizontalConfiguration
	| NgxNavigationBottomHorizontalConfiguration
	| NgxNavigationRightVerticalConfiguration
	| NgxNavigationLeftVerticalConfiguration;
