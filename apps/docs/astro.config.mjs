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
				// Yandex.Metrika counter 112978858, the same one enodia.sh and
				// get.enodia.sh use (their YandexMetrika.astro component) — kept
				// verbatim from Metrika's own snippet.
				{
					tag: 'script',
					attrs: { type: 'text/javascript' },
					content: `(function(m,e,t,r,i,k,a){
	m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
	m[i].l=1*new Date();
	for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
	k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.webvisor.org/metrika/tag_ww.js?id=112978858', 'ym');
ym(112978858, 'init', {ssr:true, webvisor:true, trackHash:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`,
				},
				{
					tag: 'noscript',
					content:
						'<div><img src="https://mc.yandex.ru/watch/112978858" style="position:absolute; left:-9999px;" alt="" /></div>',
				},
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
					label: 'CVE correlation',
					translations: { ru: 'Сопоставление с CVE' },
					slug: 'cve',
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
