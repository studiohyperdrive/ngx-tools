import { ApplicationConfig } from '@angular/core';

import { DragAndDropService } from './drag-and-drop.service';
import { provideNgxDragAndDropService } from '@ngx/layout';

export const layoutComponentsConfig: ApplicationConfig = {
	providers: [provideNgxDragAndDropService(DragAndDropService)],
};
