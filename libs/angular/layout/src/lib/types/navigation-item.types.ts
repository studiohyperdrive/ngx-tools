import { QueryParamsHandling } from '@angular/router';
import { ObservableBoolean } from '@js/rxjs';
import { Observable } from 'rxjs';

interface NgxNavigationBaseItem {
	id: string;
	label: string;
	disabled?: boolean | Observable<boolean>;
	visible?: boolean | ObservableBoolean;
}

interface NgxNavigationLinkItem extends NgxNavigationBaseItem {
	routerLink: string | string[];
	queryParams?: Record<string, string>;
	queryParamHandling?: QueryParamsHandling;
}

interface NgxNavigationParentItem extends NgxNavigationBaseItem {
	children: NgxNavigationLinkItem[];
}

export type NgxNavigationItem =
	| NgxNavigationBaseItem
	| NgxNavigationLinkItem
	| NgxNavigationParentItem;

export type NgxNavigationItems = NgxNavigationItem[];
