// Iben: As seen in https://learn.microsoft.com/en-us/javascript/api/@azure/keyvault-certificates/requireatleastone?view=azure-node-latest
export type RequireAtLeastOne<DataType> = {
	[Key in keyof DataType]-?: Required<Pick<DataType, Key>> &
		Partial<Pick<DataType, Exclude<keyof DataType, Key>>>;
}[keyof DataType];
