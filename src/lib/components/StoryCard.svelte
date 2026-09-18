<script lang="ts">
	import type { StoryCardData } from '$lib/types';
	import { getPaletteEntry } from '$lib/palette';
	import BookOpenText from '@lucide/svelte/icons/book-open-text';
	import CircleHelp from '@lucide/svelte/icons/circle-help';

	let { card }: { card: StoryCardData } = $props();
	const palette = $derived(getPaletteEntry(card.color));

	// Longer stories get a smaller size so they still fit the card; short
	// ones get to be big and inviting.
	const STORY_SIZE_BREAKPOINTS: [number, string][] = [
		[70, 'text-2xl sm:text-3xl'],
		[95, 'text-xl sm:text-2xl'],
		[120, 'text-lg sm:text-xl']
	];
	const STORY_SIZE_FALLBACK = 'text-base sm:text-lg';

	function storySizeClass(text: string): string {
		for (const [maxLength, sizeClass] of STORY_SIZE_BREAKPOINTS) {
			if (text.length <= maxLength) return sizeClass;
		}
		return STORY_SIZE_FALLBACK;
	}

	const storyClass = $derived(storySizeClass(card.story.text));
</script>

<article
	class="flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-black/5 bg-[var(--card-bg)] p-5 text-[var(--card-text)] shadow-[0_20px_45px_-14px_rgba(0,0,0,0.3)] sm:p-7 dark:border-white/10 dark:bg-[var(--card-bg-dark)] dark:text-[var(--card-text-dark)]"
	style="--card-bg: {palette.bg}; --card-bg-dark: {palette.bgDark}; --card-text: {palette.text}; --card-text-dark: {palette.textDark}; --card-accent: {palette.accent}; --card-accent-dark: {palette.accentDark};"
>
	<header class="mb-3 flex shrink-0 items-center gap-2 sm:mb-4">
		<span
			class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--card-accent)]/45 dark:bg-[var(--card-accent-dark)]/45"
		>
			<BookOpenText class="h-4 w-4" strokeWidth={2.25} />
		</span>
		<p class="font-display text-xs font-extrabold tracking-[0.2em] uppercase opacity-70">
			Cerita Kecil
		</p>
	</header>

	<div class="flex min-h-0 flex-1 items-center justify-center">
		<p class="font-display {storyClass} text-center leading-snug font-semibold text-balance">
			{card.story.text}
		</p>
	</div>

	<div class="my-3 h-px w-full shrink-0 bg-[var(--card-text)]/15 sm:my-4"></div>

	<section class="shrink-0">
		<div class="mb-2 flex items-center gap-2">
			<CircleHelp class="h-4 w-4 opacity-70" />
			<p class="font-display text-xs font-extrabold tracking-[0.16em] uppercase opacity-70">
				Pertanyaan
			</p>
		</div>
		<ol class="space-y-1.5">
			{#each card.questions as question, i (question.id)}
				<li class="flex gap-2 text-sm leading-snug sm:text-base">
					<span class="font-display font-bold opacity-60">{i + 1}.</span>
					<span>{question.text}</span>
				</li>
			{/each}
		</ol>
	</section>
</article>
