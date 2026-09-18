import { languageStore } from './stores/language.svelte';
import type { Language } from './types';

const STRINGS = {
	id: {
		pageTitle: 'Cecil — Cerita Kecil',
		metaDescription:
			'Cecil membantu anak berlatih mendengarkan dan memahami cerita pendek lewat kartu cerita yang bisa digeser.',
		brandTagline: 'Cerita Kecil',
		subtitle: 'Bacakan ceritanya, lalu tanyakan pertanyaannya.',
		preparingCards: 'Menyiapkan kartu cerita…',
		questionsLabel: 'Pertanyaan',
		difficultyGroupLabel: 'Tingkat kesulitan cerita',
		difficultyEasy: 'Mudah',
		difficultyMedium: 'Sedang',
		difficultyHard: 'Sulit',
		languageGroupLabel: 'Pilih bahasa',
		themeToLightAria: 'Ganti ke mode terang',
		themeToDarkAria: 'Ganti ke mode gelap',
		themeLightTitle: 'Mode terang',
		themeDarkTitle: 'Mode gelap',
		fullscreenEnter: 'Layar penuh',
		fullscreenExit: 'Keluar dari layar penuh'
	},
	en: {
		pageTitle: 'Cecil — Little Stories',
		metaDescription:
			'Cecil helps kids practice listening and reading comprehension through swipeable short-story cards.',
		brandTagline: 'Little Stories',
		subtitle: 'Read the story aloud, then ask the questions.',
		preparingCards: 'Preparing story cards…',
		questionsLabel: 'Questions',
		difficultyGroupLabel: 'Story difficulty level',
		difficultyEasy: 'Easy',
		difficultyMedium: 'Medium',
		difficultyHard: 'Hard',
		languageGroupLabel: 'Choose language',
		themeToLightAria: 'Switch to light mode',
		themeToDarkAria: 'Switch to dark mode',
		themeLightTitle: 'Light mode',
		themeDarkTitle: 'Dark mode',
		fullscreenEnter: 'Fullscreen',
		fullscreenExit: 'Exit fullscreen'
	}
} satisfies Record<Language, Record<string, string>>;

export type TranslationKey = keyof (typeof STRINGS)['id'];

export function t(key: TranslationKey): string {
	return STRINGS[languageStore.current][key];
}
