import type { GeneratedStory, StoryFact } from '../types';
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

const templates: StoryTemplate[] = [
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

export function pickStoryTemplate(): StoryTemplate {
	return pickOne(templates);
}
