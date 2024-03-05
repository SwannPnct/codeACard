<script>
	import { setContext } from 'svelte';
	import '../app.pcss';
	import Header from './Header.svelte';
	import message from '$lib/stores/message.store';
	import Toast from './Toast.svelte';
	import Footer from './Footer.svelte';
	import { page } from '$app/stores';

	setContext('message', message);

	export let data;
	$: ({ session } = data);
</script>

<svelte:head>
	<title>{$page.data.metadata.title}</title>
	<meta name="description" content={$page.data.metadata.description} />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
</svelte:head>

<div
	class="relative flex min-h-screen w-full flex-col bg-white font-mono text-black dark:bg-gray-800 dark:text-white"
>
	<Header {session} />
	<div class="size-full px-4 py-8 md:px-12">
		<slot />
	</div>
	<Toast />
	<Footer />
</div>
