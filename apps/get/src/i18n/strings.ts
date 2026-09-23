import type { LocalePath } from './locales';

// get.enodia.sh copy per locale. `proxy` is HTML: "{sh}"/"{ps1}" are
// replaced by the install.sh/install.ps1 links. Register: formal or
// impersonal wherever the language distinguishes it, same as apps/landing.
export const strings: Record<
	LocalePath,
	{
		tagline: string;
		docs: string;
		or: string; // between the two Windows install paths
		proxy: string;
	}
> = {
	'': {
		tagline: 'Install enodia with one command.',
		docs: 'Documentation',
		or: 'or',
		proxy: '<code>/unix</code> and <code>/windows</code> transparently proxy {sh} / {ps1} from GitHub.',
	},
	ru: {
		tagline: 'Установите enodia одной командой.',
		docs: 'Документация',
		or: 'или',
		proxy: '<code>/unix</code> и <code>/windows</code> прозрачно проксируют {sh} / {ps1} с GitHub.',
	},
	es: {
		tagline: 'Instale enodia con un solo comando.',
		docs: 'Documentación',
		or: 'o',
		proxy: '<code>/unix</code> y <code>/windows</code> actúan como proxy transparente de {sh} / {ps1} desde GitHub.',
	},
	'pt-br': {
		tagline: 'Instale o enodia com um único comando.',
		docs: 'Documentação',
		or: 'ou',
		proxy: '<code>/unix</code> e <code>/windows</code> fazem proxy transparente de {sh} / {ps1} a partir do GitHub.',
	},
	ro: {
		tagline: 'Instalați enodia cu o singură comandă.',
		docs: 'Documentație',
		or: 'sau',
		proxy: '<code>/unix</code> și <code>/windows</code> fac proxy transparent pentru {sh} / {ps1} de pe GitHub.',
	},
	pl: {
		tagline: 'Instalacja enodia jednym poleceniem.',
		docs: 'Dokumentacja',
		or: 'lub',
		proxy: '<code>/unix</code> i <code>/windows</code> w przezroczysty sposób przekazują {sh} / {ps1} z GitHuba.',
	},
	'zh-cn': {
		tagline: '一条命令安装 enodia。',
		docs: '文档',
		or: '或',
		proxy: '<code>/unix</code> 和 <code>/windows</code> 会透明代理来自 GitHub 的 {sh} / {ps1}。',
	},
	uk: {
		tagline: 'Встановіть enodia однією командою.',
		docs: 'Документація',
		or: 'або',
		proxy: '<code>/unix</code> і <code>/windows</code> прозоро проксують {sh} / {ps1} з GitHub.',
	},
};
