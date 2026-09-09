// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.enodia.sh',
	redirects: {
		'/': '/en/',
	},
	integrations: [
		starlight({
			title: 'enodia',
			favicon: '/favicon.ico',
			head: [
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://docs.enodia.sh/og-image.png' } },
			],
			defaultLocale: 'en',
			locales: {
				en: { label: 'English', lang: 'en' },
				ru: { label: 'Русский', lang: 'ru' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/EpicMorg/enodia' }],
			sidebar: [
				{
					label: 'Getting started',
					translations: { ru: 'Начало работы' },
					slug: 'getting-started',
				},
				{
					label: 'Concepts',
					translations: { ru: 'Концепции' },
					slug: 'concepts',
				},
				{
					label: 'Configuration',
					translations: { ru: 'Конфигурация' },
					items: [
						{
							label: 'Configuration',
							translations: { ru: 'Конфигурация' },
							slug: 'configuration',
						},
						{
							label: 'Product setup',
							translations: { ru: 'Настройка продуктов' },
							collapsed: true,
							items: [{ autogenerate: { directory: 'configuration/products' } }],
						},
					],
				},
				{
					label: 'CLI reference',
					translations: { ru: 'Справочник CLI' },
					slug: 'cli-reference',
				},
				{
					label: 'Views',
					translations: { ru: 'Представления' },
					slug: 'views',
				},
				{
					label: 'Reporting',
					translations: { ru: 'Отчёты' },
					slug: 'reporting',
				},
				{
					label: 'Supported products',
					translations: { ru: 'Поддерживаемые продукты' },
					slug: 'products',
				},
				{
					label: 'Security',
					translations: { ru: 'Безопасность' },
					slug: 'security',
				},
				{
					label: 'Changelog',
					translations: { ru: 'Чейнджлог' },
					slug: 'changelog',
				},
			],
		}),
	],
});
