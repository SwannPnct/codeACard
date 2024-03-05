<script>
	import { Input, Label, Select } from 'flowbite-svelte';
	import CardEditor from './CardEditor.svelte';
	import Button from '$lib/components/Button.svelte';
	import { defaultCode } from '../cards.utils';
	import { DownloadSolid, TrashBinSolid } from 'flowbite-svelte-icons';
	import LabeledContainer from '$lib/components/LabeledContainer.svelte';
	import { goto } from '$app/navigation';
	import Form from '$lib/components/Form.svelte';

	export let data;

	const sizes = [
		{ value: 'vistaPrintStandard', name: 'Standard (85 x 55 mm)' },
		{ value: 'vistaPrintSquare', name: 'Square (65 x 65 mm)' }
	];

	let size = data.card.size ?? sizes[0].value;
	let cardName = data.card.name ?? '';

	let recto;
	let verso;

	let downloading = false;

	const appendFormData = ({ formData }) => {
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
</script>

<div class="flex flex-col gap-16 p-8">
	<div class="flex flex-wrap items-center gap-x-8 gap-y-2">
		<Form
			let:loading={backing}
			action="?/save"
			prehandler={appendFormData}
			onSuccess={async () => {
				await goto('/cards');
			}}
		>
			<Button type="submit" loading={backing} loadingMessage="Saving..." outline class="shrink-0"
				>&#8592; Back</Button
			>
		</Form>
		<h1>{cardName || 'No name'}</h1>
	</div>
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
			<Form let:loading={saving} prehandler={appendFormData} action="?/save">
				<Button color="green" pill type="submit" loading={saving} loadingMessage="Saving...">
					<strong>Save</strong>
				</Button>
			</Form>
			<Button
				title="Download"
				pill
				loading={downloading}
				loadingMessage="Downloading..."
				on:click={onDownload}><DownloadSolid /></Button
			>
			<Form
				action="?/delete"
				let:loading={deleting}
				confirm
				confirmMessage="Are you sure to delete this card?"
				onSuccess={async () => {
					await goto('/cards');
				}}
			>
				<Button
					title="Delete"
					color="red"
					loading={deleting}
					loadingMessage="Deleting..."
					pill
					type="submit"
				>
					<TrashBinSolid />
				</Button>
			</Form>
		</LabeledContainer>
	</div>
	<LabeledContainer label="Help" overrideClass="break-words max-w-[600px]">
		<p class="text-xs md:text-sm">
			The cards have an initial and uneditable style used for specific sizing and to avoid the card
			to shrink or grow. Those will be removed on download.
			<br />
			Code the rest, using plain HTML and CSS.
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
</div>
