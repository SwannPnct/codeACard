<script>
	import { Input, Label, Select } from 'flowbite-svelte';
	import CardEditor from './CardEditor.svelte';
	import Button from '$lib/components/Button.svelte';
	import { defaultCode } from '../cards.utils';
	import { enhance } from '$app/forms';
	import Error from '../../../lib/components/Error.svelte';
	import { DownloadSolid, TrashBinSolid } from 'flowbite-svelte-icons';

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
	let deleting = false;
	let saving = false;

	const onSubmit = ({ formData }) => {
		saving = true;
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

	$: {
		if (form?.message) {
			deleting = false;
		}
	}
</script>

<form class="flex flex-col gap-6 p-8" method="post" use:enhance={onSubmit} action="?/save">
	<div class="flex items-center gap-4">
		<Button outline href="/cards" class="shrink-0">&#8592; Back</Button>
		<h1 class="text-3xl font-semibold">{cardName}</h1>
	</div>
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
		<div class="ml-auto" />
		<div>
			<Label class="mb-2">Actions</Label>
			<div class="flex gap-4">
				<Button color="green" pill type="submit" loading={saving} loadingMessage="Saving..."
					>Save</Button
				>
				<Button
					title="Download"
					color="purple"
					pill
					loading={downloading}
					loadingMessage="Downloading..."
					on:click={onDownload}><DownloadSolid /></Button
				>
				<form id="delete-form" method="post" action="?/delete">
					<Button
						title="Delete"
						color="red"
						loading={deleting}
						loadingMessage="Deleting..."
						confirm
						pill
						on:click={() => {
							deleting = true;
							document.getElementById('delete-form').submit();
						}}><TrashBinSolid /></Button
					>
				</form>
			</div>
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
