<script>
	import { Button, Spinner, Modal } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let loading = false;
	export let loadingMessage = 'Loading...';
	export let confirm = false;

	let openModal = false;

	const onClick = () => {
		if (confirm) {
			openModal = true;
		} else {
			dispatch('click');
		}
	};
</script>

<Button {...$$restProps} on:click={onClick}>
	{#if loading}
		<Spinner class="me-3" size="4" color="white" /> {loadingMessage}
	{:else}
		<slot />
	{/if}
</Button>

<Modal bind:open={openModal} autoclose size="sm" dismissable={false}>
	<div class="w-full text-center">Are you sure?</div>
	<svelte:fragment slot="footer">
		<div class="flex w-full justify-around">
			<svelte:self>No</svelte:self>
			<svelte:self color="red" on:click>Yes</svelte:self>
		</div>
	</svelte:fragment>
</Modal>
