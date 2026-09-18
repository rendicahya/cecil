<script lang="ts">
	import { languageStore } from '$lib/stores/language.svelte';
	import { t } from '$lib/i18n';
	import type { Language } from '$lib/types';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';

	// Each language's own name is shown as-is, not translated into the active UI language.
	const OPTIONS: { value: Language; label: string }[] = [
		{ value: 'id', label: 'ID' },
		{ value: 'en', label: 'EN' }
	];

	function onChange(event: Event) {
		languageStore.set((event.currentTarget as HTMLSelectElement).value as Language);
	}
</script>

<div class="relative flex items-center">
	<select
		value={languageStore.current}
		onchange={onChange}
		aria-label={t('languageGroupLabel')}
		class="appearance-none rounded-full border border-black/10 bg-white/70 py-1.5 pr-8 pl-3 text-sm font-semibold text-stone-700 shadow-sm backdrop-blur transition hover:bg-white active:scale-95 dark:border-white/10 dark:bg-white/10 dark:text-stone-100 dark:hover:bg-white/20"
	>
		{#each OPTIONS as option (option.value)}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
	<ChevronDown
		class="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-stone-500 dark:text-stone-300"
	/>
</div>
