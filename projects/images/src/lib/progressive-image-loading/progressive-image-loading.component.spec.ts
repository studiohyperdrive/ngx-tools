import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressiveImageLoadingComponent } from './progressive-image-loading.component';

describe('ProgressiveImageLoadingComponent', () => {
	let component: ProgressiveImageLoadingComponent;
	let fixture: ComponentFixture<ProgressiveImageLoadingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProgressiveImageLoadingComponent],
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProgressiveImageLoadingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
