import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
	build: {
		ssr: true, // Force building for nodejs instead of the browser
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'express-status',
			formats: ['es', 'cjs'],
			fileName: (format) => `express-status.${format}.js`,
		},
		rollupOptions: {
			external: ['some-external-dependency'],
			output: {
				globals: {
					'some-external-dependency': 'SomeExternalDependency',
				},
			},
		},
	},
	plugins: [dts()],
});
