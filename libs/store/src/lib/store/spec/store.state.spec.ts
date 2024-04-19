import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { switchMap, tap } from 'rxjs';
import { StoreStateService, reducers } from './store-state.service';

describe('Store state', () => {
	let service: StoreStateService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [StoreModule.forRoot({}), StoreModule.forFeature('state', reducers)],
			providers: [StoreStateService],
		});

		service = TestBed.inject(StoreStateService);
	});

	it('should set the state object', () => {
		expect(service.state).toBeDefined();
	});

	it('should be able to listen to the changes using the state property', (done) => {
		service
			.setData(['hello', 'world'])
			.pipe(
				switchMap(() => service.state.data$),
				tap((value) => {
					expect(value).toEqual(['hello', 'world']);
				})
			)
			.subscribe(() => {
				done();
			});
	});
});
