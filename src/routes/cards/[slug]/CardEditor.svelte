<script>
	import { browser } from '$app/environment';
	import { Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import DOMPurify from 'dompurify';
	import domtoimage from 'dom-to-image';
	import { sizes, unsavedClass } from '../cards.utils';

	export let title;
	export let size;
	export let defaultValue;
	export let cardName;

	const editorHeight = '300px';
	const containerId = 'container';

	export const download = async () => {
		const element = document.getElementById(containerId);
		element.className = 'overflow-hidden';
		const dataUrl = await domtoimage.toPng(element);
		element.className = unsavedClass;
		const link = document.createElement('a');
		link.download = `${cardName}-${title}-${sizes[size].width}-${sizes[size].height}.png`;
		link.href = dataUrl;
		link.click();
	};

	export const getValue = () => {
		return purifyHTML?.sanitize(code);
	};

	let AceEditor;
	onMount(async () => {
		if (browser) {
			await import('brace');
			await import('brace/mode/html');
			await import('brace/theme/monokai');
			AceEditor = (await import('svelte-ace')).AceEditor;
		}
	});

	let purifyHTML;
	onMount(() => {
		if (window) {
			purifyHTML = DOMPurify(window);
		}
	});

	$: topWrapper = `<div id="${containerId}" style="width:${sizes[size].width}; height:${sizes[size].height}">`;
	const bottomWrapper = '</div>';

	const unsavedWrapperClass = `class="${unsavedClass}" >`;

	let code = defaultValue;
</script>

<div class="flex w-full flex-wrap justify-center gap-20">
	<div class="flex flex-col gap-12">
		<h2 class="self-center">
			{title}
		</h2>
		{#if purifyHTML}
			{@html purifyHTML.sanitize(
				topWrapper.replace('>', unsavedWrapperClass) + code + bottomWrapper
			)}
		{/if}
	</div>
	<div class="grow">
		{#if AceEditor}
			<code class="self-start text-balance text-xs text-gray-400">{topWrapper}</code>
			<svelte:component
				this={AceEditor}
				lang="html"
				theme="monokai"
				bind:value={code}
				width="100%"
				height="300px"
			/>
			<code class="self-start text-balance text-xs text-gray-400">{bottomWrapper}</code>
		{:else}
			<div class="flex items-center justify-center" style={`width: 100%; heigth: ${editorHeight}`}>
				<Spinner size="10" color="primary" />
			</div>
		{/if}
	</div>
</div>
