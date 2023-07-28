import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Cells } from './cell';
import { NgxTableGetPipe, NgxTableHasObserversPipe, NgxTableSortIconPipe, Pipes } from './pipes';
import { NgxTableComponent } from './table/ngx-table.component';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, CdkTableModule],
	declarations: [
		NgxTableComponent,
		Cells,
		Pipes,
		NgxTableSortIconPipe,
		NgxTableHasObserversPipe,
		NgxTableGetPipe,
	],
	providers: [NgxTableSortIconPipe, NgxTableHasObserversPipe, NgxTableGetPipe],
	exports: [NgxTableComponent, Cells, Pipes],
})
export class NgxTableModule {}
