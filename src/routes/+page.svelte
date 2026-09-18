<script lang="ts">
	import CardStack from '$lib/components/CardStack.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import FullscreenToggle from '$lib/components/FullscreenToggle.svelte';
</script>

<svelte:head>
	<title>Cecil — Cerita Kecil</title>
	<meta
		name="description"
		content="Cecil membantu anak berlatih mendengarkan dan memahami cerita pendek lewat kartu cerita yang bisa digeser."
	/>
</svelte:head>

<div
	class="min-h-dvh bg-gradient-to-b from-[#FFF8EC] to-[#FFEFDC] text-stone-800 dark:from-[#241f2e] dark:to-[#1a1622] dark:text-stone-100"
>
	<div class="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-5 sm:px-6 sm:py-7">
		<header class="flex items-center justify-between">
			<div>
				<h1 class="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
					Cecil <span class="opacity-40">·</span>
					<span class="font-semibold opacity-80">Cerita Kecil</span>
				</h1>
				<p class="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
					Bacakan ceritanya, lalu tanyakan pertanyaannya.
				</p>
			</div>
			<div class="flex items-center gap-2">
				<FullscreenToggle />
				<ThemeToggle />
			</div>
		</header>

		<main class="flex flex-1 items-center justify-center py-8">
			<CardStack />
		</main>
	</div>
</div>
