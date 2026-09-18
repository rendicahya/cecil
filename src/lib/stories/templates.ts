import type { Difficulty, GeneratedStory, StoryFact } from '../types';
import {
	ACTIVITIES,
	CHARACTERS,
	COMPANIONS,
	DESTINATIONS,
	ITEMS,
	pickOne,
	REASONS,
	TIMES,
	TRANSPORTS
} from './wordbank';

type StoryTemplate = () => GeneratedStory;

function fact(key: StoryFact['key'], value: string): StoryFact {
	return { key, value };
}

// Short, single-clause stories with only two or three facts to remember.
const EASY_TEMPLATES: StoryTemplate[] = [
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
const MEDIUM_TEMPLATES: StoryTemplate[] = [
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
const HARD_TEMPLATES: StoryTemplate[] = [
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

const TEMPLATES_BY_DIFFICULTY: Record<Difficulty, StoryTemplate[]> = {
	easy: EASY_TEMPLATES,
	medium: MEDIUM_TEMPLATES,
	hard: HARD_TEMPLATES
};

export function pickStoryTemplate(difficulty: Difficulty): StoryTemplate {
	return pickOne(TEMPLATES_BY_DIFFICULTY[difficulty]);
}
