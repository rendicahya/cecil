<script lang="ts">
	import { fullscreenStore } from '$lib/stores/fullscreen.svelte';
	import Maximize from '@lucide/svelte/icons/maximize-2';
	import Minimize from '@lucide/svelte/icons/minimize-2';
</script>

<button
	type="button"
	onclick={() => fullscreenStore.toggle()}
	class="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-stone-700 shadow-sm backdrop-blur transition hover:bg-white active:scale-95 dark:border-white/10 dark:bg-white/10 dark:text-stone-100 dark:hover:bg-white/20"
	aria-label={fullscreenStore.active ? 'Keluar dari layar penuh' : 'Layar penuh'}
	title={fullscreenStore.active ? 'Keluar dari layar penuh' : 'Layar penuh'}
>
	{#if fullscreenStore.active}
		<Minimize class="h-5 w-5" />
	{:else}
		<Maximize class="h-5 w-5" />
	{/if}
</button>
