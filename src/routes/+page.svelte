<script>
	import { Label, Select } from 'flowbite-svelte';
	import Card from './Card.svelte';
	import Button from '$lib/components/Button.svelte';

	const sizes = [
		{ value: 'vistaPrintStandard', name: 'Standard (85 x 55 mm)' },
		{ value: 'vistaPrintSquare', name: 'Square (65 x 65 mm)' }
	];

	let size = sizes[0].value;
	let recto;
	let verso;
	let downloading = false;

	const onDownload = async () => {
		downloading = true;
		await recto.download();
		await verso.download();
		downloading = false;
	};
</script>

<div class="flex flex-col gap-4 p-8">
	<div class="flex w-full flex-wrap items-center gap-8">
		<div>
			<Label>
				Select a size
				<Select class="mt-2" items={sizes} bind:value={size} />
			</Label>
		</div>
		<div>
			<Label class="mb-2">Actions</Label>
			<Button loading={downloading} loadingMessage="Downloading..." on:click={onDownload}
				>Download</Button
			>
		</div>
	</div>
	<div class="flex flex-col">
		<Card title="Recto" {size} bind:this={recto} />
		<Card title="Verso" {size} bind:this={verso} />
	</div>
</div>
