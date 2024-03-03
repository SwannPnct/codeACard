<script>
	import { Toast } from 'flowbite-svelte';
	import { CheckCircleSolid, CloseSolid } from 'flowbite-svelte-icons';
	import { getContext } from 'svelte';

	const message = getContext('message');
	let timeout;

	$: {
		if ($message) {
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(() => {
				message.set(null);
			}, 5000);
		}
	}
</script>

{#if $message}
	{#key $message}
		<div class="fixed bottom-6 z-[9999] flex h-fit w-fit w-full justify-center">
			<Toast
				divClass="p-4 bg-gray-600 text-white dark:bg-white dark:text-black"
				dismissable={false}
				color={$message.success ? 'green' : 'red'}
			>
				<svelte:fragment slot="icon">
					{#if $message.success}
						<CheckCircleSolid class="h-5 w-5" />
					{:else}
						<CloseSolid class="h-5 w-5" />
					{/if}
				</svelte:fragment>
				<span class="ml-5">{$message.message}</span>
			</Toast>
		</div>
	{/key}
{/if}
