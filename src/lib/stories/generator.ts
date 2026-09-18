import type { GeneratedStory } from '../types';
import { pickStoryTemplate } from './templates';

/** Generates a brand new short story. Pure function, no external calls. */
export function generateStory(): GeneratedStory {
	const template = pickStoryTemplate();
	return template();
}
