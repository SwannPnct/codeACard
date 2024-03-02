<script>
	import CardListItem from './CardListItem.svelte';
	import Error from '$lib/components/Error.svelte';
	import NewCard from './NewCard.svelte';

	export let data;
</script>

<div>
	<div class="flex gap-12">
		<h1 class="mb-16">Your cards</h1>
		{#if data?.cards?.length !== 0}
			<NewCard />
		{/if}
	</div>

	{#if data.error}
		<Error>{data.error.code} - {data.error.message}</Error>
	{:else if data.cards.length === 0}
		<NewCard title="+ Create your first card" btnClass="text-xl font-semibold" />
	{:else}
		<div class="flex flex-wrap justify-center gap-12 md:justify-start">
			{#each data.cards as card}
				<CardListItem {card} />
			{/each}
			<NewCard
				formClass="card-list-item opacity-50 hover:opacity-100 !shadow-none transition-opacity"
				btnClass="size-full"
			/>
		</div>
	{/if}
</div>
