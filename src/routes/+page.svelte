<script>
	import { Label, Select } from 'flowbite-svelte';
	import Card from './Card.svelte';

	const sizes = [
		{ value: 'vistaPrintStandard', name: 'Standard (85 x 55 mm)' },
		{ value: 'vistaPrintSquare', name: 'Square (65 x 65 mm)' }
	];
	let size = sizes[0].value;
</script>

<div class="flex flex-col gap-4 p-8">
	<div class="w-1/2">
		<Label>
			Select a size
			<Select class="mt-2" items={sizes} bind:value={size} />
		</Label>
	</div>
	<div class="flex flex-col">
		<Card title="Recto" {size} />
		<Card title="Verso" {size} />
	</div>
</div>
