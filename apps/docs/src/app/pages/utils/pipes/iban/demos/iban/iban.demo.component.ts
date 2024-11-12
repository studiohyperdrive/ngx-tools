import { Component } from '@angular/core';
import { IbanPipe } from '@ngx/utils';

@Component({
	standalone: true,
	imports: [IbanPipe],
	selector: 'iban-demo',
	templateUrl: 'iban.demo.component.html',
})
export class IbanPipeDemoComponent {
	public ibanNumber = 'BE62510007547061';
}
