<script>
	import { browser } from '$app/environment';
	import { Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import DOMPurify from 'dompurify';

	export let title;
	export let size = 'vistaPrintStandard';

	const editorHeight = '300px';
	const sizes = {
		vistaPrintStandard: {
			width: '8.5cm',
			height: '5.5cm'
		},
		vistaPrintSquare: {
			width: '6.5cm',
			height: '6.5cm'
		}
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

	$: topWrapper = `<div class="border border-black border-dashed" style="width:${sizes[size].width};height:${sizes[size].height}">`;
	const bottomWrapper = '</div>';

	let code = `<div class="size-full">\n\n</div>`;
</script>

<div class="flex flex-col items-center">
	<h2 class="text-3xl font-semibold">
		{title}
	</h2>
	<div class="flex w-full flex-wrap items-center justify-around gap-8">
		{#if purifyHTML}
			{@html purifyHTML.sanitize(topWrapper + code + bottomWrapper)}
		{/if}
		<div>
			<h3>HTML + Tailwind CSS</h3>
			{#if AceEditor}
				<code class="self-start text-xs text-gray-400">{topWrapper}</code>
				<svelte:component
					this={AceEditor}
					lang="html"
					theme="monokai"
					bind:value={code}
					width="100%"
					height="300px"
				/>
				<code class="self-start text-xs text-gray-400">{bottomWrapper}</code>
			{:else}
				<div
					class="flex items-center justify-center"
					style={`width: 100%; heigth: ${editorHeight}`}
				>
					<Spinner size="10" color="primary" />
				</div>
			{/if}
		</div>
	</div>
</div>
