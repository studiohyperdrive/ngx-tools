import { NgModule } from '@angular/core';

import { FeaturePageComponent } from './pages/feature.component';
import { FeatureRoutingModule } from './feature.routing.module';
import { FeatureTranslationLoader } from './translation.loader';
import { NgxI18nModule } from 'i18n';

@NgModule({
	imports: [NgxI18nModule.forChild(FeatureTranslationLoader), FeatureRoutingModule],
	declarations: [FeaturePageComponent],
})
export class FeatureModule {}
