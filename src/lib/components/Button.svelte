<script>
	import { Button, Spinner } from 'flowbite-svelte';

	export let loading = false;
	export let loadingMessage = '';
</script>

<Button {...$$restProps} on:click>
	{#if loading}
		<Spinner class="me-3" size="4" color="white" />
	{/if}
	{#if loading && loadingMessage}
		{loadingMessage}
	{:else}
		<slot />
	{/if}
</Button>
