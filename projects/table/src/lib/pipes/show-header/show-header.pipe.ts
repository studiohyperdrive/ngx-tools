import { Pipe, PipeTransform } from '@angular/core';
import { NgxTableShowHeaderRequirements } from '../../interfaces';
import { HideHeaderRowOption } from '../../token';

/**
 * This pipe returns whether we want to show the header
 *
 * @export
 * @class NgxTableShowHeaderPipe
 * @implements {PipeTransform}
 */
@Pipe({
	name: 'ngxTableShowHeader',
	standalone: true,
})
export class NgxTableShowHeaderPipe implements PipeTransform {
	public transform(
		value: NgxTableShowHeaderRequirements,
		hideHeaderRowWhen: HideHeaderRowOption
	): boolean {
		// Iben: If we never want to hide the header row, we return true
		if (hideHeaderRowWhen === 'never') {
			return true;
		}

		// Iben: Check if the value is not an object and return an empty string so the frontend doesn't break and warn the user
		if (typeof value !== 'object' || !value) {
			console.warn(
				'NgxTableShowHeaderPipe encountered a value that was not an object and showed the header.'
			);

			return true;
		}

		// Iben: Add to set for better performance
		const options = new Set(hideHeaderRowWhen);

		// Iben: Check which cases need the header to be hidden, and then flip it
		return !(
			(options.has('when-empty') && value.isEmpty) ||
			(options.has('when-loading') && value.isLoading)
		);
	}
}
