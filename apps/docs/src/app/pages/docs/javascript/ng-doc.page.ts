import { NgDocPage } from '@ng-doc/core';

const JavascriptPage: NgDocPage = {
	title: `Javascript`,
	mdFile: './index.md',
	expanded: true, // Not available on NgDocPage but needed to have the category open by default
} as NgDocPage;

export default JavascriptPage;
