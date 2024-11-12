import { NgDocPage } from '@ng-doc/core';
import FormsImplementationCategory from 'apps/docs/src/app/categories/forms/sub-categories/implementation/ng-doc.category';
import {
	AllOrNothingRequiredValidatorDemoComponent,
	AtLeastOneRequiredValidatorDemoComponent,
	ChronologicalDatesValidatorDemoComponent,
	CompareValidatorDemoComponent,
	DateRangeValidatorDemoComponent,
	DecimalsAfterCommaValidatorDemoComponent,
	DependedRequiredValidatorDemoComponent,
	ExtendedEmailValidatorDemoComponent,
	HasNoFutureDateValidatorDemoComponent,
	WordCountValidatorDemoComponent,
} from './demos';

const ValidatorsPage: NgDocPage = {
	title: `Validators`,
	mdFile: './index.md',
	category: FormsImplementationCategory,
	order: 0,
	demos: {
		ExtendedEmailValidatorDemoComponent,
		AtLeastOneRequiredValidatorDemoComponent,
		CompareValidatorDemoComponent,
		AllOrNothingRequiredValidatorDemoComponent,
		DependedRequiredValidatorDemoComponent,
		DecimalsAfterCommaValidatorDemoComponent,
		ChronologicalDatesValidatorDemoComponent,
		DateRangeValidatorDemoComponent,
		HasNoFutureDateValidatorDemoComponent,
		WordCountValidatorDemoComponent,
	},
};

export default ValidatorsPage;
