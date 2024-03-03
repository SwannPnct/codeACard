<script>
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Form from '$lib/components/Form.svelte';
	import { goto } from '$app/navigation';

	export let title = '+ New';
	export let btnClass = '';
	export let formClass = '';

	let shouldConfirmMobile = false;

	onMount(() => {
		if (browser) {
			shouldConfirmMobile = !!window.matchMedia('screen and (max-width: 400px)')?.matches;
		}
	});
</script>

<Form
	confirm={shouldConfirmMobile}
	confirmMessage="The card editor is close to unusable on this type of device, are you sure?"
	class={formClass}
	action="?/add"
	onSuccess={async ({ result }) => {
		await goto(result.data.goto);
	}}
	let:loading={adding}
>
	<Button class={btnClass} type="submit" loading={adding} loadingMessage="Adding...">
		{title}
	</Button>
</Form>
