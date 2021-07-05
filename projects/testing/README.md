# Angular Tools: Testing (`@studiohyperdrive/ngx-testing`)

Install the package first:
```shell
npm install @studiohyperdrive/ngx-testing
```

## 1. Provide mock
The provide mock function is an extension of `jasmine.createSpyObj` with automatic discovery of functions and with the possibility to add properties.

```typescript
// Example using provideMock function
import { TestBed } from '@angular/core/testing';
import { provideMock } from '@studiohyperdrive/ngx-tesing';
import { of } from 'rxjs';

import { SomeService } from '../services/some.service';
import { SomeComponent } from '../components/some.component';

describe('SomeComponent', () => {
	let component: SomeComponent;
	let someServiceSpy: jasmine.SpyObj<SomeService>;
	let fixture: ComponentFixture<SomeComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideMock(SomeService, {
				someObservable$: of('some value')
			})],
		});

		someServiceSpy = TestBed.inject(SomeService) as jasmine.SpyObj<SomeService>;
		fixture = TestBed.createComponent(SomeComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});
});
// Example without using provideMock function
import { TestBed } from '@angular/core/testing';
import { provideMock } from '@studiohyperdrive/ngx-tesing';
import { of } from 'rxjs';

import { SomeService } from '../services/some.service';
import { SomeComponent } from '../components/some.component';

describe('SomeComponent', () => {
	let component: SomeComponent;
	let someServiceSpy = {
        someObservable$: of('some value')
        ...jasmine.createSpyObj('SomeService', ['someMethod'])
    };
	let fixture: ComponentFixture<SomeComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [{
                provide: SomeService, useValue: someServiceSpy
            }],
		});

		someServiceSpy = TestBed.inject(SomeService) as jasmine.SpyObj<SomeService>;
		fixture = TestBed.createComponent(SomeComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});
});
```

## build information
This project has been build with:
- Angular CLI : `11.2.1`
- Angular: `11.2.1`
- nodejs: `12.19.0`
- npm: `6.14.8`

For a complete list of packages and version check out the `package.json` file.
