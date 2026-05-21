<script lang="ts">
	interface Props {
		label?: string;
		value: string | number;
		group: string | number;
		disabled?: boolean;
		id?: string;
	}

	let {
		label,
		value,
		group = $bindable(),
		disabled = false,
		id = `radio-${Math.random().toString(36).slice(2, 9)}`
	}: Props = $props();
</script>

<label class="md3-radio-wrapper" class:is-disabled={disabled} for={id}>
	<div class="md3-radio-container">
		<input type="radio" {id} {value} {disabled} bind:group />
		<div class="md3-radio-outer">
			<div class="md3-radio-inner"></div>
		</div>
		<div class="md3-radio-state-layer"></div>
	</div>
	{#if label}
		<span class="md3-radio-label">{label}</span>
	{/if}
</label>

<style>
	.md3-radio-wrapper {
		--radio-color: var(--md-sys-color-primary);

		display: inline-flex;
		align-items: center;
		gap: 12px;
		cursor: pointer;
		user-select: none;
		padding: 8px;
		border-radius: 8px;
	}

	.md3-radio-container {
		position: relative;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	input {
		position: absolute;
		opacity: 0;
		width: 100%;
		height: 100%;
		cursor: inherit;
		z-index: 2;
	}

	.md3-radio-outer {
		width: 20px;
		height: 20px;
		border: 2px solid var(--md-sys-color-outline);
		border-radius: 50%;
		transition: 
			border-color 0.2s ease,
			transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	input:checked + .md3-radio-outer {
		border-color: var(--radio-color);
	}

	.md3-radio-inner {
		width: 0;
		height: 0;
		background-color: var(--radio-color);
		border-radius: 50%;
		transition: 
			width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			background-color 0.2s ease;
	}

	input:checked + .md3-radio-outer .md3-radio-inner {
		width: 10px;
		height: 10px;
	}

	.md3-radio-label {
		font-size: 14px;
		color: var(--md-sys-color-on-surface);
	}

	.md3-radio-state-layer {
		position: absolute;
		width: 40px;
		height: 40px;
		background-color: var(--radio-color);
		border-radius: 50%;
		opacity: 0;
		transition: opacity 0.2s;
		z-index: 1;
	}

	.md3-radio-wrapper:hover .md3-radio-state-layer {
		opacity: 0.08;
	}

	input:focus-visible ~ .md3-radio-state-layer {
		opacity: 0.12;
	}

	.md3-radio-wrapper:active:not(.is-disabled) .md3-radio-outer {
		transform: scaleX(1.15) scaleY(0.85);
	}

	.is-disabled {
		opacity: 0.38;
		cursor: not-allowed;
	}
</style>
