// snippet-from-file="../app.config.ts" "Application Config"

// snippet#component "Typescript"
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxDisplayContentDirective } from '@ngx/layout';

@Component({
	selector: 'layout-display-content-demo',
	templateUrl: './display-content.demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ReactiveFormsModule, NgxDisplayContentDirective],
})
export class DisplayContentDemoComponent {
	public form: FormGroup = new FormGroup({
		loading: new FormControl<boolean>(false),
		offline: new FormControl<boolean>(false),
		error: new FormControl<boolean>(false),
	});
}
// snippet#component
// snippet-from-file="./display-content.demo.component.html" "HTML"
