<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		label: string;
		value?: string | number;
		error?: string;
		icon?: string;
	}

	let {
		label,
		value = $bindable(''),
		error = '',
		icon,
		type = 'text',
		id = `input-${Math.random().toString(36).slice(2, 9)}`,
		placeholder = ' ', // Required for floating label logic
		disabled = false,
		class: className = '',
		...rest
	}: Props = $props();

	let focused = $state(false);
</script>

<div
	class="md3-text-field md3-text-field-outlined {className}"
	class:has-error={!!error}
	class:has-icon={!!icon}
	class:is-focused={focused}
	class:is-disabled={disabled}
>
	<div class="md3-text-field-container">
		{#if icon}
			<span class="md3-text-field-icon material-symbols-outlined">
				{icon}
			</span>
		{/if}

		<input
			{id}
			{type}
			{placeholder}
			{disabled}
			bind:value
			onfocus={() => (focused = true)}
			onblur={() => (focused = false)}
			{...rest}
		/>

		<label for={id}>
			{label}
		</label>

		<div class="md3-text-field-outline">
			<div class="outline-start"></div>
			<div class="outline-notch">
				<span class="notch-content">{label}</span>
			</div>
			<div class="outline-end"></div>
		</div>
	</div>

	{#if error}
		<span class="md3-text-field-error-text">{error}</span>
	{/if}
</div>

<style>
	.md3-text-field {
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

	.md3-text-field-container {
		position: relative;
		display: flex;
		align-items: center;
		height: 56px;
		border-radius: 4px;
		box-sizing: border-box;
	}

	input {
		flex: 1;
		height: 100%;
		border: none;
		background: transparent;
		padding: 16px;
		font-size: 16px;
		color: var(--on-surface);
		outline: none;
		z-index: 1;
	}

	.has-icon input {
		padding-left: 12px;
	}

	.md3-text-field-icon {
		padding: 0 12px 0 16px;
		color: var(--md-sys-color-on-surface-variant);
		user-select: none;
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

	.has-icon label {
		left: 52px;
	}

	/* Outline */
	.md3-text-field-outline {
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
	input:focus + label,
	input:not(:placeholder-shown) + label {
		top: 0;
		left: 16px;
		font-size: 12px;
		color: var(--field-color);
		z-index: 3;
	}

	input:focus ~ .md3-text-field-outline .notch-content,
	input:not(:placeholder-shown) ~ .md3-text-field-outline .notch-content {
		/* No changes needed here, visibility is enough */
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
	.has-error input:focus + label {
		color: var(--error-color);
	}

	.md3-text-field-error-text {
		color: var(--error-color);
		font-size: 12px;
		padding-left: 16px;
	}

	/* Disabled State */
	.is-disabled {
		opacity: 0.38;
	}

	input:disabled {
		cursor: not-allowed;
	}
</style>
