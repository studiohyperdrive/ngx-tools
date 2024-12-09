import { NgDocRootComponent, NgDocNavbarComponent, NgDocSidebarComponent } from '@ng-doc/app';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	imports: [RouterModule, NgDocRootComponent, NgDocNavbarComponent, NgDocSidebarComponent],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {}
