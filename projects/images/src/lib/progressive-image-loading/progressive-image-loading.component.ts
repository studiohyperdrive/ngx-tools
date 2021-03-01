import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'img-progressive-image-loading',
	templateUrl: './progressive-image-loading.component.html',
	styleUrls: ['./progressive-image-loading.component.css'],
})
export class ProgressiveImageLoadingComponent implements OnInit {
	@Input() public lowResImg: string;
	@Input() public highResImg: string;
	@Input() public className: string;
	@Input() public backgroundColor: string;

	public highResLoaded: boolean = false;
	public lowResLoaded: boolean = false;

	public getBackgroundColor(): string {
		if (this.backgroundColor === '' || this.backgroundColor === undefined) {
			return '#eaeaea';
		}

		return this.backgroundColor;
	}

	public ngOnInit(): void {
		const imageToLoadHighRes = new Image();
		imageToLoadHighRes.src = this.highResImg;
		imageToLoadHighRes.onload = () => {
			this.highResLoaded = true;
		};

		const imageToLoadLowRes = new Image();
		imageToLoadLowRes.src = this.lowResImg;
		imageToLoadLowRes.onload = () => {
			this.lowResLoaded = true;
		};
	}
}
