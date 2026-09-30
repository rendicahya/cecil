import { browser } from '$app/environment';
import type { Language } from '$lib/types';

const LOCALE_BY_LANGUAGE: Record<Language, string> = {
	id: 'id-ID',
	en: 'en-US'
};

class SpeechStore {
	speaking = $state(false);

	get supported() {
		return browser && 'speechSynthesis' in window;
	}

	speak(text: string, language: Language) {
		if (!this.supported) return;

		window.speechSynthesis.cancel();

		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = LOCALE_BY_LANGUAGE[language];
		utterance.onstart = () => (this.speaking = true);
		utterance.onend = () => (this.speaking = false);
		utterance.onerror = () => (this.speaking = false);

		window.speechSynthesis.speak(utterance);
	}

	stop() {
		if (!this.supported) return;
		window.speechSynthesis.cancel();
		this.speaking = false;
	}
}

export const speechStore = new SpeechStore();
