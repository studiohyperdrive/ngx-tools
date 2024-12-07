import { Component } from '@angular/core';
import { NgxConfigurableLayoutComponent, NgxConfigurableLayoutItemComponent } from '@ngx/layout';

@Component({
    imports: [NgxConfigurableLayoutComponent, NgxConfigurableLayoutItemComponent],
    selector: 'layout-configurable-demo-name',
    templateUrl: 'configurable.demo.component.html'
})
export class LayoutConfigurableDemoComponent {}
