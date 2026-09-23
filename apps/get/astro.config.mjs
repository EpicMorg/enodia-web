// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://get.enodia.sh',
	output: 'static',
	i18n: {
		defaultLocale: 'en',
		// Keep in sync with src/i18n/locales.ts (path = URL prefix, codes =
		// BCP 47 tag).
		locales: [
			'en',
			'ru',
			'es',
			{ path: 'pt-br', codes: ['pt-BR'] },
			'ro',
			'pl',
			{ path: 'zh-cn', codes: ['zh-CN'] },
		],
		routing: {
			// root ("/") stays English, unprefixed - matches /unix and /windows
			// (Pages Functions, outside Astro's i18n routing entirely) also
			// living unprefixed at the root, so the one-liners never need a
			// locale segment.
			prefixDefaultLocale: false,
		},
	},
	integrations: [
		// Same as apps/landing: not Starlight, so the i18n mapping is given
		// by hand. /unix and /windows are Pages Functions returning scripts,
		// not pages - Astro never sees them, so they're not in the sitemap.
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en',
					ru: 'ru',
					es: 'es',
					'pt-br': 'pt-BR',
					ro: 'ro',
					pl: 'pl',
					'zh-cn': 'zh-CN',
				},
			},
		}),
	],
});
