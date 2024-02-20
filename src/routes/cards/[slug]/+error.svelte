<script>
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
</script>

<div>
	<strong class="text-red-600">{$page.error.message}</strong>
	<Button on:click={async () => await goto('/cards')}>All cards</Button>
</div>
