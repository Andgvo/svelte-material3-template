<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import TextField from '$lib/components/input/TextField.svelte';
	import Checkbox from '$lib/components/input/Checkbox.svelte';
	import RadioButton from '$lib/components/input/RadioButton.svelte';
	import Select from '$lib/components/input/Select.svelte';

	const buttonVariation = ['primary', 'secondary', 'tertiary'] as const;

	let textValue = $state('');
	let numberValue = $state(0);
	let checkboxValue = $state(false);
	let radioGroup = $state('option1');
	let selectValue = $state('');

	const options = [
		{ label: '', value: '' },
		{ label: 'Option 1', value: 'option1' },
		{ label: 'Option 2', value: 'option2' },
		{ label: 'Option 3', value: 'option3' }
	];
</script>

<!-- HTML -->
<div class="flex flex-col gap-12 p-8">
	<section>
		<h1 class="mb-6 text-2xl font-bold">Buttons</h1>
		<div class="flex flex-row flex-wrap gap-6 rounded-xl bg-surface-container p-4">
			{#each buttonVariation as variation (variation)}
				<div class="flex flex-col gap-4">
					<Button color={variation} icon="star">{variation}</Button>
					<Button color={variation} disabled icon="star">{variation}</Button>
					<Button variant="stroked" color={variation} icon="home">{variation}</Button>
					<Button variant="stroked" color={variation} disabled icon="home">{variation}</Button>
				</div>
			{/each}

			<div class="flex flex-col gap-4">
				<Button icon="delete" />
				<Button icon="search" disabled />
				<Button variant="stroked" icon="delete" />
				<Button variant="stroked" icon="search" disabled />
			</div>
		</div>
	</section>

	<section>
		<h1 class="mb-6 text-2xl font-bold">Text Fields & Selects</h1>
		<div
			class="grid grid-cols-1 gap-8 rounded-xl bg-surface-container p-4 md:grid-cols-2 lg:grid-cols-3"
		>
			<div class="flex flex-col gap-6">
				<TextField label="Full Name" bind:value={textValue} icon="person" />
				<TextField label="Full Name" bind:value={textValue} icon="person" disabled />
				<TextField
					label="Error State"
					value="Invalid input"
					error="This field is required"
					icon="error"
				/>
			</div>

			<div class="flex flex-col gap-6">
				<Select label="Choose an option" bind:value={selectValue} {options} />
				<Select label="Choose an option" bind:value={selectValue} {options} disabled />
				<Select label="Choose an option" bind:value={selectValue} {options} error="error" />
			</div>

			<!-- Calendar -->
			<div class="flex flex-col gap-6"></div>

			<div class="flex flex-col gap-6">
				<div class="rounded-lg border border-outline-variant p-4">
					<p class="mb-2 text-sm font-medium">Live Debug:</p>
					<p class="text-xs opacity-70">Text: {textValue}</p>
					<p class="text-xs opacity-70">Number: {numberValue}</p>
					<p class="text-xs opacity-70">Select: {selectValue}</p>
				</div>
			</div>
		</div>
		<div class="mt-4 flex justify-end gap-2">
			<Button variant="stroked">Cancelar</Button>
			<Button>Submit</Button>
		</div>
	</section>

	<section>
		<h1 class="mb-6 text-2xl font-bold">Selection Controls</h1>
		<div class="flex flex-row flex-wrap gap-12 rounded-xl bg-surface-container p-8">
			<div class="flex flex-col gap-4">
				<h3 class="text-sm font-bold tracking-wider uppercase opacity-50">Checkboxes</h3>
				<Checkbox label="Standard Checkbox" bind:checked={checkboxValue} />
				<Checkbox label="Alternative option" />
				<Checkbox label="Disabled Checkbox" disabled checked />
			</div>

			<div class="flex flex-col gap-4">
				<h3 class="text-sm font-bold tracking-wider uppercase opacity-50">Radio Buttons</h3>
				<RadioButton label="Option 1" value="option1" bind:group={radioGroup} />
				<RadioButton label="Option 2" value="option2" bind:group={radioGroup} />
				<RadioButton label="Option 3" value="option3" bind:group={radioGroup} />
				<RadioButton label="Disabled Radio" value="disabled" group="none" disabled />
			</div>

			<div class="flex flex-col gap-4">
				<h3 class="text-sm font-bold tracking-wider uppercase opacity-50">Debug</h3>
				<div class="min-w-[150px] rounded-lg border border-outline-variant p-4">
					<p class="text-xs opacity-70">Checked: {checkboxValue}</p>
					<p class="text-xs opacity-70">Radio: {radioGroup}</p>
				</div>
			</div>
		</div>
	</section>
</div>
