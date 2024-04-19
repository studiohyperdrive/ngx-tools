export abstract class AbstractI18nService<Language = string> {
	public abstract get currentLanguage(): Language;
}
