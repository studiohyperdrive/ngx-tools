// As provided by Microsoft Azure:
// https://learn.microsoft.com/en-us/javascript/api/@azure/keyvault-certificates/requireatleastone?view=azure-node-latest
export type RequireAtLeastOne<InterfaceType> = {
	[Key in keyof InterfaceType]-?: Required<Pick<InterfaceType, Key>> &
		Partial<Pick<InterfaceType, Exclude<keyof InterfaceType, Key>>>;
}[keyof InterfaceType];
