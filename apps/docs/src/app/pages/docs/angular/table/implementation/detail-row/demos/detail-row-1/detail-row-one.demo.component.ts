import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxTable } from '@ngx/table';

@Component({
	imports: [CommonModule, NgxTable, ReactiveFormsModule],
	selector: 'detail-row-one-demo',
	templateUrl: './detail-row-one.demo.component.html',
})
export class DetailRowOneDemoComponent {}
