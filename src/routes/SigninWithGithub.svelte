<script>
	import Button from '$lib/components/Button.svelte';
	import { GithubSolid } from 'flowbite-svelte-icons';
</script>

<form method="POST" action="/auth?/signin">
	<Button title="Sign in with Github" type="submit">
		<span class="mr-4">Sign in</span>
		<GithubSolid size="lg" />
	</Button>
</form>
