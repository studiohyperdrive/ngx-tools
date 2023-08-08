import { NgModule } from '@angular/core';

import { Pipes } from './pipes';
import { Directives } from './directives';

@NgModule({
	declarations: [Pipes, Directives],
	exports: [Pipes, Directives],
})
export class UtilsModule {}
