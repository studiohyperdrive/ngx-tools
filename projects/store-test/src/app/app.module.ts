import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from '../store/user.store';
import { UserService } from '../services/users.service';
import { UserEffects } from '../store/user.effects';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		StoreModule.forRoot({ users: reducers }),
		EffectsModule.forRoot(UserEffects),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
		}),
	],
	providers: [UserService],
	bootstrap: [AppComponent],
})
export class AppModule {}
