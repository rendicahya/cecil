import type { CardColorName, StoryCardData } from '../types';
import { generateStory } from '../stories/generator';
import { generateQuestions } from '../questions/generator';
import { pickNextColor } from '../palette';
import { createId } from '../utils/random';

/** How many upcoming cards stay pre-generated (buffered) ahead of the current one. */
const BUFFER_AHEAD = 3;

function createCard(previousColor: CardColorName | null): StoryCardData {
	const story = generateStory();
	return {
		id: createId(),
		color: pickNextColor(previousColor),
		story,
		questions: generateQuestions(story.facts)
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

	constructor() {
		this.fillBuffer();
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

	private fillBuffer() {
		while (this.cards.length - this.index < BUFFER_AHEAD) {
			const previousColor = this.cards.at(-1)?.color ?? null;
			this.cards.push(createCard(previousColor));
		}
	}
}
