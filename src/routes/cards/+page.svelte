<script>
	import CardListItem from './CardListItem.svelte';
	import Button from '$lib/components/Button.svelte';

	export let data;
	export let form;
</script>

<div>
	<h1>Your cards</h1>
	{#if data.error}
		<strong class="text-red-600">{data.error.code} - {data.error.message}</strong>
	{:else}
		{#each data.cards as card}
			<CardListItem {card} />
		{/each}
	{/if}
	<form method="post" action="?/add">
		<Button type="submit">New Card</Button>
		<div>
			{#if form?.message}
				<strong class="text-red-600">{form.message}</strong>
			{/if}
		</div>
	</form>
</div>
