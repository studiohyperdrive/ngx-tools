import { Category, CookieValue, GuiOptions, Translation } from 'vanilla-cookieconsent';

export type NgxCookieCategories = Record<string, Category>;

export interface NgxCookieLanguageConfiguration {
	default: string;
	autoDetect?: 'document' | 'browser';
	rtl?: string | string[];
	translations: {
		[locale: string]: Translation | string | (() => Translation) | (() => Promise<Translation>);
	};
}

export interface NgxCookie {
	name?: string;
	domain?: string;
	path?: string;
	expiresAfterDays?: number | ((acceptType: string) => number);
	sameSite?: 'Lax' | 'Strict' | 'None';
	useLocalStorage?: boolean;
}

export interface NgxCookieConfiguration {
	root?: string;
	mode?: 'opt-in' | 'opt-out';
	autoShow?: boolean;
	revision?: number;
	manageScriptTags?: boolean;
	autoClearCookies?: boolean;
	hideFromBots?: boolean;
	lazyHtmlGeneration?: boolean;
	cookie?: NgxCookie;
	guiOptions?: GuiOptions;
}

export interface NgxCookieEvent {
	cookie: CookieValue;
}

export interface NgxCookieChangedEvent extends NgxCookieEvent {
	changedCategories: string[];
	changedServices: {
		[key: string]: string[];
	};
}
