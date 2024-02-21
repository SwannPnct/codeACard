<script>
	import { Navbar, NavHamburger, NavUl, Button, NavBrand } from 'flowbite-svelte';
	import { DarkMode } from 'flowbite-svelte';

	export let session;
</script>

<Navbar>
	<NavBrand href="/">
		<span class="text-4xl font-semibold text-black dark:text-white">code_a_card</span>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<DarkMode />
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
