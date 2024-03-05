<script>
	import { Navbar, NavHamburger, NavUl, Button, NavBrand } from 'flowbite-svelte';
	import { DarkMode } from 'flowbite-svelte';
	import SigninWithGithub from './SigninWithGithub.svelte';
	import Form from '$lib/components/Form.svelte';

	export let session;
</script>

<Navbar class="bg-gray-200">
	<NavBrand href="/">
		<span class="text-2xl font-semibold text-black md:text-4xl dark:text-white">codeACard</span>
	</NavBrand>
	<DarkMode btnClass="ml-auto" />
	<NavHamburger />
	<NavUl class="ml-4">
		<li>
			{#if session}
				<Form action="/auth?/signout">
					<Button outline type="submit">Sign out</Button>
				</Form>
			{:else}
				<SigninWithGithub />
			{/if}
		</li>
	</NavUl>
</Navbar>
