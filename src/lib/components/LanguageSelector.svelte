<script lang="ts">
	import { languageStore } from '$lib/stores/language.svelte';
	import { t } from '$lib/i18n';

	function toggle() {
		languageStore.set(languageStore.current === 'id' ? 'en' : 'id');
	}
</script>

<button
	type="button"
	onclick={toggle}
	aria-label={languageStore.current === 'id' ? t('languageToEnAria') : t('languageToIdAria')}
	title={languageStore.current === 'id' ? t('languageToEnAria') : t('languageToIdAria')}
	class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-white/70 shadow-sm backdrop-blur transition hover:bg-white active:scale-95 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
>
	{#if languageStore.current === 'id'}
		<svg viewBox="0 0 30 20" class="h-6 w-6 rounded-full ring-1 ring-black/10" aria-hidden="true">
			<rect width="30" height="10" fill="#dc2626" />
			<rect y="10" width="30" height="10" fill="#ffffff" />
		</svg>
	{:else}
		<svg viewBox="0 0 30 20" class="h-6 w-6 rounded-full ring-1 ring-black/10" aria-hidden="true">
			<rect width="30" height="20" fill="#b22234" />
			<rect y="1.54" width="30" height="1.54" fill="#ffffff" />
			<rect y="4.62" width="30" height="1.54" fill="#ffffff" />
			<rect y="7.69" width="30" height="1.54" fill="#ffffff" />
			<rect y="10.77" width="30" height="1.54" fill="#ffffff" />
			<rect y="13.85" width="30" height="1.54" fill="#ffffff" />
			<rect y="16.92" width="30" height="1.54" fill="#ffffff" />
			<rect width="12" height="10.77" fill="#3c3b6e" />
		</svg>
	{/if}
</button>
