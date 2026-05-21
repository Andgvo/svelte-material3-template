<script lang="ts">
	interface Props {
		label?: string;
		checked?: boolean;
		disabled?: boolean;
		id?: string;
	}

	let {
		label,
		checked = $bindable(false),
		disabled = false,
		id = `checkbox-${Math.random().toString(36).slice(2, 9)}`,
	}: Props = $props();
</script>

<label class="md3-checkbox-wrapper" class:is-disabled={disabled} for={id}>
	<div class="md3-checkbox-container">
		<input
			type="checkbox"
			{id}
			{disabled}
			bind:checked={checked}
		/>
		<div class="md3-checkbox-box">
			<svg viewBox="0 0 24 24" class="md3-checkbox-icon">
				<path
					fill="none"
					stroke="currentColor"
					stroke-width="3"
					d="M4 12.6L8.8 17.4L20 6.2"
					stroke-dasharray="24"
					stroke-dashoffset={checked ? 0 : 24}
				/>
			</svg>
		</div>
		<div class="md3-checkbox-state-layer"></div>
	</div>
	{#if label}
		<span class="md3-checkbox-label">{label}</span>
	{/if}
</label>

<style>
	.md3-checkbox-wrapper {
		--check-color: var(--md-sys-color-primary);
		--on-check-color: var(--md-sys-color-on-primary);
		
		display: inline-flex;
		align-items: center;
		gap: 12px;
		cursor: pointer;
		user-select: none;
		padding: 8px;
		border-radius: 8px;
		transition: background-color 0.2s;
	}

	.md3-checkbox-container {
		position: relative;
		width: 18px;
		height: 18px;
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

	.md3-checkbox-box {
		width: 18px;
		height: 18px;
		border: 2px solid var(--md-sys-color-outline);
		border-radius: 2px;
		transition: 
			background-color 0.2s ease,
			border-color 0.2s ease,
			transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			border-radius 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	input:checked + .md3-checkbox-box {
		background-color: var(--check-color);
		border-color: var(--check-color);
	}

	.md3-checkbox-icon {
		width: 14px;
		height: 14px;
		color: var(--on-check-color);
		transition: stroke-dashoffset 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.md3-checkbox-label {
		font-size: 14px;
		color: var(--md-sys-color-on-surface);
	}

	/* State Layer (Ripple effect/Hover) */
	.md3-checkbox-state-layer {
		position: absolute;
		width: 40px;
		height: 40px;
		background-color: var(--check-color);
		border-radius: 50%;
		opacity: 0;
		transition: opacity 0.2s;
		z-index: 1;
	}

	.md3-checkbox-wrapper:hover .md3-checkbox-state-layer {
		opacity: 0.08;
	}

	input:focus-visible ~ .md3-checkbox-state-layer {
		opacity: 0.12;
	}

	.md3-checkbox-wrapper:active:not(.is-disabled) .md3-checkbox-box {
		transform: scaleX(1.15) scaleY(0.85);
		border-radius: 4px;
	}

	/* Disabled */
	.is-disabled {
		opacity: 0.38;
		cursor: not-allowed;
	}
</style>
