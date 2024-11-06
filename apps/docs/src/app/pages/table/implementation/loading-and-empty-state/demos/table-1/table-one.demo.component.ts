import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxTable } from '@ngx/table';

@Component({
	standalone: true,
	imports: [CommonModule, NgxTable, ReactiveFormsModule],
	selector: 'table-one-demo',
	templateUrl: './table-one.demo.component.html',
})
export class TableOneDemoComponent {}
