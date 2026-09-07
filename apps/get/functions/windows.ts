// GET /windows - proxies enodia's install.ps1. See unix.ts for the caching
// rationale (identical here, just the Windows counterpart).
const UPSTREAM = 'https://raw.githubusercontent.com/EpicMorg/enodia/master/install.ps1';
const MAX_AGE_SECONDS = 600; // 10 minutes - deliberate, see CLAUDE.md Decided item 9

export const onRequestGet: PagesFunction = async (context) => {
	const cache = caches.default;
	const cacheKey = new Request(context.request.url, context.request);

	const cached = await cache.match(cacheKey);
	if (cached) return cached;

	const upstream = await fetch(UPSTREAM);
	if (upstream.status === 404) {
		// See unix.ts - generic, defensive message, not tied to a specific
		// (now resolved) root cause.
		return new Response('install.ps1 not found upstream - check github.com/EpicMorg/enodia.\n', {
			status: 404,
			headers: { 'content-type': 'text/plain; charset=utf-8' },
		});
	}
	if (!upstream.ok) {
		return new Response(`upstream fetch failed: ${upstream.status}`, { status: 502 });
	}

	const body = await upstream.text();
	const response = new Response(body, {
		status: 200,
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': `public, max-age=${MAX_AGE_SECONDS}`,
		},
	});

	context.waitUntil(cache.put(cacheKey, response.clone()));
	return response;
};
