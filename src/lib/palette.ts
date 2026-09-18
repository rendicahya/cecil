import type { CardColorName } from './types';

interface PaletteEntry {
	name: CardColorName;
	label: string;
	bg: string;
	bgDark: string;
	text: string;
	textDark: string;
	accent: string;
	accentDark: string;
}

/**
 * Curated playful pastel palette. Each color ships a light-mode tint and a
 * deeper dark-mode tint of the *same hue*, per CLAUDE.md: dark mode should
 * not turn the cards grey/black, only adjust for contrast.
 */
export const PALETTE: PaletteEntry[] = [
	{
		name: 'cream',
		label: 'Krem',
		bg: '#FFF8E7',
		bgDark: '#3A3324',
		text: '#4A3F2E',
		textDark: '#F5EDDC',
		accent: '#E8CE8C',
		accentDark: '#6B5A34'
	},
	{
		name: 'peach',
		label: 'Persik',
		bg: '#FFE4D6',
		bgDark: '#4A2E22',
		text: '#7A3B24',
		textDark: '#FFD9C2',
		accent: '#F3A57F',
		accentDark: '#8A5138'
	},
	{
		name: 'yellow',
		label: 'Kuning',
		bg: '#FFF3B0',
		bgDark: '#4A3F10',
		text: '#6B5A12',
		textDark: '#FFEE9C',
		accent: '#EBD65C',
		accentDark: '#8A7620'
	},
	{
		name: 'mint',
		label: 'Mint',
		bg: '#D8F3E3',
		bgDark: '#1E3A2E',
		text: '#1F5C43',
		textDark: '#B6EBD0',
		accent: '#8FD9B3',
		accentDark: '#3E7A5D'
	},
	{
		name: 'sky',
		label: 'Biru Langit',
		bg: '#D6EAFB',
		bgDark: '#1D3350',
		text: '#1D4E7A',
		textDark: '#BEE0FC',
		accent: '#8CC2EF',
		accentDark: '#3E6690'
	},
	{
		name: 'lavender',
		label: 'Lavender',
		bg: '#E8E0FA',
		bgDark: '#322753',
		text: '#4A2F7A',
		textDark: '#D8C9F7',
		accent: '#C1AEF0',
		accentDark: '#6A54A0'
	},
	{
		name: 'pink',
		label: 'Merah Muda',
		bg: '#FDE0EC',
		bgDark: '#4A2436',
		text: '#7A2C4D',
		textDark: '#FBC8DE',
		accent: '#F3A8C6',
		accentDark: '#8A4C6C'
	}
];

const paletteByName = new Map(PALETTE.map((entry) => [entry.name, entry]));

export function getPaletteEntry(name: CardColorName): PaletteEntry {
	const entry = paletteByName.get(name);
	if (!entry) throw new Error(`Unknown card color: ${name}`);
	return entry;
}

/** Picks a random palette color, avoiding immediate repeats when possible. */
export function pickNextColor(previous: CardColorName | null): CardColorName {
	const candidates = previous ? PALETTE.filter((entry) => entry.name !== previous) : PALETTE;
	const pool = candidates.length > 0 ? candidates : PALETTE;
	return pool[Math.floor(Math.random() * pool.length)].name;
}
