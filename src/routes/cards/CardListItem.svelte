<script>
	import { goto } from '$app/navigation';
	import { sizes } from './cards.utils';

	export let card;
</script>

<button
	class="card-list-item relative block flex flex-col p-4"
	on:click={async () => await goto(`/cards/${card.id}`)}
>
	{@html `<div class="border shrink-0 border-black border-dashed dark:border-white origin-top self-center scale-75" style="width:${
		sizes[card.size].width
	};height:${sizes[card.size].height}">` +
		card.recto +
		'</div>'}
	<div class="absolute flex size-full items-end">
		<span>
			{card.name || 'No name'}
		</span>
	</div>
</button>
