<script lang="ts">
	import { languageStore } from '$lib/stores/language.svelte';
	import { t } from '$lib/i18n';
	import type { Language } from '$lib/types';

	// Each language's own name is shown as-is, not translated into the active UI language.
	const OPTIONS: { value: Language; label: string }[] = [
		{ value: 'id', label: 'ID' },
		{ value: 'en', label: 'EN' }
	];
</script>

<div
	class="flex items-center gap-0.5 rounded-full border border-black/10 bg-white/70 p-1 text-sm shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10"
	role="radiogroup"
	aria-label={t('languageGroupLabel')}
>
	{#each OPTIONS as option (option.value)}
		{@const active = languageStore.current === option.value}
		<button
			type="button"
			role="radio"
			aria-checked={active}
			onclick={() => languageStore.set(option.value)}
			class="rounded-full px-3 py-1.5 font-semibold transition active:scale-95"
			class:bg-stone-800={active}
			class:text-white={active}
			class:dark:bg-white={active}
			class:dark:text-stone-900={active}
			class:text-stone-500={!active}
			class:hover:text-stone-800={!active}
			class:dark:text-stone-300={!active}
			class:dark:hover:text-white={!active}
		>
			{option.label}
		</button>
	{/each}
</div>
