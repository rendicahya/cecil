<script lang="ts">
	import { browser } from '$app/environment';
	import { CardDeck } from '$lib/stores/cardDeck.svelte';
	import type { StoryCardData } from '$lib/types';
	import StoryCard from './StoryCard.svelte';
	import { stableRotation } from '$lib/utils/hash';

	// Story/question generation must only happen in the browser, so the deck
	// is created on the client, never during prerendering.
	let deck: CardDeck | null = $state(browser ? new CardDeck() : null);

	const SWIPE_DISTANCE_THRESHOLD = 110;
	const SWIPE_VELOCITY_THRESHOLD = 0.55; // px/ms
	const EXIT_ANIMATION_MS = 320;
	const SNAP_BACK_MS = 320;
	const SETTLE_ANIMATION_MS = 220;

	let dragX = $state(0);
	let dragY = $state(0);
	let dragging = $state(false);
	let transitionMs = $state(0);
	let busy = $state(false);

	let pointerId: number | null = null;
	let startX = 0;
	let startY = 0;
	let lastX = 0;
	let lastT = 0;
	let velocity = 0;

	const visibleStack = $derived(
		deck
			? [deck.current, ...deck.upcoming].filter((c): c is StoryCardData => Boolean(c)).slice(0, 3)
			: []
	);

	const dragProgress = $derived(Math.min(1, Math.abs(dragX) / SWIPE_DISTANCE_THRESHOLD));
	const frontRotation = $derived(dragX / 18);

	function stackTransform(position: number, id: string): string {
		const baseY = position * 14;
		const baseScale = 1 - position * 0.045;
		const rotate = stableRotation(id, 2.5 + position * 1.5);

		if (position === 1) {
			const y = baseY - dragProgress * baseY;
			const scale = baseScale + dragProgress * (1 - baseScale);
			return `translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`;
		}
		return `translateY(${baseY}px) scale(${baseScale}) rotate(${rotate}deg)`;
	}

	function onPointerDown(event: PointerEvent) {
		if (busy || !deck) return;
		const target = event.currentTarget as HTMLElement;
		pointerId = event.pointerId;
		target.setPointerCapture(pointerId);
		startX = event.clientX;
		startY = event.clientY;
		lastX = event.clientX;
		lastT = performance.now();
		velocity = 0;
		dragging = true;
		transitionMs = 0;
	}

	function onPointerMove(event: PointerEvent) {
		if (!dragging || event.pointerId !== pointerId) return;
		dragX = event.clientX - startX;
		dragY = event.clientY - startY;
		const now = performance.now();
		const dt = now - lastT;
		if (dt > 0) {
			velocity = (event.clientX - lastX) / dt;
			lastX = event.clientX;
			lastT = now;
		}
	}

	function onPointerUp(event: PointerEvent) {
		if (!dragging || event.pointerId !== pointerId) return;
		dragging = false;
		pointerId = null;

		const farEnough = Math.abs(dragX) > SWIPE_DISTANCE_THRESHOLD;
		const fastEnough = Math.abs(velocity) > SWIPE_VELOCITY_THRESHOLD;

		if (farEnough || fastEnough) {
			commitSwipe(dragX < 0 ? 'left' : 'right');
		} else {
			snapBack();
		}
	}

	function snapBack() {
		transitionMs = SNAP_BACK_MS;
		dragX = 0;
		dragY = 0;
	}

	function commitSwipe(direction: 'left' | 'right') {
		if (busy || !deck) return;
		busy = true;
		transitionMs = EXIT_ANIMATION_MS;
		const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 800;
		const distance = viewportWidth * 1.15;
		dragX = direction === 'left' ? -distance : distance;
		dragY += 30;

		setTimeout(() => {
			deck?.next();
			transitionMs = SETTLE_ANIMATION_MS;
			dragX = 0;
			dragY = 0;
			busy = false;
		}, EXIT_ANIMATION_MS);
	}

	function goForward() {
		if (busy || !deck) return;
		commitSwipe('left');
	}

	function goBack() {
		if (busy || !deck?.canGoPrev) return;
		transitionMs = SETTLE_ANIMATION_MS;
		deck.prev();
	}

	function onKeydown(event: KeyboardEvent) {
		const target = event.target as HTMLElement | null;
		if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;

		if (event.key === 'ArrowRight') {
			event.preventDefault();
			goForward();
		} else if (event.key === 'ArrowLeft') {
			event.preventDefault();
			goBack();
		}
	}
</script>

<svelte:window onkeydown={onKeydown} />

<div class="flex flex-col items-center gap-5">
	<div class="relative mx-auto aspect-[3/4] w-full max-w-[420px]">
		{#if visibleStack.length === 0}
			<div
				class="absolute inset-0 flex animate-pulse items-center justify-center rounded-[28px] border border-black/5 bg-white/60 dark:border-white/10 dark:bg-white/5"
			>
				<p class="font-display text-sm font-semibold text-stone-400 dark:text-stone-500">
					Menyiapkan kartu cerita…
				</p>
			</div>
		{/if}
		{#each visibleStack as card, position (card.id)}
			{#if position === 0}
				<div
					class="absolute inset-0 touch-none rounded-[28px] select-none"
					class:cursor-grabbing={dragging}
					class:cursor-grab={!dragging}
					style="transform: translate({dragX}px, {dragY}px) rotate({frontRotation}deg); transition: {dragging
						? 'none'
						: `transform ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)`}; z-index: 30;"
					onpointerdown={onPointerDown}
					onpointermove={onPointerMove}
					onpointerup={onPointerUp}
					onpointercancel={onPointerUp}
					role="group"
					aria-roledescription="kartu cerita"
				>
					<StoryCard {card} />
				</div>
			{:else}
				<div
					class="pointer-events-none absolute inset-0 rounded-[28px]"
					style="transform: {stackTransform(
						position,
						card.id
					)}; transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1); z-index: {30 - position};"
					aria-hidden="true"
				>
					<StoryCard {card} />
				</div>
			{/if}
		{/each}
	</div>

	<p
		class="font-display text-xs font-semibold tracking-wide text-stone-500 select-none dark:text-stone-400"
	>
		Geser kartu, atau gunakan tombol panah di keyboard
	</p>
</div>
