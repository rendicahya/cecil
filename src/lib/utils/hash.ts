function hashString(str: string): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash |= 0;
	}
	return Math.abs(hash);
}

/** Deterministic pseudo-random rotation (in degrees) derived from an id, so a
 * card's tilt in the stack stays stable across re-renders instead of jittering. */
export function stableRotation(id: string, max: number): number {
	const h = hashString(id);
	return ((h % 1000) / 1000) * max * 2 - max;
}
