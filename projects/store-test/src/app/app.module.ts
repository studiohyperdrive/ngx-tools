import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from '../store/user.store';
import { UserService } from '../services/users.service';
import { UserEffects } from '../store/user.effects';
import { CoursesService } from '../services/courses.service';
import { reducers as coursesReducers } from '../store/courses.store';
import { AppComponent } from './app.component';
@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		StoreModule.forRoot({ users: reducers, courses: coursesReducers }),
		EffectsModule.forRoot(UserEffects),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			connectInZone: true,
		}),
	],
	providers: [UserService, CoursesService],
	bootstrap: [AppComponent],
})
export class AppModule {}
