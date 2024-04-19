import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxFormsErrorConfigurationOptions } from './interfaces';
import { NgxFormsErrorsConfigurationToken } from './tokens';
import { NgxFormsErrorsDirective } from './directives';

@NgModule({
	declarations: [NgxFormsErrorsDirective],
	exports: [NgxFormsErrorsDirective],
})
export class NgxFormsErrorsModule {
	static forRoot(
		config: NgxFormsErrorConfigurationOptions
	): ModuleWithProviders<NgxFormsErrorsModule> {
		return {
			ngModule: NgxFormsErrorsModule,
			providers: [
				{
					provide: NgxFormsErrorsConfigurationToken,
					useValue: config,
				},
			],
		};
	}
}
