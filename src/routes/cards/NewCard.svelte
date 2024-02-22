<script>
	import Button from '$lib/components/Button.svelte';
	import Error from '$lib/components/Error.svelte';

	export let form;
	export let title = '+ New';
	export let btnClass = '';
	export let formClass = '';
</script>

<form class={formClass} method="post" action="?/add">
	<Button class={btnClass} type="submit">{title}</Button>
	<div>
		{#if form?.message}
			<Error>{form.message}</Error>
		{/if}
	</div>
</form>
