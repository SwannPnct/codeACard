<script>
	import { Input, Label, Select } from 'flowbite-svelte';
	import CardEditor from './CardEditor.svelte';
	import Button from '$lib/components/Button.svelte';
	import { defaultCode } from '../cards.utils';
	import { enhance } from '$app/forms';
	import Error from '../../../lib/components/Error.svelte';
	import { DownloadSolid, TrashBinSolid } from 'flowbite-svelte-icons';
	import LabeledContainer from './LabeledContainer.svelte';
	import { goto } from '$app/navigation';

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
	let backing = false;

	const onSave = ({ formData }) => {
		saving = true;
		appendFormData(formData);

		return async ({ update }) => {
			await update({ reset: false });
			saving = false;
		};
	};

	const onBack = ({ formData }) => {
		backing = true;
		appendFormData(formData);

		return async ({ update, result }) => {
			await update();
			if (!['error', 'failure'].includes(result.type)) {
				await goto('/cards');
			}
		};
	};

	const appendFormData = (formData) => {
		formData.append('name', cardName);
		formData.append('size', size);
		formData.append('recto', recto.getValue());
		formData.append('verso', verso.getValue());
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

<form class="flex flex-col gap-16 p-8" method="post" use:enhance={onSave} action="?/save">
	<div class="flex flex-wrap items-center gap-x-8 gap-y-2">
		<form method="post" use:enhance={onBack} action="?/save">
			<Button type="submit" loading={backing} loadingMessage="Saving..." outline class="shrink-0"
				>&#8592; Back</Button
			>
		</form>
		<h1>{cardName || 'No name'}</h1>
	</div>
	{#if form?.message}<div><Error>{form.message}</Error></div>{/if}
	<div class="flex w-full flex-wrap gap-8">
		<LabeledContainer label="Settings" overrideClass="flex flex-wrap gap-x-8 gap-y-2 mr-auto">
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
	</div>
	<LabeledContainer label="Help" overrideClass="break-words max-w-[600px]">
		<p class="text-xs md:text-sm">
			The cards have an initial and uneditable style used for specific sizing and to avoid the card
			to shrink or grow. Those will be remove on download.
			<br />
			Code the rest, using plain HTML and
			<a class="underline" href="https://tailwindcss.com/docs/installation">Tailwind CSS</a>.
		</p>
	</LabeledContainer>
	<div class="flex flex-col gap-24">
		<CardEditor
			title="Recto"
			{size}
			bind:this={recto}
			defaultValue={data.card.recto ?? defaultCode}
			{cardName}
		/>
		<CardEditor
			title="Verso"
			{size}
			bind:this={verso}
			defaultValue={data.card.verso ?? defaultCode}
			{cardName}
		/>
	</div>
</form>
