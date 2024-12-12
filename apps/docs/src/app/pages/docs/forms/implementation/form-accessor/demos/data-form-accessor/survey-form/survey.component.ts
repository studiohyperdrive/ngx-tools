import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { createAccessorProviders, DataFormAccessor } from '@ngx/forms';
import {JsonPipe} from "@angular/common";
import {SurveyQuestion} from "./survey-question.interface";

interface SurveyForm {
	name: FormControl<string>;
	[key: string]: FormControl<string>;
}

@Component({
	selector: 'survey-form',
	templateUrl: './survey.component.html',
	providers: [createAccessorProviders(SurveyFormComponent)],
	imports: [ReactiveFormsModule],
})
export class SurveyFormComponent extends DataFormAccessor<
	SurveyQuestion[],
	Record<string, string>,
	FormGroup<SurveyForm>
> {
	public questions: SurveyQuestion[] = [];

	initForm(data: SurveyQuestion[]): FormGroup<SurveyForm> {
		const form = new FormGroup<SurveyForm>({
			name: new FormControl('', Validators.required),
		});

		data.forEach((question) => {
			form.addControl(question.id, new FormControl('', Validators.required));
		});

		this.questions = data;

		return form;
	}
}
