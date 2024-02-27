<script>
	import Button from '$lib/components/Button.svelte';
	import Error from '$lib/components/Error.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let form;
	export let title = '+ New';
	export let btnClass = '';
	export let formClass = '';

	let adding = false;
	let shouldConfirmMobile = false;

	onMount(() => {
		if (browser) {
			shouldConfirmMobile = !!window.matchMedia('screen and (max-width: 400px)')?.matches;
		}
	});
</script>

<form id="addnew" class={formClass} method="post" action="?/add">
	<Button
		class={btnClass}
		type="submit"
		loading={adding}
		loadingMessage="Adding..."
		confirm={shouldConfirmMobile}
		confirmMessage="The card editor is close to unusable on this type of device, are you sure?"
		on:click={() => {
			adding = true;
			document.getElementById('addnew').submit();
		}}>{title}</Button
	>
	<div>
		{#if form?.message}
			<Error>{form.message}</Error>
		{/if}
	</div>
</form>
