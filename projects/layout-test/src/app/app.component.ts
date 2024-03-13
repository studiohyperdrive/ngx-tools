import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxConfigurableLayoutComponent, NgxConfigurableLayoutItemComponent } from 'layout';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	standalone: true,
	imports: [CommonModule, NgxConfigurableLayoutComponent, NgxConfigurableLayoutItemComponent],
})
export class AppComponent {}
