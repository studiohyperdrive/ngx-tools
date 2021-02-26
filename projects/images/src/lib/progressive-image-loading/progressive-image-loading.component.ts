import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'lib-progressive-image-loading',
	templateUrl: './progressive-image-loading.component.html',
	styleUrls: ['./progressive-image-loading.component.css'],
})
export class ProgressiveImageLoadingComponent implements OnInit {
	@Input() lowResImg: string;
	@Input() highResImg: string;
	@Input() className: string;
	@Input() backgroundColor: string;
	highResLoaded = false;
	lowResLoaded = false;

	constructor() { }

	getBackgroundColor(): string {
		if (this.backgroundColor === '' || this.backgroundColor === undefined) {
			return '#eaeaea';
		}

		return this.backgroundColor;
	}

	ngOnInit(): void {
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
