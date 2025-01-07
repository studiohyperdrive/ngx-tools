// snippet-from-file="../app.config.ts" "Application Config"
// snippet-from-file="./components/special-tour.component.ts" "special-tour.component.ts"
// snippet-from-file="./components/tour.component.ts" "tour.component.ts"
// snippet-from-file="./pages/main/main.component.ts" "main.component.ts"
// snippet-from-file="./pages/main/main.component.html" "main.component.html"
// snippet-from-file="./pages/main/main.component.scss" "main.component.scss"
// snippet-from-file="./pages/secondary/secondary.component.ts" "secondary.component.ts"
// snippet-from-file="./pages/secondary/secondary.component.html" "secondary.component.html"

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	standalone: true,
	template: ``,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartDemoComponent {}
