<script>
	import { Input, Label, Select } from 'flowbite-svelte';
	import CardEditor from './CardEditor.svelte';
	import Button from '$lib/components/Button.svelte';
	import { defaultCode } from '../cards.utils';
	import { enhance } from '$app/forms';
	import Error from '../../../lib/components/Error.svelte';

	export let data;
	export let form;

	const sizes = [
		{ value: 'vistaPrintStandard', name: 'Standard (85 x 55 mm)' },
		{ value: 'vistaPrintSquare', name: 'Square (65 x 65 mm)' }
	];

	let size = data.card.size ?? sizes[0].value;
	let cardName = data.card.name ?? '';
	let recto;
	let verso;

	let downloading = false;
	let saving = false;

	const onSubmit = ({ formData }) => {
		saving = true;
		formData.append('id', data.card.id);
		formData.append('name', cardName);
		formData.append('size', size);
		formData.append('recto', recto.getValue());
		formData.append('verso', verso.getValue());

		return async ({ update }) => {
			await update({ reset: false });
			saving = false;
		};
	};

	const onDownload = async () => {
		downloading = true;
		await recto.download();
		await verso.download();
		downloading = false;
	};
</script>

<form class="flex flex-col gap-4 p-8" method="post" use:enhance={onSubmit}>
	<div class="flex w-full flex-wrap items-center gap-8">
		<div>
			<Label>
				Select a size
				<Select class="mt-2" items={sizes} bind:value={size} />
			</Label>
		</div>
		<div>
			<Label>
				Name
				<Input class="mt-2" bind:value={cardName} />
			</Label>
		</div>
		<div>
			<Label class="mb-2">Actions</Label>
			<Button type="submit" loading={saving} loadingMessage="Saving...">Save</Button>
			<Button loading={downloading} loadingMessage="Downloading..." on:click={onDownload}
				>Download</Button
			>
		</div>
		<div>
			{#if form?.message}<Error>{form.message}</Error>{/if}
		</div>
	</div>
	<div class="flex flex-col">
		<CardEditor
			title="Recto"
			{size}
			bind:this={recto}
			defaultValue={data.card.recto ?? defaultCode}
		/>
		<CardEditor
			title="Verso"
			{size}
			bind:this={verso}
			defaultValue={data.card.verso ?? defaultCode}
		/>
	</div>
</form>
