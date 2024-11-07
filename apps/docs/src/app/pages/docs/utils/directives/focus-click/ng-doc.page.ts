import { NgDocPage } from '@ng-doc/core';
import DirectivesCategory from '../../../../../categories/utils/sub-categories/directives/ng-doc.category';
import { ClickFocusDemoComponent } from './demos';

const FocusClickDirectivePage: NgDocPage = {
	title: `FocusClickDirective`,
	mdFile: './index.md',
	category: DirectivesCategory,
	demos: { ClickFocusDemoComponent },
};

export default FocusClickDirectivePage;
