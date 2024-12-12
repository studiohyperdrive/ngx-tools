import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SurveyFormComponent } from './survey-form/survey.component';
import { SurveyQuestion } from './survey-form/survey-question.interface';

// snippet#component "Typescript"
@Component({
	imports: [CommonModule, ReactiveFormsModule, SurveyFormComponent],
	selector: 'data-form-accessor',
	templateUrl: 'data-form-accessor.demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataFormAccessorDemoComponent {
	public readonly form = new FormGroup({
		survey: new FormControl(''),
	});

	public readonly survey: SurveyQuestion[] = [
		{ id: 'question-1', name: 'Who' },
		{ id: 'question-2', name: 'Where' },
		{ id: 'question-3', name: 'When' },
	];
}
// snippet#component

// snippet-from-file="./data-form-accessor.demo.component.html" "HTML"
