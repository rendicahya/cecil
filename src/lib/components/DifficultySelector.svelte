<script lang="ts">
	import { difficultyStore } from '$lib/stores/difficulty.svelte';
	import type { Difficulty } from '$lib/types';

	const OPTIONS: { value: Difficulty; label: string }[] = [
		{ value: 'easy', label: 'Mudah' },
		{ value: 'medium', label: 'Sedang' },
		{ value: 'hard', label: 'Sulit' }
	];
</script>

<div
	class="flex items-center gap-0.5 rounded-full border border-black/10 bg-white/70 p-1 text-sm shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10"
	role="radiogroup"
	aria-label="Tingkat kesulitan cerita"
>
	{#each OPTIONS as option (option.value)}
		{@const active = difficultyStore.current === option.value}
		<button
			type="button"
			role="radio"
			aria-checked={active}
			onclick={() => difficultyStore.set(option.value)}
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
