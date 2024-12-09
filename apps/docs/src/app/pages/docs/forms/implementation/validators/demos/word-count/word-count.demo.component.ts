import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxValidators } from '@ngx/forms';

@Component({
	imports: [CommonModule, ReactiveFormsModule],
	selector: 'word-count-demo',
	templateUrl: 'word-count.demo.component.html',
})
export class WordCountValidatorDemoComponent {
	form = new FormGroup({
		text: new FormControl('', [NgxValidators.wordCountValidator({ min: 1, max: 5 })]),
	});
}
