import { DomSanitizer } from '@angular/platform-browser';
import { WithRouterLinkPipe } from './with-router-links.pipe';
import { WithRouterLinksConfig } from './with-router-links.types';

describe('WithRouterLinkPipe', () => {
	const config: WithRouterLinksConfig = {
		elSelector: 'my-link',
		linkAttr: 'to',
		dataLinkIdAttr: 'data-link-id',
	};
	const sanitizer: DomSanitizer = {
		bypassSecurityTrustHtml: jasmine.createSpy().and.callFake((value) => value),
	} as any as DomSanitizer;
	const pipe: WithRouterLinkPipe = new WithRouterLinkPipe(config, sanitizer);

	it('should convert a single link with a an array link & global config', () => {
		const result = pipe.transform(
			'This is a text with a <a data-link-id="someUniqueId">link</a>.',
			[
				{
					select: 'someUniqueId',
					linkTo: ['path', 'in', 'app'],
				},
			]
		);

		expect(result).toBe(
			`<head></head><body>This is a text with a <my-link to="/path/in/app">link</my-link>.</body>`
		);
	});

	it('should convert a single link with a an string link & global config', () => {
		const result = pipe.transform(
			'This is a text with a <a data-link-id="someUniqueId">link</a>.',
			[
				{
					select: 'someUniqueId',
					linkTo: '/path/in/app',
				},
			]
		);

		expect(result).toBe(
			`<head></head><body>This is a text with a <my-link to="/path/in/app">link</my-link>.</body>`
		);
	});

	it('should convert a single link with case-specific config', () => {
		const result = pipe.transform(
			'This is a text with a <a data-link-id="someUniqueId">link</a>.',
			[
				{
					select: 'someUniqueId',
					linkTo: '/path/in/app',
					elSelector: 'other-el',
					toAttr: 'other-prop',
				},
			]
		);

		expect(result).toBe(
			`<head></head><body>This is a text with a <other-el other-prop="/path/in/app">link</other-el>.</body>`
		);
	});

	it('should conver multiple links', () => {
		const result = pipe.transform(
			'This is a text with multiple links: <a data-link-id="someUniqueId1">link 1</a>, <a data-link-id="someUniqueId2">link 2</a>, <a data-link-id="someUniqueId3">link 3</a>.',
			[
				{
					select: 'someUniqueId1',
					linkTo: ['path', 'in', 'app'],
				},
				{
					select: 'someUniqueId2',
					linkTo: '/path/in/app',
				},
				{
					select: 'someUniqueId3',
					linkTo: ['path', 'in', 'app'],
					elSelector: 'other-el',
					toAttr: 'other-prop',
				},
			]
		);

		expect(result).toBe(
			`<head></head><body>This is a text with multiple links: <my-link to="/path/in/app">link 1</my-link>, <my-link to="/path/in/app">link 2</my-link>, <other-el other-prop="/path/in/app">link 3</other-el>.</body>`
		);
	});
});
