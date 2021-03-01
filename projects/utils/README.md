# Images

first of all:

```npm install @studiohyperdrive/ngx-utils```

## 1. window service

Service to be able to get `window.width` when no window is present. Usefull with serverside rendering for example. 

```
import { WindowService } from '@studiohyperdrive/ngx-utils';

export class YourComponent {

	public windowWidth$: Observable<number>;

	constructor(
		private windowService: WindowService
	) {
		this.windowWidth$ = this.windowService.width$;
	}

}
```

## build information

It is build with:
- Angular CLI : `11.2.1` 
- Angular: `11.2.1`
- nodejs: `12.19.0`
- npm: `6.14.8`

For a complete list of packages and version check out the `package.json` file.
## Team

This project has been created by:
- Axelle Vanden Eynde: axelle.vandeneynde@studiohyperdrive.be


It is currently maintained by:
- Axelle Vanden Eynde: axelle.vandeneynde@studiohyperdrive.be



