// Every locale this app ships, in switcher order. `path` is the URL
// prefix ('' = the unprefixed English root), `lang` the BCP 47 tag used
// for <html lang> and hreflang, `label` the language's own name.
// `docs` is where the Documentation link goes: docs.enodia.sh only has
// en/ru, so every other locale links the English docs and says so.
// Keep this table identical to apps/landing's own copy.
export const locales = [
	{ path: '', lang: 'en', label: 'English', docs: 'en' },
	{ path: 'ru', lang: 'ru', label: 'Русский', docs: 'ru' },
	{ path: 'es', lang: 'es', label: 'Español', docs: 'en' },
	{ path: 'pt-br', lang: 'pt-BR', label: 'Português (Brasil)', docs: 'en' },
	{ path: 'ro', lang: 'ro', label: 'Română', docs: 'en' },
	{ path: 'pl', lang: 'pl', label: 'Polski', docs: 'en' },
	{ path: 'zh-cn', lang: 'zh-CN', label: '简体中文', docs: 'en' },
] as const;

export type Locale = (typeof locales)[number];
export type LocalePath = Locale['path'];

export const localeByPath = (path: LocalePath): Locale => locales.find((l) => l.path === path)!;

// '' → '/', 'ru' → '/ru/'
export const localeHref = (path: LocalePath): string => (path ? `/${path}/` : '/');
