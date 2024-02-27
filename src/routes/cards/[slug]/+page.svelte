<script>
	import { Input, Label, Select } from 'flowbite-svelte';
	import CardEditor from './CardEditor.svelte';
	import Button from '$lib/components/Button.svelte';
	import { defaultCode } from '../cards.utils';
	import { enhance } from '$app/forms';
	import Error from '../../../lib/components/Error.svelte';
	import { DownloadSolid, TrashBinSolid } from 'flowbite-svelte-icons';
	import LabeledContainer from './LabeledContainer.svelte';

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

<form class="flex flex-col gap-16 p-8" method="post" use:enhance={onSubmit} action="?/save">
	<div class="flex flex-wrap items-center gap-x-8 gap-y-2">
		<Button outline href="/cards" class="shrink-0">&#8592; Back</Button>
		<h1>{cardName || 'No name'}</h1>
	</div>
	<div class="flex w-full flex-wrap gap-8">
		<LabeledContainer label="Settings" overrideClass="mr-auto flex flex-wrap gap-x-8 gap-y-2">
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
		</LabeledContainer>
		<LabeledContainer label="Actions" overrideClass="flex gap-4 flex-wrap">
			<Button color="green" pill type="submit" loading={saving} loadingMessage="Saving..."
				><strong>Save</strong></Button
			>
			<Button
				title="Download"
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
		</LabeledContainer>
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
