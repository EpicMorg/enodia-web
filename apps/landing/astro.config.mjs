// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://enodia.sh',
	output: 'static',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'ru'],
		routing: {
			// root ("/") stays English, unprefixed — this is the one-liner
			// landing page people share bare links to, same reasoning as
			// get.enodia.sh's /unix and /windows staying unprefixed.
			prefixDefaultLocale: false,
		},
	},
});
