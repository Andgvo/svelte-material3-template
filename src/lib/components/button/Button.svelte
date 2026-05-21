<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		variant?: 'stroked' | 'flat';
		color?: 'primary' | 'secondary' | 'tertiary';
		icon?: string;
		children?: Snippet;
	}

	let {
		variant = 'flat',
		color = 'primary',
		icon,
		children,
		disabled = false,
		class: className = '',
		...rest
	}: Props = $props();

	// Determine if it's an icon-only button
	const isIconOnly = $derived(!children && icon);
</script>

<button
	class="md3-btn md3-btn-{variant} md3-btn-color-{color} {className}"
	class:md3-btn-icon-only={isIconOnly}
	{disabled}
	{...rest}
>
	{#if icon}
		<span class="md3-btn-icon material-symbols-outlined">
			{icon}
		</span>
	{/if}
	
	{#if children}
		<span class="md3-btn-label">
			{@render children()}
		</span>
	{/if}
</button>

<style>
	.md3-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		vertical-align: middle;
		gap: 8px;
		height: 40px;
		padding: 0 24px;
		border-radius: 20px; /* Pill shape */
		font-family: inherit;
		font-size: 14px;
		font-weight: 500;
		line-height: normal;
		letter-spacing: 0.1px;
		cursor: pointer;
		transition: 
			transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			box-shadow 0.2s ease,
			background-color 0.2s ease;
		border: none;
		background: transparent;
		box-sizing: border-box;
		text-decoration: none;
		user-select: none;
		position: relative;
		overflow: hidden;
		z-index: 0;
	}

	/* M3 Interaction State Layer */
	.md3-btn::before {
		content: "";
		position: absolute;
		inset: 0;
		background-color: currentColor;
		opacity: 0;
		transition: opacity 0.2s linear;
		z-index: -1;
	}

	.md3-btn:hover:not(:disabled)::before {
		opacity: 0.08; /* Hover state layer */
	}

	.md3-btn:active:not(:disabled)::before {
		opacity: 0.12; /* Pressed state layer */
	}

	/* Adjust padding when icon is present beside text */
	.md3-btn:has(.md3-btn-icon):not(.md3-btn-icon-only) {
		padding-left: 16px;
	}

	.md3-btn-icon-only {
		width: 40px;
		padding: 0;
	}

	.md3-btn:active:not(:disabled) {
		border-radius: 12px; /* Morph to rounded square on press */
		transform: scaleX(1.08) scaleY(0.96); /* Expand horizontally, slightly squash vertically */
	}

	.md3-btn:disabled {
		cursor: not-allowed;
		pointer-events: none;
		opacity: 0.38;
	}

	.md3-btn-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
	}

	/* Global override for Material Symbols inside buttons */
	.md3-btn-icon :global(.material-symbols-outlined) {
		font-size: 24px;
	}

	.md3-btn-label {
		display: inline-flex;
		align-items: center;
		line-height: 1;
	}

	/* === Stroked Variant === */
	.md3-btn-stroked {
		border: 1px solid var(--md-sys-color-outline);
	}

	.md3-btn-stroked.md3-btn-color-primary {
		color: var(--md-sys-color-primary);
	}

	.md3-btn-stroked.md3-btn-color-secondary {
		color: var(--md-sys-color-secondary);
	}

	.md3-btn-stroked.md3-btn-color-tertiary {
		color: var(--md-sys-color-tertiary);
	}

	.md3-btn-stroked:disabled {
		border-color: var(--md-sys-color-on-surface);
		color: var(--md-sys-color-on-surface);
	}

	/* === Flat Variant === */
	.md3-btn-flat {
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
	}
	
	.md3-btn-flat:hover:not(:disabled) {
		box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.15),
					0 1px 2px 0 rgba(0, 0, 0, 0.3);
	}

	.md3-btn-flat.md3-btn-color-primary {
		background-color: var(--md-sys-color-primary);
		color: var(--md-sys-color-on-primary);
	}

	.md3-btn-flat.md3-btn-color-secondary {
		background-color: var(--md-sys-color-secondary);
		color: var(--md-sys-color-on-secondary);
	}
	
	.md3-btn-flat.md3-btn-color-tertiary {
		background-color: var(--md-sys-color-tertiary);
		color: var(--md-sys-color-on-tertiary);
	}

	.md3-btn-flat:active:not(:disabled) {
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
	}

	.md3-btn-flat:disabled {
		background-color: var(--md-sys-color-surface-variant);
		color: var(--md-sys-color-on-surface);
		box-shadow: none;
	}
</style>

