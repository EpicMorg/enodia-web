// GET /unix - proxies enodia's install.sh (covers Linux + macOS; the
// script itself branches on `uname`, nothing OS-specific happens here).
// Explicit edge caching via the Cache API: a bare Cache-Control header on
// a Function's own response is NOT enough to get Cloudflare to cache it -
// Workers/Pages Functions run ahead of the edge cache, so without this the
// Function (and the upstream GitHub fetch) would run on every request.
const UPSTREAM = 'https://raw.githubusercontent.com/EpicMorg/enodia/master/install.sh';
const MAX_AGE_SECONDS = 600; // 10 minutes - deliberate, see CLAUDE.md Decided item 9

export const onRequestGet: PagesFunction = async (context) => {
	const cache = caches.default;
	const cacheKey = new Request(context.request.url, context.request);

	const cached = await cache.match(cacheKey);
	if (cached) return cached;

	const upstream = await fetch(UPSTREAM);
	if (upstream.status === 404) {
		// Confirmed live, 2026-09-07: install.sh exists on the enodia repo's
		// develop branch but hasn't reached master yet, so this is a real,
		// expected state pre-release, not a bug here - don't "fix" by
		// pointing at develop, master is the deliberate long-term target
		// (see CLAUDE.md Decided item 9). Not cached, so it stops 404ing
		// the moment install.sh actually lands on master.
		return new Response('enodia has no release yet - install.sh is not on master.\n', {
			status: 404,
			headers: { 'content-type': 'text/plain; charset=utf-8' },
		});
	}
	if (!upstream.ok) {
		// Don't cache failures - a transient GitHub hiccup shouldn't get
		// stuck being served for the next 10 minutes.
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
