import { TemplateRef, Type } from '@angular/core';
import { NgxDisplayContentComponent } from '../abstracts';

export type NgxDisplayContentStatus = 'loading' | 'error' | 'offline';

export type NgxDisplayContentAriaLive = 'polite' | 'assertive' | 'off';

type NgxDisplayContentRecord<DataType> = Partial<Record<NgxDisplayContentStatus, DataType>>;

export type NgxDisplayContentConditions = NgxDisplayContentRecord<boolean>;

export type NgxDisplayContentComponentConfiguration = NgxDisplayContentRecord<
	Type<NgxDisplayContentComponent>
>;

export type NgxDisplayContentOverrideConfiguration = NgxDisplayContentRecord<{
	template?: TemplateRef<any>;
	data?: any;
}>;

export interface NgxDisplayContentConfiguration {
	components: NgxDisplayContentComponentConfiguration;
	hideWhenNoTemplateProvided?: boolean;
	listenToOnlineStatus?: boolean;
}
