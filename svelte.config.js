
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: ['*'],
			handleMissingId: 'warn', 
			handleHttpError: ({ path, referrer, message }) => {
				// ignore deliberate link to shiny 404 page
				console.warn(`${path} ${referrer} ${message}`);
				return;
				// if (path === '/not-found' && referrer === '/blog/how-we-built-our-404-page') {
				// 	return;
				// }
			}
		}

	},
	// preprocess: [mdsvex()],
	extensions: [".svelte", ".svx"]
};
export default config;