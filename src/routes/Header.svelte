<script>
	import { Navbar, NavHamburger, NavUl, Button } from 'flowbite-svelte';
	import { getContext } from 'svelte';

	const user = getContext('user');
	export let session;
</script>

<Navbar>
	<NavHamburger />
	<NavUl>
		{#if session}
			{#if $user?.admin}
				<span>Admin</span>
			{/if}
			<form method="POST" action="/auth?/signout">
				<Button type="submit">Sign out</Button>
			</form>
		{:else}
			<form method="POST" action="/auth?/signin">
				<Button type="submit">Sign in with Github</Button>
			</form>
		{/if}
	</NavUl>
</Navbar>
