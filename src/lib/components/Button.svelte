<script>
	import { Button, Spinner } from 'flowbite-svelte';

	export let loading = false;
	export let loadingMessage = 'Loading...';
</script>

<Button {...$$restProps} on:click>
	{#if loading}
		<Spinner class="me-3" size="4" color="white" /> {loadingMessage}
	{:else}
		<slot />
	{/if}
</Button>
