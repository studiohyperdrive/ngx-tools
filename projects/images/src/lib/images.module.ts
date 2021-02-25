import { NgModule } from '@angular/core';
import { ImagesComponent } from './images.component';
import { ProgressiveImageLoadingComponent } from './progressive-image-loading/progressive-image-loading.component';



@NgModule({
  declarations: [ImagesComponent, ProgressiveImageLoadingComponent],
  imports: [
  ],
  exports: [ImagesComponent]
})
export class ImagesModule { }
