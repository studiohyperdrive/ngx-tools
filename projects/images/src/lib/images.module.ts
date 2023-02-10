import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProgressiveImageLoadingComponent } from './progressive-image-loading/progressive-image-loading.component';

@NgModule({
	declarations: [ProgressiveImageLoadingComponent],
	imports: [CommonModule],
	exports: [ProgressiveImageLoadingComponent],
})
export class ImagesModule {}
