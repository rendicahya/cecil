export type CardColorName = 'cream' | 'peach' | 'yellow' | 'mint' | 'sky' | 'lavender' | 'pink';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Language = 'id' | 'en';

export type StoryFactKey =
	'character' | 'companion' | 'destination' | 'transport' | 'item' | 'activity' | 'reason' | 'time';

export interface StoryFact {
	key: StoryFactKey;
	/** The fragment of text as it literally appears in the story. */
	value: string;
}

export interface GeneratedStory {
	text: string;
	facts: StoryFact[];
}

export interface StoryQuestion {
	id: string;
	text: string;
}

export interface StoryCardData {
	id: string;
	color: CardColorName;
	story: GeneratedStory;
	questions: StoryQuestion[];
}
