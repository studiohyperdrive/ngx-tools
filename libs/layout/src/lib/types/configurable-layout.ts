export type NgxConfigurableLayoutItemSizeOption = 'fit-content' | 'fill' | 'equal';

export type NgxConfigurableLayoutType = 'static' | 'editable';

export interface NgxConfigurableLayoutItemEntity {
	key: string;
	isActive: boolean;
	disabled?: boolean;
}

export type NgxConfigurableLayoutGrid = NgxConfigurableLayoutItemEntity[][];

export interface NgxConfigurableLayoutItemDropEvent {
	currentGrid: NgxConfigurableLayoutGrid;
	eventType: 'sorting' | 'moving';
	element: NgxConfigurableLayoutItemEntity;
	showInactive: boolean;
	targetRowIndex: number;
}
