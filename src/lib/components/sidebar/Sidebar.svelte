<script>
	import { sidebar } from './state.svelte.js';
	let { children } = $props();

	let widthClass = $derived(sidebar.isOpen ? 'w-64' : 'w-20');
</script>

<aside
	class="relative sticky top-0 flex h-screen flex-col transition-all duration-300 ease-in-out {widthClass}"
	style="background-color: var(--md-sys-color-surface-container-low); color: var(--md-sys-color-on-surface-variant);"
>
	<!-- Curva invertida arriba (flare) -->
	<div
		class="pointer-events-none absolute top-0 -right-[20px] h-[20px] w-[20px] transition-all duration-300"
		style="background: radial-gradient(circle at 100% 100%, transparent 20px, var(--md-sys-color-surface-container-low) 20.5px);"
	></div>

	<!-- Curva invertida abajo (flare) -->
	<div
		class="pointer-events-none absolute -right-[20px] bottom-0 h-[20px] w-[20px] transition-all duration-300"
		style="background: radial-gradient(circle at 100% 0%, transparent 20px, var(--md-sys-color-surface-container-low) 20.5px);"
	></div>
	<div
		class="flex h-16 items-center pt-3"
		class:justify-end={sidebar.isOpen}
		class:justify-center={!sidebar.isOpen}
	>
		<button
			onclick={() => sidebar.toggle()}
			class="mr-2 cursor-pointer rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
			style="color: var(--md-sys-color-on-surface-variant);"
			class:mr-2={sidebar.isOpen}
			class:mr-0={!sidebar.isOpen}
		>
			{#if sidebar.isOpen}
				<span class="material-symbols-outlined">chevron_left</span>
			{:else}
				<span class="material-symbols-outlined">chevron_right</span>
			{/if}
		</button>
	</div>

	<nav class="scrollbar-thin flex-1 space-y-2 overflow-y-auto p-3">
		{@render children()}
	</nav>
</aside>
