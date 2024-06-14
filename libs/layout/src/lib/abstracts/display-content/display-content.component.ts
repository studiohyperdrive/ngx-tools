import { Directive, Input } from '@angular/core';

/**
 * An abstract class to use when implementing custom fallbacks for the NgxDisplayContentDirective
 */
@Directive()
export abstract class NgxDisplayContentComponent {
	/**
	 * An optional data input to provide data to the fallback components. This property is typed as any.
	 */
	@Input() data: any;
}
