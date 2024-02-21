<script>
	import '../app.pcss';
	import Header from './Header.svelte';

	export let data;
	$: ({ session } = data);
</script>

<div
	class="h-fit min-h-screen w-full bg-white font-mono text-black dark:bg-gray-800 dark:text-white"
>
	<Header {session} />
	<slot />
</div>
