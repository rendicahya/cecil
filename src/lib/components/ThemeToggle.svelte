<script lang="ts">
	import { themeStore } from '$lib/stores/theme.svelte';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
</script>

<button
	type="button"
	onclick={() => themeStore.toggle()}
	class="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-stone-700 shadow-sm backdrop-blur transition hover:bg-white active:scale-95 dark:border-white/10 dark:bg-white/10 dark:text-stone-100 dark:hover:bg-white/20"
	aria-label={themeStore.current === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
	title={themeStore.current === 'dark' ? 'Mode terang' : 'Mode gelap'}
>
	{#if themeStore.current === 'dark'}
		<Sun class="h-5 w-5" />
	{:else}
		<Moon class="h-5 w-5" />
	{/if}
</button>
