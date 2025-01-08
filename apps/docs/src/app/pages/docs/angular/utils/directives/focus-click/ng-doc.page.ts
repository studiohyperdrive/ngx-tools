import { NgDocPage } from '@ng-doc/core';
import { DirectivesCategory } from '../../../../../../categories/angular';
import { ClickFocusDemoComponent } from './demos';

const FocusClickDirectivePage: NgDocPage = {
	title: `FocusClickDirective`,
	mdFile: './index.md',
	category: DirectivesCategory,
	demos: { ClickFocusDemoComponent },
};

export default FocusClickDirectivePage;
