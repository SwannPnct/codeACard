<script>
	import { setContext } from 'svelte';
	import '../app.pcss';
	import Header from './Header.svelte';
	import message from '$lib/stores/message.store';
	import Toast from './Toast.svelte';

	setContext('message', message);

	export let data;
	$: ({ session } = data);
</script>

<div
	class="relative h-fit min-h-screen w-full bg-white font-mono text-black dark:bg-gray-800 dark:text-white"
>
	<Header {session} />
	<div class="size-full px-2 py-8 sm:px-4 md:px-12">
		<slot />
	</div>
	<Toast />
</div>
