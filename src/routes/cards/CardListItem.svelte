<script>
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';

	export let card;
</script>

<div class="flex">
	<h3>
		{card.name ?? 'No name'}
	</h3>
	<Button outline on:click={async () => await goto(`/cards/${card.id}`)}>Go</Button>
</div>
