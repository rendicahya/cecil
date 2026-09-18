<script lang="ts">
	import type { StoryCardData } from '$lib/types';
	import { getPaletteEntry } from '$lib/palette';
	import BookOpenText from '@lucide/svelte/icons/book-open-text';
	import CircleHelp from '@lucide/svelte/icons/circle-help';

	let { card }: { card: StoryCardData } = $props();
	const palette = $derived(getPaletteEntry(card.color));
</script>

<article
	class="flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-black/5 bg-[var(--card-bg)] p-6 text-[var(--card-text)] shadow-[0_20px_45px_-14px_rgba(0,0,0,0.3)] sm:p-8 dark:border-white/10 dark:bg-[var(--card-bg-dark)] dark:text-[var(--card-text-dark)]"
	style="--card-bg: {palette.bg}; --card-bg-dark: {palette.bgDark}; --card-text: {palette.text}; --card-text-dark: {palette.textDark}; --card-accent: {palette.accent}; --card-accent-dark: {palette.accentDark};"
>
	<header class="mb-5 flex items-center gap-2.5">
		<span
			class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--card-accent)]/45 dark:bg-[var(--card-accent-dark)]/45"
		>
			<BookOpenText class="h-4.5 w-4.5" strokeWidth={2.25} />
		</span>
		<p
			class="font-display text-xs font-extrabold tracking-[0.22em] uppercase opacity-70 sm:text-sm"
		>
			Cerita Kecil
		</p>
	</header>

	<p class="flex-1 font-display text-xl leading-relaxed font-semibold text-balance sm:text-2xl">
		{card.story.text}
	</p>

	<div class="my-5 h-px w-full shrink-0 bg-[var(--card-text)]/15"></div>

	<section class="shrink-0">
		<div class="mb-3 flex items-center gap-2">
			<CircleHelp class="h-4 w-4 opacity-70" />
			<p class="font-display text-xs font-extrabold tracking-[0.18em] uppercase opacity-70">
				Pertanyaan
			</p>
		</div>
		<ol class="space-y-2">
			{#each card.questions as question, i (question.id)}
				<li class="flex gap-2 text-base leading-snug sm:text-lg">
					<span class="font-display font-bold opacity-60">{i + 1}.</span>
					<span>{question.text}</span>
				</li>
			{/each}
		</ol>
	</section>
</article>
