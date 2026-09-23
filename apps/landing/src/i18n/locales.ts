// Every locale this app ships, in switcher order. `path` is the URL
// prefix ('' = the unprefixed English root), `lang` the BCP 47 tag used
// for <html lang> and hreflang, `label` the language's own name.
// `docs` is the docs.enodia.sh locale the Documentation link goes to
// (docs uses 'en' for English, not the unprefixed root).
// Keep this table identical to apps/get's own copy.
export const locales = [
	{ path: '', lang: 'en', label: 'English', docs: 'en' },
	{ path: 'ru', lang: 'ru', label: 'Русский', docs: 'ru' },
	{ path: 'es', lang: 'es', label: 'Español', docs: 'es' },
	{ path: 'pt-br', lang: 'pt-BR', label: 'Português (Brasil)', docs: 'pt-br' },
	{ path: 'ro', lang: 'ro', label: 'Română', docs: 'ro' },
	{ path: 'pl', lang: 'pl', label: 'Polski', docs: 'pl' },
	{ path: 'zh-cn', lang: 'zh-CN', label: '简体中文', docs: 'zh-cn' },
	{ path: 'uk', lang: 'uk', label: 'Українська', docs: 'uk' },
] as const;

export type Locale = (typeof locales)[number];
export type LocalePath = Locale['path'];

export const localeByPath = (path: LocalePath): Locale => locales.find((l) => l.path === path)!;

// '' → '/', 'ru' → '/ru/'
export const localeHref = (path: LocalePath): string => (path ? `/${path}/` : '/');
