<script>
	import CardListItem from './CardListItem.svelte';
	import Error from '$lib/components/Error.svelte';
	import NewCard from './NewCard.svelte';

	export let data;
	export let form;
</script>

<div>
	<div class="flex gap-12">
		<h1 class="mb-16 text-4xl">Your cards</h1>
		{#if data?.cards?.length !== 0}
			<NewCard {form} />
		{/if}
	</div>

	{#if data.error}
		<Error>{data.error.code} - {data.error.message}</Error>
	{:else if data.cards.length === 0}
		<NewCard title="+ Create your first card" btnClass="text-xl font-semibold" {form} />
	{:else}
		<div class="flex flex-wrap justify-center gap-12 sm:justify-start">
			{#each data.cards as card}
				<CardListItem {card} />
			{/each}
			<NewCard formClass="card-list-item opacity-50 !shadow-none" btnClass="size-full" {form} />
		</div>
	{/if}
</div>
