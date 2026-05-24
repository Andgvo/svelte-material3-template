<script>
	import { sidebar } from './state.svelte.js';
	import { settings } from '$lib/state/settings.svelte.js';
	import { onMount } from 'svelte';

	let { children } = $props();

	let widthClass = $derived(sidebar.isOpen ? 'w-64' : 'w-20');

	let menuOpen = $state(false);
	let containerEl = $state();
	let currentLang = $state('Español');

	function handleToggleLocale() {
		currentLang = currentLang === 'Español' ? 'English' : 'Español';
	}

	function handleToggleTheme() {
		settings.toggleTheme();
	}

	async function handleSignOut() {
		menuOpen = false;
		await settings.signOut();
	}

	/**
	 * @param {MouseEvent} e
	 */
	function handleClickOutside(e) {
		if (menuOpen && containerEl && e.target instanceof Node && !containerEl.contains(e.target)) {
			menuOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<aside
	class="sticky top-0 z-40 flex h-screen flex-col transition-all duration-300 ease-in-out {widthClass}"
	style="background-color: var(--md-sys-color-surface-container-low); color: var(--md-sys-color-on-surface-variant);"
>
		<!-- Curva invertida arriba (flare) -->
	<div
		class="pointer-events-none absolute top-0 -right-[20px] h-[20px] w-[20px] transition-all duration-300"
		class:opacity-0={sidebar.isOpen}
		class:opacity-100={!sidebar.isOpen}
		style="background: radial-gradient(circle at 100% 100%, transparent 20px, var(--md-sys-color-surface-container-low) 20.5px);"
	>
	</div>

	<!-- Curva invertida abajo (flare) -->
	<div
		class="pointer-events-none absolute -right-[20px] bottom-0 h-[20px] w-[20px] transition-all duration-300"
		class:opacity-0={sidebar.isOpen}
		class:opacity-100={!sidebar.isOpen}
		style="background: radial-gradient(circle at 100% 0%, transparent 20px, var(--md-sys-color-surface-container-low) 20.5px);"
	>
	</div>

	<!-- Flat vertical line when closed -->
	<div
		class="pointer-events-none absolute top-0 right-0 bottom-0 w-[2px] bg-[var(--md-sys-color-surface-container-low)] transition-all duration-300"
		class:opacity-0={!sidebar.isOpen}
		class:opacity-100={sidebar.isOpen}
	>
	</div>
	<div class="flex h-16 items-center justify-end pt-3">
		<button
			onclick={() => sidebar.toggle()}
			class="cursor-pointer rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-black/5 dark:hover:bg-white/5"
			style="color: var(--md-sys-color-on-surface-variant);"
			class:mr-2={sidebar.isOpen}
			class:mr-5={!sidebar.isOpen}
		>
			<div class="relative flex h-6 w-6 items-center justify-center">
				<span
					class="material-symbols-outlined absolute transition-all duration-200"
					class:opacity-0={sidebar.isOpen}
					class:scale-50={sidebar.isOpen}
					class:opacity-100={!sidebar.isOpen}
					class:scale-100={!sidebar.isOpen}
				>
					menu
				</span>
				<span
					class="material-symbols-outlined absolute transition-all duration-200"
					class:opacity-100={sidebar.isOpen}
					class:scale-100={sidebar.isOpen}
					class:opacity-0={!sidebar.isOpen}
					class:scale-50={!sidebar.isOpen}
				>
					menu_open
				</span>
			</div>
		</button>
	</div>

	<nav class="scrollbar-thin flex-1 space-y-2 overflow-y-auto p-3">
		{@render children()}
	</nav>

	<!-- Footer de Cuenta -->
	<div class="p-3 relative flex flex-col items-center" bind:this={containerEl}>
		<!-- Botón / Tarjeta del Usuario -->
		<button
			onclick={() => menuOpen = !menuOpen}
			class="flex items-center w-full rounded-xl transition-all duration-200 p-2 cursor-pointer text-left select-none relative group"
			class:justify-center={!sidebar.isOpen}
			style="
				background-color: {menuOpen ? 'var(--md-sys-color-surface-container-high)' : 'transparent'};
				color: var(--md-sys-color-on-surface-variant);
			"
			onmouseenter={(e) => {
				if (!menuOpen) e.currentTarget.style.backgroundColor = 'var(--md-sys-color-surface-container-high)';
			}}
			onmouseleave={(e) => {
				if (!menuOpen) e.currentTarget.style.backgroundColor = 'transparent';
			}}
		>
			<!-- Avatar / Iniciales -->
			<div 
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300"
				style="
					background-color: var(--md-sys-color-primary-container);
					color: var(--md-sys-color-on-primary-container);
				"
			>
				AL
			</div>

			{#if sidebar.isOpen}
				<div class="ml-3 flex flex-col flex-1 truncate transition-opacity duration-200">
					<span class="text-sm font-semibold truncate" style="color: var(--md-sys-color-on-surface);">
						Andrés López
					</span>
					<span class="text-xs truncate opacity-70" style="color: var(--md-sys-color-on-surface-variant);">
						andres@example.com
					</span>
				</div>
				<!-- Icono de desplegable -->
				<span class="material-symbols-outlined shrink-0 text-sm ml-1 opacity-70">
					{menuOpen ? 'expand_less' : 'expand_more'}
				</span>
			{:else}
				<!-- Tooltip cuando está colapsado -->
				<div
					class="absolute left-20 z-50 origin-left scale-0 rounded-md px-3 py-1.5 text-sm whitespace-nowrap shadow-xl transition-all group-hover:scale-100"
					style="background-color: var(--md-sys-color-inverse-surface); color: var(--md-sys-color-inverse-on-surface);"
				>
					Andrés López
				</div>
			{/if}
		</button>

		<!-- Menú Desplegable flotante -->
		{#if menuOpen}
			<div
				class="absolute z-50 rounded-2xl p-2 border transition-all duration-200"
				style="
					background-color: var(--md-sys-color-surface-container-highest);
					border-color: var(--md-sys-color-outline-variant);
					color: var(--md-sys-color-on-surface);
					box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.25);
					opacity: 1 !important;
					{sidebar.isOpen 
						? 'bottom: calc(100% + 8px); left: 12px; right: 12px;' 
						: 'bottom: 12px; left: calc(100% + 8px); width: 220px;'}
				"
			>
				<!-- Opción: Cambiar Idioma -->
				<button
					onclick={handleToggleLocale}
					class="flex w-full items-center gap-3 rounded-xl p-2.5 text-sm text-left hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
				>
					<span class="material-symbols-outlined text-lg" style="color: var(--md-sys-color-primary);">
						translate
					</span>
					<span class="truncate flex-1 font-medium">
						Idioma: {currentLang}
					</span>
				</button>

				<!-- Opción: Cambiar Tema -->
				<button
					onclick={handleToggleTheme}
					class="flex w-full items-center gap-3 rounded-xl p-2.5 text-sm text-left hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
				>
					<span class="material-symbols-outlined text-lg" style="color: var(--md-sys-color-primary);">
						{settings.theme === 'dark' ? 'light_mode' : 'dark_mode'}
					</span>
					<span class="truncate flex-1 font-medium">
						{settings.theme === 'dark' ? 'Tema: Claro' : 'Tema: Oscuro'}
					</span>
				</button>

				<!-- Separador -->
				<div class="h-[1px] my-1 opacity-20" style="background-color: var(--md-sys-color-outline-variant);"></div>

				<!-- Opción: Cerrar Sesión -->
				<button
					onclick={handleSignOut}
					class="flex w-full items-center gap-3 rounded-xl p-2.5 text-sm text-left hover:bg-red-500/10 text-red-500 cursor-pointer transition-colors"
					style="color: var(--md-sys-color-error);"
				>
					<span class="material-symbols-outlined text-lg">
						logout
					</span>
					<span class="truncate flex-1 font-semibold">
						Cerrar sesión
					</span>
				</button>
			</div>
		{/if}
	</div>
</aside>
