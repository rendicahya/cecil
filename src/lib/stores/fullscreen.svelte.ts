import { browser } from '$app/environment';

class FullscreenStore {
	active = $state(browser ? document.fullscreenElement !== null : false);

	constructor() {
		if (browser) {
			document.addEventListener('fullscreenchange', () => {
				this.active = document.fullscreenElement !== null;
			});
		}
	}

	async toggle() {
		if (!browser) return;
		try {
			if (document.fullscreenElement) {
				await document.exitFullscreen();
			} else {
				await document.documentElement.requestFullscreen();
			}
		} catch {
			// Fullscreen can be denied by the browser (e.g. no user gesture); ignore.
		}
	}
}

export const fullscreenStore = new FullscreenStore();
