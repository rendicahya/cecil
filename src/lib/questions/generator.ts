import type { Difficulty, StoryFact, StoryFactKey, StoryQuestion } from '../types';
import { createId, shuffle } from '../utils/random';

type QuestionBuilder = (get: (key: StoryFactKey) => string | undefined) => string;

/**
 * One question phrasing per fact type. Each builder only uses facts that are
 * guaranteed to exist when that key is present, so every question it
 * produces is answerable purely from information that appeared in the story.
 */
const QUESTION_BUILDERS: Record<StoryFactKey, QuestionBuilder> = {
	character: () => 'Siapa nama anak dalam cerita ini?',
	companion: (get) => `Siapa yang bersama ${get('character')} dalam cerita ini?`,
	destination: (get) => `Ke mana ${get('character')} pergi?`,
	transport: (get) => `${get('character')} pergi menggunakan apa?`,
	item: (get) => `Apa yang dibawa ${get('character')}?`,
	activity: (get) => `Apa yang dilakukan ${get('character')} di sana?`,
	reason: (get) => `Mengapa ${get('character')} pergi ke ${get('destination') ?? 'sana'}?`,
	time: (get) => `Kapan ${get('character')} pergi?`
};

/** More facts get asked about as difficulty rises, on top of the ones a story actually has. */
const MAX_QUESTIONS_BY_DIFFICULTY: Record<Difficulty, number> = {
	easy: 2,
	medium: 4,
	hard: 6
};

/**
 * Builds questions strictly from the facts that actually appear in a
 * generated story. No fact, no question — the question set changes with
 * whatever the story happened to mention.
 */
export function generateQuestions(
	facts: StoryFact[],
	difficulty: Difficulty = 'medium'
): StoryQuestion[] {
	const maxQuestions = MAX_QUESTIONS_BY_DIFFICULTY[difficulty];
	const valueByKey = new Map(facts.map((f) => [f.key, f.value]));
	const get = (key: StoryFactKey) => valueByKey.get(key);

	const characterFact = facts.find((f) => f.key === 'character');
	const otherKeys = shuffle(facts.filter((f) => f.key !== 'character').map((f) => f.key));

	const chosenKeys: StoryFactKey[] = characterFact ? ['character'] : [];
	for (const key of otherKeys) {
		if (chosenKeys.length >= maxQuestions) break;
		chosenKeys.push(key);
	}

	return chosenKeys.map((key) => ({
		id: createId(),
		text: QUESTION_BUILDERS[key](get)
	}));
}
