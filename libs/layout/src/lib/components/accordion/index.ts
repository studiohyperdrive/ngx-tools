import { NgxAccordionComponent } from './accordion.component';
import { NgxAccordionItemComponent } from './item/accordion-item.component';

export * from './accordion.component';
export * from './item/accordion-item.component';
export const NgxAccordion = [NgxAccordionComponent, NgxAccordionItemComponent] as const;
