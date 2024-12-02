import { Component, OnInit } from '@angular/core';
import { NgxConfigurableLayoutComponent, NgxConfigurableLayoutItemComponent } from '@ngx/layout';

@Component({
	standalone: true,
	imports: [NgxConfigurableLayoutComponent, NgxConfigurableLayoutItemComponent],
	selector: 'layout-configurable-demo-name',
	templateUrl: 'configurable.demo.component.html',
})
export class LayoutConfigurableDemoComponent {}
