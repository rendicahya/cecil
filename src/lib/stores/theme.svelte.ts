import { browser } from '$app/environment';

const STORAGE_KEY = 'cecil-theme';
export type Theme = 'light' | 'dark';

function readInitialTheme(): Theme {
	if (!browser) return 'light';
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'light' || stored === 'dark') return stored;
	return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

class ThemeStore {
	current = $state<Theme>(readInitialTheme());

	constructor() {
		this.syncDom();
	}

	toggle() {
		this.set(this.current === 'dark' ? 'light' : 'dark');
	}

	set(theme: Theme) {
		this.current = theme;
		this.syncDom();
	}

	private syncDom() {
		if (!browser) return;
		document.documentElement.classList.toggle('dark', this.current === 'dark');
		localStorage.setItem(STORAGE_KEY, this.current);
	}
}

export const themeStore = new ThemeStore();
