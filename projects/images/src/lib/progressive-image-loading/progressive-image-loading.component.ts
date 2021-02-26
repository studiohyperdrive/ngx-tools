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

	highResLoaded = false;
	lowResLoaded = false;
	constructor() { }

	ngOnInit(): void {
		const imageToLoadHighRes = new Image();
		imageToLoadHighRes.src = this.highResImg;
		imageToLoadHighRes.onload = () => {
			this.highResLoaded = true;
		}

		const imageToLoadLowRes = new Image();
		imageToLoadLowRes.src = this.lowResImg;
		imageToLoadLowRes.onload = () => {
			this.lowResLoaded = true;
		}
	}
}
