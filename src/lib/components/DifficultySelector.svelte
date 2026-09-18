<script lang="ts">
	import { difficultyStore } from '$lib/stores/difficulty.svelte';
	import { t, type TranslationKey } from '$lib/i18n';
	import type { Difficulty } from '$lib/types';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';

	const OPTIONS: { value: Difficulty; labelKey: TranslationKey }[] = [
		{ value: 'easy', labelKey: 'difficultyEasy' },
		{ value: 'medium', labelKey: 'difficultyMedium' },
		{ value: 'hard', labelKey: 'difficultyHard' }
	];

	function onChange(event: Event) {
		difficultyStore.set((event.currentTarget as HTMLSelectElement).value as Difficulty);
	}
</script>

<div class="relative flex items-center">
	<select
		value={difficultyStore.current}
		onchange={onChange}
		aria-label={t('difficultyGroupLabel')}
		class="appearance-none rounded-full border border-black/10 bg-white/70 py-1.5 pr-8 pl-3 text-sm font-semibold text-stone-700 shadow-sm backdrop-blur transition hover:bg-white active:scale-95 dark:border-white/10 dark:bg-white/10 dark:text-stone-100 dark:hover:bg-white/20"
	>
		{#each OPTIONS as option (option.value)}
			<option value={option.value}>{t(option.labelKey)}</option>
		{/each}
	</select>
	<ChevronDown
		class="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-stone-500 dark:text-stone-300"
	/>
</div>
