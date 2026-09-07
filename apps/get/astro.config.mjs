// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://get.enodia.sh',
	output: 'static',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'ru'],
		routing: {
			// root ("/") stays English, unprefixed - matches /unix and /windows
			// (Pages Functions, outside Astro's i18n routing entirely) also
			// living unprefixed at the root, so the one-liners never need a
			// locale segment.
			prefixDefaultLocale: false,
		},
	},
});
