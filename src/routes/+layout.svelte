<script>
	import '../app.pcss';
	import Header from './Header.svelte';
	import user from '$lib/stores/user.js';
	import { setContext } from 'svelte';
	import { browser } from '$app/environment';

	setContext('user', user);

	export let data;
	$: ({ session } = data);

	$: {
		if (browser) {
			if (session) {
				// (async () => {
				// 	user.set(await fetchSelf());
				// })();
			} else {
				user.set(null);
			}
		}
	}

	// const fetchSelf = async () => {
	// 	const res = await fetch('/api/self');
	// 	return await res.json();
	// };
</script>

<Header {session} />
<slot />
