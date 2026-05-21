<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';

	interface Props extends HTMLSelectAttributes {
		label: string;
		value?: string | number;
		error?: string;
		options: { label: string; value: string | number }[];
		placeholder?: string;
	}

	let {
		label,
		value = $bindable(''),
		error = '',
		options = [],
		id = `select-${Math.random().toString(36).slice(2, 9)}`,
		disabled = false,
		placeholder = '',
		class: className = '',
		...rest
	}: Props = $props();

	let focused = $state(false);
	let isFloating = $derived(focused || (value !== '' && value !== undefined && value !== null));
	let container: HTMLElement | undefined = $state();

	$effect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (container && !container.contains(event.target as Node)) {
				const select = container.querySelector('select');
				if (select && document.activeElement === select) {
					select.blur();
				}
			}
		};

		window.addEventListener('click', handleClickOutside);
		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div
	bind:this={container}
	class="md3-select md3-select-outlined {className}"
	class:has-error={!!error}
	class:is-focused={focused}
	class:is-disabled={disabled}
	class:is-floating={isFloating}
>
	<div class="md3-select-container">
		<select
			{id}
			{disabled}
			bind:value={value}
			onfocus={() => (focused = true)}
			onblur={() => (focused = false)}
			{...rest}
		>
			<option value="" disabled selected hidden>{focused ? placeholder : ''}</option>
			{#each options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>

		<label for={id}>
			{label}
		</label>

		<span class="md3-select-arrow material-symbols-outlined"> arrow_drop_down </span>

		<div class="md3-select-outline">
			<div class="outline-start"></div>
			<div class="outline-notch">
				<span class="notch-content">{label}</span>
			</div>
			<div class="outline-end"></div>
		</div>
	</div>

	{#if error}
		<span class="md3-select-error-text">{error}</span>
	{/if}
</div>

<style>
	.md3-select {
		--field-color: var(--md-sys-color-primary);
		--on-surface: var(--md-sys-color-on-surface);
		--outline-color: var(--md-sys-color-outline);
		--error-color: var(--md-sys-color-error, #ba1a1a);

		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 100%;
		font-family: inherit;
	}

	.md3-select-container {
		position: relative;
		display: flex;
		align-items: center;
		height: 56px;
		border-radius: 4px;
		box-sizing: border-box;
	}

	select {
		flex: 1;
		height: 100%;
		border: none;
		background: transparent;
		padding: 16px;
		font-size: 16px;
		color: var(--on-surface);
		outline: none;
		appearance: none;
		cursor: pointer;
		z-index: 1;
	}

	.md3-select-arrow {
		position: absolute;
		right: 12px;
		color: var(--md-sys-color-on-surface-variant);
		pointer-events: none;
		z-index: 1;
	}

	/* Label */
	label {
		position: absolute;
		left: 16px;
		top: 50%;
		transform: translateY(-50%);
		color: var(--md-sys-color-on-surface-variant);
		font-size: 16px;
		transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
		pointer-events: none;
		z-index: 2;
		background-color: var(--md-sys-color-surface, var(--md-sys-color-background, #ffffff));
		padding: 0 4px;
		margin-left: -4px;
		border-radius: 2px;
	}

	/* Outline */
	.md3-select-outline {
		position: absolute;
		inset: 0;
		display: flex;
		pointer-events: none;
	}

	.outline-start,
	.outline-notch,
	.outline-end {
		border: 1px solid var(--outline-color);
		transition:
			border-color 0.2s,
			border-width 0.2s;
	}

	.outline-start {
		width: 12px;
		border-right: none;
		border-radius: 4px 0 0 4px;
	}

	.outline-notch {
		flex: 0 0 auto;
		border-left: none;
		border-right: none;
		padding: 0 4px;
		max-width: calc(100% - 32px);
	}

	.outline-end {
		flex: 1;
		border-left: none;
		border-radius: 0 4px 4px 0;
	}

	.notch-content {
		font-size: 12px;
		visibility: hidden;
		white-space: nowrap;
	}

	/* Floating logic */
	.is-floating label {
		top: 0;
		left: 16px;
		font-size: 12px;
		color: var(--field-color);
		z-index: 3;
	}

	.is-floating .outline-notch {
		border-top: none;
	}

	/* Focus state */
	.is-focused .outline-start,
	.is-focused .outline-notch,
	.is-focused .outline-end {
		border-color: var(--field-color);
		border-width: 2px;
	}

	/* Error State */
	.has-error .outline-start,
	.has-error .outline-notch,
	.has-error .outline-end {
		border-color: var(--error-color);
	}

	.has-error label,
	.is-floating.has-error label {
		color: var(--error-color);
	}

	.md3-select-error-text {
		color: var(--error-color);
		font-size: 12px;
		padding-left: 16px;
	}

	.is-disabled {
		opacity: 0.38;
	}

	select:disabled {
		cursor: not-allowed;
	}
</style>

