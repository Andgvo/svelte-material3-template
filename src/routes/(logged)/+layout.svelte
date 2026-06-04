<script lang="ts">
	import '$lib/assets//layout.css';
	import favicon from '$lib/assets/favicon.svg';

	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import SidebarItem from '$lib/components/sidebar/SidebarItem.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen">
	<Sidebar>
		<SidebarItem href="/home" icon="home" title="Inicio" />
		<SidebarItem href="/cards" icon="group" title="Cards" />
	</Sidebar>

	<main class="p-8 flex-1 mt-16 md:mt-0">
		{@render children()}
	</main>
</div>