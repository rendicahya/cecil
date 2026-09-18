import type { Difficulty, GeneratedStory, Language } from '../types';
import { pickStoryTemplate } from './templates';

/** Generates a brand new short story. Pure function, no external calls. */
export function generateStory(
	difficulty: Difficulty = 'medium',
	language: Language = 'id'
): GeneratedStory {
	const template = pickStoryTemplate(difficulty, language);
	return template();
}
