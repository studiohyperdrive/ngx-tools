import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxAccessibleDragAndDropAbstractService } from '@ngx/layout';

@Injectable({ providedIn: 'root' })
export class DragAndDropService extends NgxAccessibleDragAndDropAbstractService {
	get currentLanguage(): string | Observable<string> {
		return 'nl';
	}
}
