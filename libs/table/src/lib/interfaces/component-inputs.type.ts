import { NgxTableSortDirection } from '../enums';

export interface NgxTableDefaultComponentInputsConfiguration {
	loading?: any;
	error?: any;
	sort?: any;
	checkbox?: any;
	radio?: any;
}

export class NgxTableInputs<
	DataType extends NgxTableDefaultComponentInputsConfiguration = NgxTableDefaultComponentInputsConfiguration
> {
	loading?: DataType['loading'];
	error?: DataType['error'];
	sort?: DataType['sort'] & { direction: NgxTableSortDirection };
	checkbox?: DataType['checkbox'];
	radio?: DataType['radio'];
}
