export abstract class NgxI18nAbstractService<Language = string> {
	public abstract get currentLanguage(): Language;
}
