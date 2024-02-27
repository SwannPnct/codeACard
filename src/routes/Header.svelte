<script>
	import { Navbar, NavHamburger, NavUl, Button, NavBrand } from 'flowbite-svelte';
	import { DarkMode } from 'flowbite-svelte';

	export let session;
</script>

<Navbar class="bg-gray-200">
	<NavBrand href="/">
		<span class="text-2xl font-semibold text-black md:text-4xl dark:text-white">codeACard</span>
	</NavBrand>
	<DarkMode btnClass="ml-auto" />
	<NavHamburger />
	<NavUl class="ml-4">
		{#if session}
			<form method="POST" action="/auth?/signout">
				<Button outline type="submit">Sign out</Button>
			</form>
		{:else}
			<form method="POST" action="/auth?/signin">
				<Button outline type="submit">Sign in with Github</Button>
			</form>
		{/if}
	</NavUl>
</Navbar>
