<script>
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import Error from '$lib/components/Error.svelte';
</script>

<div>
	<Error>{$page.error.message}</Error>
	<Button on:click={async () => await goto('/cards')}>All cards</Button>
</div>
