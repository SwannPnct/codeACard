<script>
	import { Footer } from 'flowbite-svelte';

	const currentYear = new Date().getFullYear();
</script>

<Footer class="mt-auto pb-12 pt-16 md:pt-24">
	<span class="block text-center text-sm text-gray-500 dark:text-gray-400">
		&copy; {currentYear}
		<button
			title="www.fogosoft.eu"
			class="hover:underline"
			on:click={() => window.open('https://www.fogosoft.eu', '_blank')}
		>
			fogosoft
		</button>
		All Rights Reserved.
	</span>
</Footer>
