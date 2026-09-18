import { browser } from '$app/environment';
import type { Difficulty } from '$lib/types';

const STORAGE_KEY = 'cecil-difficulty';

function readInitialDifficulty(): Difficulty {
	if (!browser) return 'medium';
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'easy' || stored === 'medium' || stored === 'hard') return stored;
	return 'medium';
}

class DifficultyStore {
	current = $state<Difficulty>(readInitialDifficulty());

	set(difficulty: Difficulty) {
		this.current = difficulty;
		if (browser) localStorage.setItem(STORAGE_KEY, difficulty);
	}
}

export const difficultyStore = new DifficultyStore();
