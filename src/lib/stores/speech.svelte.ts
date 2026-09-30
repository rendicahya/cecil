import { browser } from '$app/environment';
import type { Language } from '$lib/types';

const LOCALE_BY_LANGUAGE: Record<Language, string> = {
	id: 'id-ID',
	en: 'en-US'
};

function findVoice(locale: string): SpeechSynthesisVoice | undefined {
	const voices = window.speechSynthesis.getVoices();
	const language = locale.split('-')[0];
	return (
		voices.find((voice) => voice.lang === locale) ??
		voices.find((voice) => voice.lang.split('-')[0] === language)
	);
}

class SpeechStore {
	speaking = $state(false);

	get supported() {
		return browser && 'speechSynthesis' in window;
	}

	speak(text: string, language: Language) {
		if (!this.supported) return;

		const locale = LOCALE_BY_LANGUAGE[language];

		// Chrome silently drops an utterance queued in the same tick as
		// cancel(), so the previous speech is stopped first and the new
		// one is queued on the next tick.
		window.speechSynthesis.cancel();

		setTimeout(() => {
			const utterance = new SpeechSynthesisUtterance(text);
			const voice = findVoice(locale);

			utterance.lang = locale;
			if (voice) utterance.voice = voice;

			utterance.onstart = () => (this.speaking = true);
			utterance.onend = () => (this.speaking = false);
			utterance.onerror = (event) => {
				this.speaking = false;
				console.error('[speech] utterance error:', event.error, {
					locale,
					voice: voice?.name ?? '(none — using browser default)',
					voiceCount: window.speechSynthesis.getVoices().length
				});
			};

			window.speechSynthesis.speak(utterance);
		}, 50);
	}

	stop() {
		if (!this.supported) return;
		window.speechSynthesis.cancel();
		this.speaking = false;
	}
}

export const speechStore = new SpeechStore();
