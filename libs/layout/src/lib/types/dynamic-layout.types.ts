import { TemplateRef } from '@angular/core';

export type NgxDynamicLayoutSourcePosition = 'top' | 'bottom' | 'left' | 'right';

export type NgxDynamicLayoutModeOption = 'read-only' | 'reorder' | 'builder';
export interface NgxDynamicLayoutTemplates {
	source: TemplateRef<any>;
	content: TemplateRef<any>;
}

interface NgxDynamicLayoutItemEntity {
	fixed?: boolean;
	isContainer: boolean;
}
interface NgxDynamicLayoutDataItem<DataType = any> extends NgxDynamicLayoutItemEntity {
	isContainer: false;
	key: string;
	data?: DataType[];
}

interface NgxDynamicLayoutContainerItem extends NgxDynamicLayoutItemEntity {
	id: string;
	isContainer: true;
	children: NgxDynamicLayoutData[];
}

export type NgxDynamicLayoutData = NgxDynamicLayoutDataItem | NgxDynamicLayoutContainerItem;
