export interface TranslationLoaderActionEntity {
	id: string;
	state: keyof typeof TranslationLoaderActionStateEnum;
}

enum TranslationLoaderActionStateEnum {
	LOADING = 'LOADING',
	LOADED = 'LOADED',
}
