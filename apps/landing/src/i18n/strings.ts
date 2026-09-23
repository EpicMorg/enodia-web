import type { LocalePath } from './locales';

// Landing copy per locale. `pitch` is HTML (it carries no markup today,
// but stays set:html-safe for when it does). Register: formal or
// impersonal wherever the language distinguishes it (Вы, usted,
// dumneavoastră, 您; Polish phrased impersonally).
export const strings: Record<
	LocalePath,
	{
		description: string;
		tagline: string;
		pitch: string;
		or: string;
		docs: string;
		install: string;
		license: string; // "{license}" is replaced by the license link
	}
> = {
	'': {
		description:
			'Know what you are running, and how long it has left. Service inventory and lifecycle/EOL monitoring for your infrastructure.',
		tagline: 'Know what you are running, and how long it has left.',
		pitch:
			"enodia asks your deployed services what version they're running, checks those versions against vendor lifecycle calendars, and tells you what's already dead, what's dying, and where your fleet has drifted apart — and, given a БДУ ФСТЭК or NVD export, which known CVEs affect each exact version. You describe your services once — enodia handles the rest.",
		or: 'or',
		docs: 'Documentation',
		install: 'Install',
		license: 'enodia is {license}.',
	},
	ru: {
		description:
			'Знайте, что у вас запущено и сколько ему осталось. Инвентаризация сервисов и мониторинг жизненного цикла/EOL для вашей инфраструктуры.',
		tagline: 'Знайте, что у вас запущено, и сколько ему осталось.',
		pitch:
			'enodia опрашивает ваши сервисы на предмет версии, сверяет её с календарями жизненного цикла вендоров и показывает, что уже мертво, что умирает и где флот разъехался по версиям, а по выгрузке БДУ ФСТЭК или NVD — ещё и какие известные CVE затрагивают каждую конкретную версию. Один раз описали сервисы — дальше enodia сама разберётся.',
		or: 'или',
		docs: 'Документация',
		install: 'Установка',
		license: 'enodia распространяется по лицензии {license}.',
	},
	es: {
		description:
			'Sepa qué tiene en ejecución y cuánto tiempo le queda. Inventario de servicios y monitorización del ciclo de vida/EOL para su infraestructura.',
		tagline: 'Sepa qué tiene en ejecución y cuánto tiempo le queda.',
		pitch:
			'enodia pregunta a sus servicios desplegados qué versión ejecutan, compara esas versiones con los calendarios de ciclo de vida de los fabricantes y le indica qué ya está muerto, qué se está muriendo y dónde se han desincronizado las versiones de su flota; y, a partir de una exportación de BDU FSTEC o NVD, qué CVE conocidas afectan a cada versión exacta. Usted describe sus servicios una sola vez: enodia se encarga del resto.',
		or: 'o',
		docs: 'Documentación (en inglés)',
		install: 'Instalación',
		license: 'enodia se distribuye bajo la licencia {license}.',
	},
	'pt-br': {
		description:
			'Saiba o que está rodando e quanto tempo ainda lhe resta. Inventário de serviços e monitoramento de ciclo de vida/EOL para a sua infraestrutura.',
		tagline: 'Saiba o que está rodando e quanto tempo ainda lhe resta.',
		pitch:
			'enodia pergunta aos seus serviços implantados qual versão eles executam, compara essas versões com os calendários de ciclo de vida dos fornecedores e mostra o que já está morto, o que está morrendo e onde as versões da sua frota divergiram — e, a partir de uma exportação do BDU FSTEC ou do NVD, quais CVEs conhecidas afetam cada versão exata. Você descreve seus serviços uma única vez — o enodia cuida do resto.',
		or: 'ou',
		docs: 'Documentação (em inglês)',
		install: 'Instalação',
		license: 'enodia é distribuído sob a licença {license}.',
	},
	ro: {
		description:
			'Știți ce rulați și cât timp i-a mai rămas. Inventar de servicii și monitorizare a ciclului de viață/EOL pentru infrastructura dumneavoastră.',
		tagline: 'Știți ce rulați și cât timp i-a mai rămas.',
		pitch:
			'enodia întreabă serviciile dumneavoastră implementate ce versiune rulează, compară aceste versiuni cu calendarele de ciclu de viață ale producătorilor și vă arată ce este deja mort, ce este pe moarte și unde s-au desincronizat versiunile din flota dumneavoastră — iar, pe baza unui export BDU FSTEC sau NVD, ce CVE-uri cunoscute afectează fiecare versiune exactă. Descrieți serviciile o singură dată — enodia se ocupă de rest.',
		or: 'sau',
		docs: 'Documentație (în engleză)',
		install: 'Instalare',
		license: 'enodia este distribuit sub licența {license}.',
	},
	pl: {
		description:
			'Co jest uruchomione i ile czasu mu jeszcze zostało. Inwentaryzacja usług i monitorowanie cyklu życia/EOL infrastruktury.',
		tagline: 'Co jest uruchomione i ile czasu mu jeszcze zostało.',
		pitch:
			'enodia pyta wdrożone usługi, w jakiej wersji działają, porównuje te wersje z kalendarzami cyklu życia producentów i pokazuje, co już jest martwe, co właśnie umiera i gdzie wersje w infrastrukturze się rozjechały — a na podstawie eksportu BDU FSTEC lub NVD także to, które znane CVE dotyczą każdej konkretnej wersji. Usługi opisuje się tylko raz — resztą zajmuje się enodia.',
		or: 'lub',
		docs: 'Dokumentacja (po angielsku)',
		install: 'Instalacja',
		license: 'enodia jest udostępniana na licencji {license}.',
	},
	'zh-cn': {
		description: '了解您正在运行什么，以及它还剩多少时间。面向您基础设施的服务清单与生命周期/EOL 监控。',
		tagline: '了解您正在运行什么，以及它还剩多少时间。',
		pitch:
			'enodia 会询问您已部署的服务正在运行哪个版本，将这些版本与厂商的生命周期日历进行比对，并告诉您哪些已经停止支持、哪些即将停止支持，以及您的服务器群在哪些地方版本出现了分化；如果提供 BDU FSTEC 或 NVD 的导出数据，还会告诉您每个具体版本受哪些已知 CVE 影响。您只需描述一次服务，其余交给 enodia。',
		or: '或',
		docs: '文档（英文）',
		install: '安装',
		license: 'enodia 以 {license} 许可证发布。',
	},
};
