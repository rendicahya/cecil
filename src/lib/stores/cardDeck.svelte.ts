import type { CardColorName, Difficulty, Language, StoryCardData } from '../types';
import { generateStory } from '../stories/generator';
import { generateQuestions } from '../questions/generator';
import { pickNextColor } from '../palette';
import { createId } from '../utils/random';

/** How many upcoming cards stay pre-generated (buffered) ahead of the current one. */
const BUFFER_AHEAD = 3;

function createCard(
	previousColor: CardColorName | null,
	difficulty: Difficulty,
	language: Language
): StoryCardData {
	const story = generateStory(difficulty, language);
	return {
		id: createId(),
		color: pickNextColor(previousColor),
		story,
		questions: generateQuestions(story.facts, difficulty, language)
	};
}

/**
 * An unbounded stream of story cards, generated lazily as the parent moves
 * forward. Cards already seen stay in memory so going back is free; nothing
 * is ever pre-generated beyond a small lookahead buffer.
 */
export class CardDeck {
	cards = $state<StoryCardData[]>([]);
	index = $state(0);
	private difficulty: Difficulty;
	private language: Language;

	constructor(difficulty: Difficulty = 'medium', language: Language = 'id') {
		this.difficulty = difficulty;
		this.language = language;
		this.fillBuffer();
	}

	/** Changing difficulty reshapes every card ahead, so the buffered ones are discarded. */
	setDifficulty(difficulty: Difficulty) {
		if (difficulty === this.difficulty) return;
		this.difficulty = difficulty;
		this.reset();
	}

	/** Changing language regenerates every card ahead in the new language. */
	setLanguage(language: Language) {
		if (language === this.language) return;
		this.language = language;
		this.reset();
	}

	get current(): StoryCardData | undefined {
		return this.cards[this.index];
	}

	/** Up to two cards peeking behind the current one. */
	get upcoming(): StoryCardData[] {
		return this.cards.slice(this.index + 1, this.index + 3);
	}

	get canGoPrev(): boolean {
		return this.index > 0;
	}

	next() {
		this.index += 1;
		this.fillBuffer();
	}

	prev() {
		if (this.canGoPrev) this.index -= 1;
	}

	private reset() {
		this.cards = [];
		this.index = 0;
		this.fillBuffer();
	}

	private fillBuffer() {
		while (this.cards.length - this.index < BUFFER_AHEAD) {
			const previousColor = this.cards.at(-1)?.color ?? null;
			this.cards.push(createCard(previousColor, this.difficulty, this.language));
		}
	}
}
