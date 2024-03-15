/// <reference types="vitest" />
import * as path from 'path';
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	cacheDir: '../../node_modules/.vite/regex-common',

	plugins: [
		dts({
			entryRoot: 'src',
			tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
			skipDiagnostics: true,
		}),

		nxViteTsPaths(),

		viteStaticCopy({
			targets: [
				{
					src: path.resolve(__dirname) + '/README.md',
					dest: '.',
				},
				{
					src: path.resolve(__dirname, './docs') + '/[!.]*',
					dest: 'docs',
				},
			],
		}),
	],

	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [ nxViteTsPaths() ],
	// },

	// Configuration for building your library.
	// See: https://vitejs.dev/guide/build.html#library-mode
	build: {
		lib: {
			// Could also be a dictionary or array of multiple entry points.
			entry: 'src/index.ts',
			name: 'regex-common',
			fileName: 'index',
			// Change this to the formats you want to support.
			// Don't forget to update your package.json as well.
			formats: ['es', 'cjs', 'umd'],
		},
		rollupOptions: {
			// External packages that should not be bundled into your library.
			external: [],
		},
	},

	test: {
		globals: true,
		cache: {
			dir: '../../node_modules/.vitest',
		},
		environment: 'node',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	},
});
