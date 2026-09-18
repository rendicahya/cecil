import { browser } from '$app/environment';
import type { Language } from '$lib/types';

const STORAGE_KEY = 'cecil-language';

function readInitialLanguage(): Language {
	if (!browser) return 'id';
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'id' || stored === 'en') return stored;
	return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'id';
}

class LanguageStore {
	current = $state<Language>(readInitialLanguage());

	constructor() {
		this.syncDom();
	}

	set(language: Language) {
		this.current = language;
		this.syncDom();
	}

	private syncDom() {
		if (!browser) return;
		document.documentElement.lang = this.current;
		localStorage.setItem(STORAGE_KEY, this.current);
	}
}

export const languageStore = new LanguageStore();
