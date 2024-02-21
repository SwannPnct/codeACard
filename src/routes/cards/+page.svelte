<script>
	import CardListItem from './CardListItem.svelte';
	import Button from '$lib/components/Button.svelte';
	import Error from '$lib/components/Error.svelte';

	export let data;
	export let form;
</script>

<div>
	<h1>Your cards</h1>
	{#if data.error}
		<Error>{data.error.code} - {data.error.message}</Error>
	{:else}
		{#each data.cards as card}
			<CardListItem {card} />
		{/each}
	{/if}
	<form method="post" action="?/add">
		<Button type="submit">New Card</Button>
		<div>
			{#if form?.message}
				<Error>{form.message}</Error>
			{/if}
		</div>
	</form>
</div>
