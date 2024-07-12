import { Component, OnInit } from '@angular/core';
import { NgxMediaQueryService } from '@ngx/utils';

@Component({
	selector: 'mediaquery',
	template: '<p>Scale this page to see the media query changes in the console.</p>',
	standalone: true,
})
export class MediaQueryComponent implements OnInit {
	constructor(private readonly mediaService: NgxMediaQueryService) {
		// Uncomment below to view a duplicate query error
		// this.mediaService.registerMediaQueries(['Yeet', '(max-width: 500px)']);
		//
		// Uncomment below to view a duplicate id warning
		// this.mediaService.registerMediaQueries(['small', 'randomString']);
	}

	public ngOnInit() {
		this.mediaService.getMatchingQuery$('small').subscribe((small) => {
			console.log('Small: ', small);
		});

		this.mediaService.getMatchingQuery$('medium').subscribe((medium) => {
			console.log('Medium: ', medium);
		});

		this.mediaService.getMatchingQuery$('large').subscribe((large) => {
			console.log('Large: ', large);
		});
	}
}
