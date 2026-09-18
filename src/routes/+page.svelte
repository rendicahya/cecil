<script lang="ts">
	import CardStack from '$lib/components/CardStack.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import FullscreenToggle from '$lib/components/FullscreenToggle.svelte';
	import DifficultySelector from '$lib/components/DifficultySelector.svelte';
	import LanguageSelector from '$lib/components/LanguageSelector.svelte';
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>{t('pageTitle')}</title>
	<meta name="description" content={t('metaDescription')} />
</svelte:head>

<div
	class="min-h-dvh bg-gradient-to-b from-[#FFF8EC] to-[#FFEFDC] text-stone-800 dark:from-[#241f2e] dark:to-[#1a1622] dark:text-stone-100"
>
	<div class="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-5 sm:px-6 sm:py-7">
		<header class="flex flex-wrap items-center justify-between gap-3">
			<div>
				<h1 class="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
					Cecil <span class="opacity-40">·</span>
					<span class="font-semibold opacity-80">{t('brandTagline')}</span>
				</h1>
				<p class="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
					{t('subtitle')}
				</p>
			</div>
			<div class="flex items-center gap-2">
				<LanguageSelector />
				<DifficultySelector />
				<FullscreenToggle />
				<ThemeToggle />
			</div>
		</header>

		<main class="flex flex-1 items-center justify-center py-8">
			<CardStack />
		</main>
	</div>
</div>
