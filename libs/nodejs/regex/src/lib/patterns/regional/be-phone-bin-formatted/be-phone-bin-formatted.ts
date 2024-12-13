const landlinePattern = /^((\+|00\s?)32\s?|0)(\d\s?\d{3}|\d{2}\s?\d{2})(\s?\d{2}){2}$/;
const mobilePattern = /^((\+|00\s?)32\s?|0)4(\d{2}\s?)(\d{2}\s?){3}$/;

export const bePhoneBinFormatted = {
	landlinePattern,
	mobilePattern,
};
