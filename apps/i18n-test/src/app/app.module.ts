import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxI18nModule } from '@ngx/i18n';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        NgxI18nModule.forRoot({
            defaultLanguage: 'nl',
            availableLanguages: ['nl', 'fr'],
            defaultAssetPaths: ['./assets/shared/'],
        })], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
