import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProgressiveImageLoadingComponent } from './progressive-image-loading.component';

describe('ProgressiveImageLoadingComponent', () => {
	let component: ProgressiveImageLoadingComponent;
	let fixture: ComponentFixture<ProgressiveImageLoadingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProgressiveImageLoadingComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProgressiveImageLoadingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have a background color', () => {
		expect(fixture.nativeElement.querySelector('div').style.backgroundColor).toBe(
			'rgb(234, 234, 234)'
		);
		component.backgroundColor = '#fff';
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector('div').style.backgroundColor).toBe(
			'rgb(255, 255, 255)'
		);
	});

	it('should render loaded images', () => {
		component.lowResImg = 'https://dummyimage.com/20';
		component.highResImg = 'https://dummyimage.com/150';
		fixture.detectChanges();

		const lowImg = new Image();
		lowImg.src = component.lowResImg;
		lowImg.onload = () => {
			expect(component.lowResLoaded).toBe(true);
			expect(fixture.debugElement.query(By.css('.progressive-img-low-res'))).not.toBeNull();
		};

		const highImg = new Image();
		highImg.src = component.highResImg;
		highImg.onload = () => {
			expect(component.highResLoaded).toBe(true);
			expect(fixture.debugElement.query(By.css('.progressive-img-high-res'))).not.toBeNull();
		};
	});
});
