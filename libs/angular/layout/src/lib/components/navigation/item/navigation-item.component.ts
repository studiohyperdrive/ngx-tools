import { ChangeDetectionStrategy, Component, ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { NgxNavigationItem } from '@ngx/layout';

@Directive( {
	selector: 'ngx-navigation-item',
} )
export class NgxNavigationItemComponent {
	@ContentChild( 'shorthandTmpl' ) public readonly shorthandTemplate: TemplateRef<NgxNavigationItem>
	@ContentChild( 'contentTmpl' ) public readonly contentTemplate: TemplateRef<NgxNavigationItem>

	@Input() public key: string;
}
