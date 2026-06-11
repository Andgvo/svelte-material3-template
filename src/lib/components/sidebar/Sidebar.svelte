<script lang="ts">
	import { sidebar } from './state.svelte.js';
	import { settings } from '$lib/state/settings.svelte.js';
	import { onMount } from 'svelte';

	// Svelte 5: 'children' para los enlaces y 'mainContent' para la vista activa
	let { children, mainContent } = $props();

	let menuOpen = $state(false);
	let containerEl = $state();
	let currentLang = $state('Español');

	// ── Control de Estados de la Transición ───────────────────────────────
	let isMobile = $state(false);
	/** 'desktop' | 'mobile' | 'to-mobile' | 'to-desktop' */
	let layoutState = $state('desktop');
	let transitionSidebarWidth = $state('80px');
	let transitionTimer = $state(/** @type {ReturnType<typeof setTimeout> | null} */ (null));
	let isTransitioning = $derived(layoutState === 'to-mobile' || layoutState === 'to-desktop');

	// ── Control de Ancho (NUEVO: Se adapta a w-full en Móvil) ──────────────
	let sidebarWidthClass = $derived(
		isMobile ? (sidebar.isOpen ? 'w-full' : 'w-0') : sidebar.isOpen ? 'w-64' : 'w-20'
	);

	// ── Control de Esquinas Redondeadas ───────────────────────────────────
	let showCorners = $derived(!sidebar.isOpen && layoutState === 'desktop' && !isTransitioning);

	// Ajuste automático de márgenes para el contenido de la aplicación
	let mainContentClass = $derived(
		layoutState === 'desktop' || layoutState === 'to-desktop'
			? sidebar.isOpen
				? 'md:pl-64'
				: 'md:pl-20'
			: 'pt-16'
	);

	function handleBreakpointChange(isDesktop) {
		if (transitionTimer) clearTimeout(transitionTimer);

		// Auto-cierra el sidebar al redimensionar la ventana para garantizar
		// que las animaciones de morphing siempre se ejecuten limpiamente.
		if (sidebar.isOpen) sidebar.toggle();

		transitionSidebarWidth = '80px';

		if (!isDesktop) {
			layoutState = 'to-mobile';
			transitionTimer = setTimeout(() => {
				isMobile = true;
				layoutState = 'mobile';
			}, 400);
		} else {
			layoutState = 'to-desktop';
			transitionTimer = setTimeout(() => {
				isMobile = false;
				layoutState = 'desktop';
			}, 400);
		}
	}
	// ─────────────────────────────────────────────────────────────────────

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

	function handleClickOutside(e) {
		if (menuOpen && containerEl && e.target instanceof Node && !containerEl.contains(e.target)) {
			menuOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);

		const mq = window.matchMedia('(min-width: 768px)');
		isMobile = !mq.matches;
		layoutState = mq.matches ? 'desktop' : 'mobile';

		function onBreakpointChange(e) {
			handleBreakpointChange(e.matches);
		}
		mq.addEventListener('change', onBreakpointChange);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			mq.removeEventListener('change', onBreakpointChange);
			if (transitionTimer) clearTimeout(transitionTimer);
		};
	});
</script>

<div
	class="fixed top-0 left-0 z-50 flex h-16 w-20 items-center justify-center transition-transform duration-300 ease-in-out"
	class:translate-x-[calc(100vw-5rem)]={isMobile && sidebar.isOpen}
>
	<button
		onclick={() => sidebar.toggle()}
		class="cursor-pointer rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-black/5 dark:hover:bg-white/5"
		style="color: var(--md-sys-color-on-surface-variant);"
		aria-label="Toggle Sidebar"
	>
		<span class="material-symbols-outlined flex items-center justify-center">
			{isMobile && sidebar.isOpen ? 'close' : 'menu'}
		</span>
	</button>
</div>

<aside
	class="fixed top-0 left-0 z-40 flex h-screen flex-col transition-all duration-300 ease-in-out {sidebarWidthClass}"
	class:overflow-hidden={layoutState !== 'desktop' || isTransitioning}
	class:pointer-events-none={isMobile && !sidebar.isOpen}
	class:animate-aside-to-mobile={layoutState === 'to-mobile'}
	class:animate-aside-to-desktop={layoutState === 'to-desktop'}
	style="background-color: var(--md-sys-color-surface-container-low); color: var(--md-sys-color-on-surface-variant); --morph-w: {transitionSidebarWidth};"
>
	<div
		class="pointer-events-none absolute top-0 left-full h-[20px] overflow-hidden transition-[width] duration-150 ease-out"
		style="width: {showCorners ? '20px' : '0px'}; transition-delay: {showCorners
			? '300ms'
			: '0ms'};"
	>
		<div
			class="h-[20px] w-[20px]"
			style="background: radial-gradient(circle at 100% 100%, transparent 20px, var(--md-sys-color-surface-container-low) 20.5px);"
		></div>
	</div>

	<div
		class="pointer-events-none absolute bottom-0 left-full h-[20px] overflow-hidden transition-[width] duration-150 ease-out"
		style="width: {showCorners ? '20px' : '0px'}; transition-delay: {showCorners
			? '300ms'
			: '0ms'};"
	>
		<div
			class="h-[20px] w-[20px]"
			style="background: radial-gradient(circle at 100% 0%, transparent 20px, var(--md-sys-color-surface-container-low) 20.5px);"
		></div>
	</div>

	<div
		class="flex h-full w-full flex-col transition-opacity duration-300"
		class:opacity-0={isTransitioning || (isMobile && !sidebar.isOpen)}
	>
		<div
			class="pointer-events-none absolute top-0 right-0 bottom-0 w-[2px] bg-[var(--md-sys-color-surface-container-low)] transition-all duration-300"
			class:opacity-0={!sidebar.isOpen}
			class:opacity-100={sidebar.isOpen}
		></div>

		<div class="h-16 shrink-0"></div>

		<nav class="scrollbar-thin flex-1 space-y-2 overflow-y-auto p-3">
			{@render children()}
		</nav>

		<div class="relative flex flex-col items-center p-3" bind:this={containerEl}>
			<button
				onclick={() => (menuOpen = !menuOpen)}
				class="group relative flex w-full cursor-pointer items-center rounded-xl p-2 text-left transition-all duration-200 select-none"
				style="
					background-color: {menuOpen ? 'var(--md-sys-color-surface-container-high)' : 'transparent'};
					color: var(--md-sys-color-on-surface-variant);
				"
				onmouseenter={(e) => {
					if (!menuOpen)
						e.currentTarget.style.backgroundColor = 'var(--md-sys-color-surface-container-high)';
				}}
				onmouseleave={(e) => {
					if (!menuOpen) e.currentTarget.style.backgroundColor = 'transparent';
				}}
			>
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
					<div class="ml-3 flex flex-1 flex-col truncate transition-opacity duration-200">
						<span
							class="truncate text-sm font-semibold"
							style="color: var(--md-sys-color-on-surface);"
						>
							Andrés López
						</span>
						<span
							class="truncate text-xs opacity-70"
							style="color: var(--md-sys-color-on-surface-variant);"
						>
							andres@example.com
						</span>
					</div>
					<span class="material-symbols-outlined ml-1 shrink-0 text-sm opacity-70">
						{menuOpen ? 'expand_less' : 'expand_more'}
					</span>
				{:else}
					<div
						class="absolute left-20 z-50 origin-left scale-0 rounded-md px-3 py-1.5 text-sm whitespace-nowrap shadow-xl transition-all group-hover:scale-100"
						style="background-color: var(--md-sys-color-inverse-surface); color: var(--md-sys-color-inverse-on-surface);"
					>
						Andrés López
					</div>
				{/if}
			</button>

			{#if menuOpen}
				<div
					class="absolute z-50 rounded-2xl border p-2 transition-all duration-200"
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
					<button
						onclick={handleToggleLocale}
						class="flex w-full cursor-pointer items-center gap-3 rounded-xl p-2.5 text-left text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5"
					>
						<span
							class="material-symbols-outlined text-lg"
							style="color: var(--md-sys-color-primary);"
						>
							translate
						</span>
						<span class="flex-1 truncate font-medium">Idioma: {currentLang}</span>
					</button>

					<button
						onclick={handleToggleTheme}
						class="flex w-full cursor-pointer items-center gap-3 rounded-xl p-2.5 text-left text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5"
					>
						<span
							class="material-symbols-outlined text-lg"
							style="color: var(--md-sys-color-primary);"
						>
							{settings.theme === 'dark' ? 'light_mode' : 'dark_mode'}
						</span>
						<span class="flex-1 truncate font-medium">
							{settings.theme === 'dark' ? 'Tema: Claro' : 'Tema: Oscuro'}
						</span>
					</button>

					<div
						class="my-1 h-[1px] opacity-20"
						style="background-color: var(--md-sys-color-outline-variant);"
					></div>

					<button
						onclick={handleSignOut}
						class="flex w-full cursor-pointer items-center gap-3 rounded-xl p-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-500/10"
						style="color: var(--md-sys-color-error);"
					>
						<span class="material-symbols-outlined text-lg"> logout </span>
						<span class="flex-1 truncate font-semibold"> Cerrar sesión </span>
					</button>
				</div>
			{/if}
		</div>
	</div>
</aside>

<div
	class="fixed top-0 left-0 z-40 h-16 items-center gap-2 pr-4 pl-20 transition-transform duration-300 ease-in-out
	{layoutState === 'mobile' || isTransitioning ? 'flex' : 'hidden'}
	{layoutState === 'mobile' ? 'w-full' : ''}"
	class:translate-x-full={isMobile && sidebar.isOpen}
	class:animate-topbar-to-mobile={layoutState === 'to-mobile'}
	class:animate-topbar-to-desktop={layoutState === 'to-desktop'}
	style="background-color: var(--md-sys-color-surface-container-low); color: var(--md-sys-color-on-surface-variant); --morph-w: {transitionSidebarWidth};"
>
	<span
		class="text-lg font-semibold transition-opacity duration-300"
		class:opacity-0={layoutState !== 'mobile'}
		style="color: var(--md-sys-color-on-surface);"
	>
		Svelte Material
	</span>
</div>

<main class="min-h-screen transition-all duration-300 ease-in-out {mainContentClass}">
	{#if mainContent}
		{@render mainContent()}
	{/if}
</main>

<style>
	/* ─────────────────────────────────────────────────────────────────
	   ANIMACIONES DE ALTO Y ANCHO (Morph Transitions)
	   ───────────────────────────────────────────────────────────────── */
	.animate-aside-to-mobile {
		animation: asideToMobile 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}
	.animate-aside-to-desktop {
		animation: asideToDesktop 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}
	.animate-topbar-to-mobile {
		animation: topbarToMobile 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}
	.animate-topbar-to-desktop {
		animation: topbarToDesktop 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	@keyframes asideToMobile {
		from {
			height: 100vh;
		}
		to {
			height: 4rem;
		}
	}
	@keyframes asideToDesktop {
		from {
			height: 4rem;
		}
		to {
			height: 100vh;
		}
	}
	@keyframes topbarToMobile {
		from {
			width: var(--morph-w);
		}
		to {
			width: 100vw;
		}
	}
	@keyframes topbarToDesktop {
		from {
			width: 100vw;
		}
		to {
			width: var(--morph-w);
		}
	}
</style>
