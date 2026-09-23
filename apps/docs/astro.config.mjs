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
				es: { label: 'Español', lang: 'es' },
				'pt-br': { label: 'Português (Brasil)', lang: 'pt-BR' },
				ro: { label: 'Română', lang: 'ro' },
				pl: { label: 'Polski', lang: 'pl' },
				'zh-cn': { label: '简体中文', lang: 'zh-CN' },
				uk: { label: 'Українська', lang: 'uk' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/EpicMorg/enodia' }],
			sidebar: [
				{
					label: 'Getting started',
					translations: { ru: 'Начало работы', es: 'Primeros pasos', 'pt-BR': 'Primeiros passos', ro: 'Primii pași', pl: 'Pierwsze kroki', 'zh-CN': '快速开始', uk: 'Початок роботи' },
					slug: 'getting-started',
				},
				{
					label: 'Concepts',
					translations: { ru: 'Концепции', es: 'Conceptos', 'pt-BR': 'Conceitos', ro: 'Concepte', pl: 'Koncepcje', 'zh-CN': '核心概念', uk: 'Концепції' },
					slug: 'concepts',
				},
				{
					label: 'Configuration',
					translations: { ru: 'Конфигурация', es: 'Configuración', 'pt-BR': 'Configuração', ro: 'Configurare', pl: 'Konfiguracja', 'zh-CN': '配置', uk: 'Конфігурація' },
					items: [
						{
							label: 'Configuration',
							translations: { ru: 'Конфигурация', es: 'Configuración', 'pt-BR': 'Configuração', ro: 'Configurare', pl: 'Konfiguracja', 'zh-CN': '配置', uk: 'Конфігурація' },
							slug: 'configuration',
						},
						{
							label: 'Product setup',
							translations: { ru: 'Настройка продуктов', es: 'Configuración de productos', 'pt-BR': 'Configuração de produtos', ro: 'Configurarea produselor', pl: 'Konfiguracja produktów', 'zh-CN': '产品配置', uk: 'Налаштування продуктів' },
							collapsed: true,
							items: [{ autogenerate: { directory: 'configuration/products' } }],
						},
					],
				},
				{
					label: 'CLI reference',
					translations: { ru: 'Справочник CLI', es: 'Referencia de la CLI', 'pt-BR': 'Referência da CLI', ro: 'Referință CLI', pl: 'Dokumentacja CLI', 'zh-CN': 'CLI 参考', uk: 'Довідник CLI' },
					slug: 'cli-reference',
				},
				{
					label: 'Views',
					translations: { ru: 'Представления', es: 'Vistas', 'pt-BR': 'Visões', ro: 'Vizualizări', pl: 'Widoki', 'zh-CN': '视图', uk: 'Подання' },
					slug: 'views',
				},
				{
					label: 'Reporting',
					translations: { ru: 'Отчёты', es: 'Informes', 'pt-BR': 'Relatórios', ro: 'Rapoarte', pl: 'Raporty', 'zh-CN': '报告', uk: 'Звіти' },
					slug: 'reporting',
				},
				{
					label: 'CVE correlation',
					translations: { ru: 'Сопоставление с CVE', es: 'Correlación de CVE', 'pt-BR': 'Correlação de CVEs', ro: 'Corelare CVE', pl: 'Korelacja CVE', 'zh-CN': 'CVE 关联', uk: 'Зіставлення з CVE' },
					slug: 'cve',
				},
				{
					label: 'Supported products',
					translations: { ru: 'Поддерживаемые продукты', es: 'Productos compatibles', 'pt-BR': 'Produtos suportados', ro: 'Produse acceptate', pl: 'Obsługiwane produkty', 'zh-CN': '支持的产品', uk: 'Підтримувані продукти' },
					slug: 'products',
				},
				{
					label: 'Security',
					translations: { ru: 'Безопасность', es: 'Seguridad', 'pt-BR': 'Segurança', ro: 'Securitate', pl: 'Bezpieczeństwo', 'zh-CN': '安全', uk: 'Безпека' },
					slug: 'security',
				},
				{
					label: 'Changelog',
					translations: { ru: 'Чейнджлог', es: 'Registro de cambios', 'pt-BR': 'Registro de alterações', ro: 'Jurnal de modificări', pl: 'Historia zmian', 'zh-CN': '更新日志', uk: 'Журнал змін' },
					slug: 'changelog',
				},
			],
		}),
	],
});
