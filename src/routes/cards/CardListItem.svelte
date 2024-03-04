<script>
	import { goto } from '$app/navigation';
	import CardFrame from './CardFrame.svelte';

	export let card;
</script>

<button
	class="card-list-item relative block flex flex-col p-4"
	on:click={async () => await goto(`/cards/${card.id}`)}
>
	<CardFrame
		title="Recto"
		size={card.size}
		purifiedCode={card.recto}
		cardName={card.name}
		overrideClass="origin-top self-center scale-50 md:scale-75"
	/>
	<div class="absolute flex size-full items-end">
		<strong class="text-xs md:text-base">
			{card.name || 'No name'}
		</strong>
	</div>
</button>
