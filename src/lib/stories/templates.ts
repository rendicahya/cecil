import type { Difficulty, GeneratedStory, Language, StoryFact } from '../types';
import { pickOne } from '../utils/random';
import * as idWords from './wordbank';
import * as enWords from './wordbank.en';

type StoryTemplate = () => GeneratedStory;

function fact(key: StoryFact['key'], value: string): StoryFact {
	return { key, value };
}

function buildEnTemplates(): Record<Difficulty, StoryTemplate[]> {
	const { CHARACTERS, DESTINATIONS, TRANSPORTS, ITEMS, COMPANIONS, ACTIVITIES, REASONS, TIMES } =
		enWords;

	// Short, single-clause stories with only two or three facts to remember.
	const easy: StoryTemplate[] = [
		() => {
			const character = pickOne(CHARACTERS);
			const destination = pickOne(DESTINATIONS);
			return {
				text: `${character} went to ${destination}.`,
				facts: [fact('character', character), fact('destination', destination)]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const destination = pickOne(DESTINATIONS);
			const companion = pickOne(COMPANIONS);
			return {
				text: `${character} went to ${destination} with ${companion}.`,
				facts: [
					fact('character', character),
					fact('destination', destination),
					fact('companion', companion)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const transport = pickOne(TRANSPORTS);
			const destination = pickOne(DESTINATIONS);
			return {
				text: `${character} went to ${destination} by ${transport}.`,
				facts: [
					fact('character', character),
					fact('transport', transport),
					fact('destination', destination)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const item = pickOne(ITEMS);
			const destination = pickOne(DESTINATIONS);
			return {
				text: `${character} brought ${item} to ${destination}.`,
				facts: [fact('character', character), fact('item', item), fact('destination', destination)]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const time = pickOne(TIMES);
			const destination = pickOne(DESTINATIONS);
			return {
				text: `${time}, ${character} went to ${destination}.`,
				facts: [fact('character', character), fact('time', time), fact('destination', destination)]
			};
		}
	];

	// Four or five facts per story, one supporting sentence.
	const medium: StoryTemplate[] = [
		() => {
			const character = pickOne(CHARACTERS);
			const time = pickOne(TIMES);
			const destination = pickOne(DESTINATIONS);
			const transport = pickOne(TRANSPORTS);
			const item = pickOne(ITEMS);
			return {
				text: `${time}, ${character} went to ${destination} by ${transport}. ${character} brought ${item}.`,
				facts: [
					fact('character', character),
					fact('time', time),
					fact('destination', destination),
					fact('transport', transport),
					fact('item', item)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const destination = pickOne(DESTINATIONS);
			const companion = pickOne(COMPANIONS);
			const activity = pickOne(ACTIVITIES);
			return {
				text: `${character} went to ${destination} with ${companion}. There, they ${activity}.`,
				facts: [
					fact('character', character),
					fact('destination', destination),
					fact('companion', companion),
					fact('activity', activity)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const transport = pickOne(TRANSPORTS);
			const destination = pickOne(DESTINATIONS);
			const reason = pickOne(REASONS);
			return {
				text: `${character} went by ${transport} to ${destination}. They wanted to ${reason}.`,
				facts: [
					fact('character', character),
					fact('transport', transport),
					fact('destination', destination),
					fact('reason', reason)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const time = pickOne(TIMES);
			const item = pickOne(ITEMS);
			const destination = pickOne(DESTINATIONS);
			const activity = pickOne(ACTIVITIES);
			return {
				text: `${time}, ${character} brought ${item} to ${destination}. There, ${character} ${activity}.`,
				facts: [
					fact('character', character),
					fact('time', time),
					fact('item', item),
					fact('destination', destination),
					fact('activity', activity)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const companion = pickOne(COMPANIONS);
			const transport = pickOne(TRANSPORTS);
			const destination = pickOne(DESTINATIONS);
			return {
				text: `${character} and ${companion} went to ${destination} by ${transport}.`,
				facts: [
					fact('character', character),
					fact('companion', companion),
					fact('transport', transport),
					fact('destination', destination)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const destination = pickOne(DESTINATIONS);
			const reason = pickOne(REASONS);
			const activity = pickOne(ACTIVITIES);
			return {
				text: `${character} went to ${destination} to ${reason}. Once there, ${character} ${activity}.`,
				facts: [
					fact('character', character),
					fact('destination', destination),
					fact('reason', reason),
					fact('activity', activity)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const item = pickOne(ITEMS);
			const destination = pickOne(DESTINATIONS);
			const companion = pickOne(COMPANIONS);
			return {
				text: `${character} brought ${item} to ${destination}. There, ${character} met ${companion}.`,
				facts: [
					fact('character', character),
					fact('item', item),
					fact('destination', destination),
					fact('companion', companion)
				]
			};
		}
	];

	// Longer, two-sentence stories that pack five or six facts to track.
	const hard: StoryTemplate[] = [
		() => {
			const character = pickOne(CHARACTERS);
			const time = pickOne(TIMES);
			const destination = pickOne(DESTINATIONS);
			const companion = pickOne(COMPANIONS);
			const transport = pickOne(TRANSPORTS);
			const item = pickOne(ITEMS);
			return {
				text: `${time}, ${character} went to ${destination} with ${companion} by ${transport}. They brought ${item}.`,
				facts: [
					fact('character', character),
					fact('time', time),
					fact('destination', destination),
					fact('companion', companion),
					fact('transport', transport),
					fact('item', item)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const destination = pickOne(DESTINATIONS);
			const companion = pickOne(COMPANIONS);
			const reason = pickOne(REASONS);
			const activity = pickOne(ACTIVITIES);
			return {
				text: `${character} went to ${destination} with ${companion} to ${reason}. There, they ${activity}.`,
				facts: [
					fact('character', character),
					fact('destination', destination),
					fact('companion', companion),
					fact('reason', reason),
					fact('activity', activity)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const transport = pickOne(TRANSPORTS);
			const destination = pickOne(DESTINATIONS);
			const reason = pickOne(REASONS);
			const item = pickOne(ITEMS);
			return {
				text: `${character} went by ${transport} to ${destination} to ${reason}. They brought ${item}.`,
				facts: [
					fact('character', character),
					fact('transport', transport),
					fact('destination', destination),
					fact('reason', reason),
					fact('item', item)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const time = pickOne(TIMES);
			const item = pickOne(ITEMS);
			const destination = pickOne(DESTINATIONS);
			const companion = pickOne(COMPANIONS);
			const activity = pickOne(ACTIVITIES);
			return {
				text: `${time}, ${character} brought ${item} to ${destination} with ${companion}. There, they ${activity}.`,
				facts: [
					fact('character', character),
					fact('time', time),
					fact('item', item),
					fact('destination', destination),
					fact('companion', companion),
					fact('activity', activity)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const companion = pickOne(COMPANIONS);
			const transport = pickOne(TRANSPORTS);
			const destination = pickOne(DESTINATIONS);
			const reason = pickOne(REASONS);
			const activity = pickOne(ACTIVITIES);
			return {
				text: `${character} and ${companion} went by ${transport} to ${destination} to ${reason}. Once there, they ${activity}.`,
				facts: [
					fact('character', character),
					fact('companion', companion),
					fact('transport', transport),
					fact('destination', destination),
					fact('reason', reason),
					fact('activity', activity)
				]
			};
		}
	];

	return { easy, medium, hard };
}

function buildIdTemplates(): Record<Difficulty, StoryTemplate[]> {
	const { CHARACTERS, DESTINATIONS, TRANSPORTS, ITEMS, COMPANIONS, ACTIVITIES, REASONS, TIMES } =
		idWords;

	const easy: StoryTemplate[] = [
		() => {
			const character = pickOne(CHARACTERS);
			const destination = pickOne(DESTINATIONS);
			return {
				text: `${character} pergi ke ${destination}.`,
				facts: [fact('character', character), fact('destination', destination)]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const destination = pickOne(DESTINATIONS);
			const companion = pickOne(COMPANIONS);
			return {
				text: `${character} pergi ke ${destination} bersama ${companion}.`,
				facts: [
					fact('character', character),
					fact('destination', destination),
					fact('companion', companion)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const transport = pickOne(TRANSPORTS);
			const destination = pickOne(DESTINATIONS);
			return {
				text: `${character} naik ${transport} ke ${destination}.`,
				facts: [
					fact('character', character),
					fact('transport', transport),
					fact('destination', destination)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const item = pickOne(ITEMS);
			const destination = pickOne(DESTINATIONS);
			return {
				text: `${character} membawa ${item} ke ${destination}.`,
				facts: [fact('character', character), fact('item', item), fact('destination', destination)]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const time = pickOne(TIMES);
			const destination = pickOne(DESTINATIONS);
			return {
				text: `${time}, ${character} pergi ke ${destination}.`,
				facts: [fact('character', character), fact('time', time), fact('destination', destination)]
			};
		}
	];

	// The original set: four or five facts per story, one supporting sentence.
	const medium: StoryTemplate[] = [
		// time + destination + transport + item
		() => {
			const character = pickOne(CHARACTERS);
			const time = pickOne(TIMES);
			const destination = pickOne(DESTINATIONS);
			const transport = pickOne(TRANSPORTS);
			const item = pickOne(ITEMS);
			return {
				text: `${time}, ${character} pergi ke ${destination} naik ${transport}. ${character} membawa ${item}.`,
				facts: [
					fact('character', character),
					fact('time', time),
					fact('destination', destination),
					fact('transport', transport),
					fact('item', item)
				]
			};
		},

		// destination + companion + activity
		() => {
			const character = pickOne(CHARACTERS);
			const destination = pickOne(DESTINATIONS);
			const companion = pickOne(COMPANIONS);
			const activity = pickOne(ACTIVITIES);
			return {
				text: `${character} pergi ke ${destination} bersama ${companion}. Di sana, mereka ${activity}.`,
				facts: [
					fact('character', character),
					fact('destination', destination),
					fact('companion', companion),
					fact('activity', activity)
				]
			};
		},

		// transport + destination + reason
		() => {
			const character = pickOne(CHARACTERS);
			const transport = pickOne(TRANSPORTS);
			const destination = pickOne(DESTINATIONS);
			const reason = pickOne(REASONS);
			return {
				text: `${character} naik ${transport} menuju ${destination}. Dia ingin ${reason}.`,
				facts: [
					fact('character', character),
					fact('transport', transport),
					fact('destination', destination),
					fact('reason', reason)
				]
			};
		},

		// time + item + destination + activity
		() => {
			const character = pickOne(CHARACTERS);
			const time = pickOne(TIMES);
			const item = pickOne(ITEMS);
			const destination = pickOne(DESTINATIONS);
			const activity = pickOne(ACTIVITIES);
			return {
				text: `${time}, ${character} membawa ${item} ke ${destination}. Di sana, ${character} ${activity}.`,
				facts: [
					fact('character', character),
					fact('time', time),
					fact('item', item),
					fact('destination', destination),
					fact('activity', activity)
				]
			};
		},

		// companion + transport + destination
		() => {
			const character = pickOne(CHARACTERS);
			const companion = pickOne(COMPANIONS);
			const transport = pickOne(TRANSPORTS);
			const destination = pickOne(DESTINATIONS);
			return {
				text: `${character} dan ${companion} pergi ke ${destination} naik ${transport}.`,
				facts: [
					fact('character', character),
					fact('companion', companion),
					fact('transport', transport),
					fact('destination', destination)
				]
			};
		},

		// destination + reason + activity
		() => {
			const character = pickOne(CHARACTERS);
			const destination = pickOne(DESTINATIONS);
			const reason = pickOne(REASONS);
			const activity = pickOne(ACTIVITIES);
			return {
				text: `${character} pergi ke ${destination} untuk ${reason}. Sesampainya di sana, ${character} ${activity}.`,
				facts: [
					fact('character', character),
					fact('destination', destination),
					fact('reason', reason),
					fact('activity', activity)
				]
			};
		},

		// item + destination + companion
		() => {
			const character = pickOne(CHARACTERS);
			const item = pickOne(ITEMS);
			const destination = pickOne(DESTINATIONS);
			const companion = pickOne(COMPANIONS);
			return {
				text: `${character} membawa ${item} ke ${destination}. Di sana, ${character} bertemu dengan ${companion}.`,
				facts: [
					fact('character', character),
					fact('item', item),
					fact('destination', destination),
					fact('companion', companion)
				]
			};
		}
	];

	// Longer, two-sentence stories that pack five or six facts to track.
	const hard: StoryTemplate[] = [
		() => {
			const character = pickOne(CHARACTERS);
			const time = pickOne(TIMES);
			const destination = pickOne(DESTINATIONS);
			const companion = pickOne(COMPANIONS);
			const transport = pickOne(TRANSPORTS);
			const item = pickOne(ITEMS);
			return {
				text: `${time}, ${character} pergi ke ${destination} bersama ${companion} naik ${transport}. Mereka membawa ${item}.`,
				facts: [
					fact('character', character),
					fact('time', time),
					fact('destination', destination),
					fact('companion', companion),
					fact('transport', transport),
					fact('item', item)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const destination = pickOne(DESTINATIONS);
			const companion = pickOne(COMPANIONS);
			const reason = pickOne(REASONS);
			const activity = pickOne(ACTIVITIES);
			return {
				text: `${character} pergi ke ${destination} bersama ${companion} untuk ${reason}. Di sana, mereka ${activity}.`,
				facts: [
					fact('character', character),
					fact('destination', destination),
					fact('companion', companion),
					fact('reason', reason),
					fact('activity', activity)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const transport = pickOne(TRANSPORTS);
			const destination = pickOne(DESTINATIONS);
			const reason = pickOne(REASONS);
			const item = pickOne(ITEMS);
			return {
				text: `${character} naik ${transport} menuju ${destination} untuk ${reason}. Dia membawa ${item}.`,
				facts: [
					fact('character', character),
					fact('transport', transport),
					fact('destination', destination),
					fact('reason', reason),
					fact('item', item)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const time = pickOne(TIMES);
			const item = pickOne(ITEMS);
			const destination = pickOne(DESTINATIONS);
			const companion = pickOne(COMPANIONS);
			const activity = pickOne(ACTIVITIES);
			return {
				text: `${time}, ${character} membawa ${item} ke ${destination} bersama ${companion}. Di sana, mereka ${activity}.`,
				facts: [
					fact('character', character),
					fact('time', time),
					fact('item', item),
					fact('destination', destination),
					fact('companion', companion),
					fact('activity', activity)
				]
			};
		},

		() => {
			const character = pickOne(CHARACTERS);
			const companion = pickOne(COMPANIONS);
			const transport = pickOne(TRANSPORTS);
			const destination = pickOne(DESTINATIONS);
			const reason = pickOne(REASONS);
			const activity = pickOne(ACTIVITIES);
			return {
				text: `${character} dan ${companion} naik ${transport} ke ${destination} untuk ${reason}. Sesampainya di sana, mereka ${activity}.`,
				facts: [
					fact('character', character),
					fact('companion', companion),
					fact('transport', transport),
					fact('destination', destination),
					fact('reason', reason),
					fact('activity', activity)
				]
			};
		}
	];

	return { easy, medium, hard };
}

const TEMPLATES_BY_LANGUAGE: Record<Language, Record<Difficulty, StoryTemplate[]>> = {
	id: buildIdTemplates(),
	en: buildEnTemplates()
};

export function pickStoryTemplate(difficulty: Difficulty, language: Language): StoryTemplate {
	return pickOne(TEMPLATES_BY_LANGUAGE[language][difficulty]);
}
