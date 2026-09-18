import type { Difficulty, GeneratedStory } from '../types';
import { pickStoryTemplate } from './templates';

/** Generates a brand new short story. Pure function, no external calls. */
export function generateStory(difficulty: Difficulty = 'medium'): GeneratedStory {
	const template = pickStoryTemplate(difficulty);
	return template();
}
