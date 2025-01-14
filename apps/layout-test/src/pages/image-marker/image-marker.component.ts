import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxImageMarkerComponent, NgxImageMarkerState } from '@ngx/layout';

@Component({
	selector: 'ngx-image-marker-page',
	templateUrl: './image-marker.component.html',
	imports: [NgxImageMarkerComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxImageMarkerPageComponent {
	public currentState: NgxImageMarkerState;
	public newState: NgxImageMarkerState;
	public allowEdit: boolean = true;

	public save() {
		this.currentState = this.newState;
		this.allowEdit = false;
	}

	public edit() {
		this.allowEdit = true;
	}

	public updateState(event: NgxImageMarkerState) {
		this.newState = event;
	}

	public markerClicked() {
		window.alert('Clicked!');
	}
}
