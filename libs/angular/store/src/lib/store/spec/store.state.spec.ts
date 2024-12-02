import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { catchError, of, switchMap, tap } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
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

	it('should set the loading state correctly', () => {
		const spy = subscribeSpyTo(service.state.dataLoading$);

		service.setData(['hello', 'world']).subscribe();

		expect(spy.getValues()).toEqual([false, true, false]);
	});

	it('should set the error and loading state correctly', () => {
		const loadingSpy = subscribeSpyTo(service.state.dataLoading$);
		const errorSpy = subscribeSpyTo(service.state.dataError$);

		service
			.setWithError()
			.pipe(
				catchError(() => {
					return of(undefined);
				})
			)
			.subscribe();

		expect(loadingSpy.getValues()).toEqual([false, true, false]);
		expect(errorSpy.getValues()).toEqual([false, true]);
	});
});
