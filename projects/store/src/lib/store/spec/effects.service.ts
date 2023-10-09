import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { DataType } from './store-assets';
import { mockChannel, mockPrivateChannel, mockVideos } from './store.spec';

@Injectable()
export class EffectsService {
	public fetchChannel(isPublic: boolean): Observable<DataType> {
		if (isPublic) {
			return of(mockChannel);
		}

		return of(mockPrivateChannel);
	}

	public fetchVideos(id: string): Observable<DataType[]> {
		return of(mockVideos);
	}
}
