<script>
	import { page } from '$app/stores';
	import { sidebar } from './state.svelte.js';

	let { href, icon, title } = $props();

	// Svelte 5: Derivamos si el ítem está activo comparando rutas
	let isActive = $derived($page.url.pathname === href);

	// Clases dinámicas para el estado activo e inactivo
	let baseClasses = 'flex items-center rounded-xl transition-all duration-200 group';
</script>

<a
	{href}
	class={baseClasses}
	class:w-full={sidebar.isOpen}
	class:w-14={!sidebar.isOpen}
	class:h-14={true}
	class:pr-3={sidebar.isOpen}
	style="
        background-color: {isActive ? 'var(--md-sys-color-secondary-container)' : 'transparent'};
        color: {isActive
		? 'var(--md-sys-color-on-secondary-container)'
		: 'var(--md-sys-color-on-surface-variant)'};
    "
	onmouseenter={(e) => {
		if (!isActive)
			e.currentTarget.style.backgroundColor = 'var(--md-sys-color-surface-container-high)';
	}}
	onmouseleave={(e) => {
		if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
	}}
>
	<div class="flex h-14 w-14 shrink-0 items-center justify-center transition-all">
		<span class="material-symbols-outlined" style="font-size: 24px;">
			{icon}
		</span>
	</div>

	{#if sidebar.isOpen}
		<span
			class="ml-2 truncate font-medium transition-opacity duration-200"
			class:opacity-100={sidebar.isOpen}
			class:opacity-0={!sidebar.isOpen}
		>
			{title}
		</span>
	{:else}
		<div
			class="absolute left-20 z-50 origin-left scale-0 rounded-md px-3 py-1.5 text-sm whitespace-nowrap shadow-xl transition-all group-hover:scale-100"
			style="background-color: var(--md-sys-color-inverse-surface); color: var(--md-sys-color-inverse-on-surface);"
		>
			{title}
		</div>
	{/if}
</a>
