// snippet#component "Typescript"
import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserNameFormComponent } from './user-name-form/user-name.form.component';

@Component({
	imports: [CommonModule, ReactiveFormsModule, UserNameFormComponent, JsonPipe],
	selector: 'mapper-demo',
	templateUrl: 'mapper.demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapperDemoComponent {
	public readonly form = new FormGroup({
		username: new FormControl(''),
	});
}
// snippet#component

// snippet-from-file="./mapper.demo.component.html" "HTML"
