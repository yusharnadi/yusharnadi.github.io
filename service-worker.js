importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.precaching.precacheAndRoute([
	{ url: "/index.html", revision: "1" },
	{ url: "/nav.html", revision: "1" },
	{ url: "/css/materialize.min.css", revision: "1" },
	{ url: "/css/style.css", revision: "1" },
	{ url: "/js/materialize.min.js", revision: "1" },
	{ url: "/js/init.js", revision: "1" },
	{ url: "/js/nav.js", revision: "1" },
	{ url: "/js/api.js", revision: "1" },
	{ url: "/js/idb.js", revision: "1" },
	{ url: "/js/db.js", revision: "1" },
	{ url: "/manifest.json", revision: "1" },
	{ url: "/images/fav.png", revision: "1" },
	{ url: "/images/logo.png", revision: "1" },
	{ url: "/images/icons/icon-72x72.png", revision: "1" },
	{ url: "/images/icons/icon-96x96.png", revision: "1" },
	{ url: "/images/icons/icon-128x128.png", revision: "1" },
	{ url: "/images/icons/icon-144x144.png", revision: "1" },
	{ url: "/images/icons/icon-152x152.png", revision: "1" },
	{ url: "/images/icons/icon-192x192.png", revision: "1" },
	{ url: "/images/icons/icon-384x384.png", revision: "1" },
	{ url: "/images/icons/icon-512x512.png", revision: "1" },
]);

// cahce page folder with stale while revalidate Strategies
workbox.routing.registerRoute(new RegExp("/pages/"), workbox.strategies.staleWhileRevalidate({ cacheName: "pages" }));

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
	/^https:\/\/fonts\.gstatic\.com/,
	workbox.strategies.cacheFirst({
		cacheName: "google-fonts-webfonts",
		plugins: [
			new workbox.cacheableResponse.Plugin({
				statuses: [0, 200],
			}),
			new workbox.expiration.Plugin({
				maxAgeSeconds: 60 * 60 * 24 * 365,
				maxEntries: 30,
			}),
		],
	})
);

workbox.routing.registerRoute(
	/^https:\/\/fonts\.googleapis\.com/,
	workbox.strategies.cacheFirst({
		cacheName: "google-fonts-stylesheets",
		plugins: [
			new workbox.cacheableResponse.Plugin({
				statuses: [0, 200],
			}),
			new workbox.expiration.Plugin({
				maxAgeSeconds: 60 * 60 * 24 * 365,
				maxEntries: 30,
			}),
		],
	})
);

workbox.routing.registerRoute(
	"https://api.football-data.org/v2/competitions/2021/standings",
	workbox.strategies.staleWhileRevalidate({ cacheName: "api-standing" })
);

workbox.routing.registerRoute("https://api.football-data.org/v2/competitions/2021/teams", workbox.strategies.staleWhileRevalidate({ cacheName: "api-team" }));

self.addEventListener("push", function (event) {
	var body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = "Push message no payload";
	}
	var options = {
		body: body,
		icon: "/images/logo.png",
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1,
		},
	};
	event.waitUntil(self.registration.showNotification("Premier League APP", options));
});
