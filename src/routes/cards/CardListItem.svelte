<script>
	import { goto } from '$app/navigation';
	import { sizes, unsavedClass } from './cards.utils';

	export let card;
</script>

<button
	class="card-list-item relative block flex flex-col p-4"
	on:click={async () => await goto(`/cards/${card.id}`)}
>
	{@html `<div class="${unsavedClass} origin-top self-center scale-50 md:scale-75" style="width:${
		sizes[card.size].width
	};height:${sizes[card.size].height}">` +
		(card.recto ?? '') +
		'</div>'}
	<div class="absolute flex size-full items-end">
		<strong class="text-xs md:text-base">
			{card.name || 'No name'}
		</strong>
	</div>
</button>
