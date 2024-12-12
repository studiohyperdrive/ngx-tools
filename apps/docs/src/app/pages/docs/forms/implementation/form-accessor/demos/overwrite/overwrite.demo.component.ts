import {CommonModule, JsonPipe} from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserNameFormComponent } from './user-name-form/user-name.form.component';

// snippet#component "Typescript"
@Component({
	imports: [CommonModule, ReactiveFormsModule, UserNameFormComponent, JsonPipe],
	selector: 'overwrite-demo',
	templateUrl: 'overwrite.demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverwriteDemoComponent {
	public readonly form = new FormGroup({
		username: new FormControl(''),
	});
}
// snippet#component

// snippet-from-file="./overwrite.demo.component.html" "HTML"
