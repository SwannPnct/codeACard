<script>
	import { enhance, applyAction } from '$app/forms';
	import { page } from '$app/stores';
	import { getContext } from 'svelte';

	export let method = 'post';
	export let confirm = false;
	export let confirmMessage = 'Are you sure?';
	export let prehandler = undefined;
	export let onSuccess = undefined;
	export let enhancer = async ({ formData, cancel }) => {
		loading = true;

		if (confirm && !window?.confirm(confirmMessage)) {
			loading = false;
			return cancel();
		}

		await prehandler?.({ formData });

		return async ({ update, result }) => {
			await update();
			await applyAction(result);
			loading = false;

			if (result.type === 'success') {
				await onSuccess?.({ result });
			}
		};
	};

	const message = getContext('message');
	let loading = false;

	$: {
		if ($page.form) {
			message.set($page.form);
		}
	}
</script>

<form {method} use:enhance={enhancer} {...$$restProps}>
	<slot {loading} />
</form>
