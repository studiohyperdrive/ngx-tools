export type NgxConfigurableLayoutItemSizeOption = 'fit-content' | 'fill' | 'equal';

export type NgxConfigurableLayoutType = 'static' | 'editable';

export interface NgxConfigurableLayoutItemEntity {
	key: string;
	isActive: boolean;
	disabled?: boolean;
}

export type NgxConfigurableLayoutGrid = NgxConfigurableLayoutItemEntity[][];
