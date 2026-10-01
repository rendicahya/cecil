import { browser } from '$app/environment';
import type { Language } from '$lib/types';

const LOCALE_BY_LANGUAGE: Record<Language, string> = {
	id: 'id-ID',
	en: 'en-US'
};

const STORAGE_KEY = 'cecil-speech-voice';

type VoiceChoiceByLanguage = Partial<Record<Language, string>>;

function readStoredChoices(): VoiceChoiceByLanguage {
	if (!browser) return {};
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as VoiceChoiceByLanguage) : {};
	} catch {
		return {};
	}
}

class SpeechStore {
	speaking = $state(false);
	voices = $state<SpeechSynthesisVoice[]>([]);
	private choices = $state<VoiceChoiceByLanguage>(readStoredChoices());

	constructor() {
		if (!this.supported) return;

		this.refreshVoices();
		window.speechSynthesis.onvoiceschanged = () => this.refreshVoices();
	}

	get supported() {
		return browser && 'speechSynthesis' in window;
	}

	private refreshVoices() {
		this.voices = window.speechSynthesis.getVoices();
	}

	/** Voices matching a language's locale, e.g. all `id-ID` voices for `id`. */
	voicesFor(language: Language): SpeechSynthesisVoice[] {
		const locale = LOCALE_BY_LANGUAGE[language];
		const prefix = locale.split('-')[0];
		return this.voices.filter((voice) => voice.lang.split('-')[0] === prefix);
	}

	selectedVoiceURI(language: Language): string | undefined {
		return this.choices[language];
	}

	setVoice(language: Language, voiceURI: string) {
		this.choices = { ...this.choices, [language]: voiceURI };
		if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(this.choices));
	}

	private resolveVoice(language: Language): SpeechSynthesisVoice | undefined {
		const candidates = this.voicesFor(language);
		const chosenURI = this.choices[language];
		return (
			candidates.find((voice) => voice.voiceURI === chosenURI) ??
			candidates[0] ??
			this.voices.find((voice) => voice.lang === LOCALE_BY_LANGUAGE[language])
		);
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
			const voice = this.resolveVoice(language);

			utterance.lang = locale;
			if (voice) utterance.voice = voice;

			utterance.onstart = () => (this.speaking = true);
			utterance.onend = () => (this.speaking = false);
			utterance.onerror = () => (this.speaking = false);

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
