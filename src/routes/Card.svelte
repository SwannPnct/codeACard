<script>
	import { browser } from '$app/environment';
	import { Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';

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
			await import('brace/mode/css');
			await import('brace/theme/chrome');
			AceEditor = (await import('svelte-ace')).AceEditor;
		}
	});

	let code = `<div class="border border-black border-dashed" style="width:${sizes[size].width};height:${sizes[size].height}">\n\n</div>`;
</script>

<div class="flex w-1/2 flex-col items-center">
	<h2>
		{title}
	</h2>
	{@html code}
	<h3>HTML</h3>
	{#if AceEditor}
		<svelte:component
			this={AceEditor}
			lang="html"
			theme="chrome"
			bind:value={code}
			width="100%"
			height="300px"
		/>
	{:else}
		<div class="flex items-center justify-center" style={`width: 100%; heigth: ${editorHeight}`}>
			<Spinner size="10" />
		</div>
	{/if}
</div>
