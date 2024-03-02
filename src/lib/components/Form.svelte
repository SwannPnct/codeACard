<script>
	import { enhance } from '$app/forms';

	export let method = 'post';
	export let confirm = false;
	export let confirmMessage = 'Are you sure?';
	export let prehandler = undefined;
	export let posthandler = undefined;
	export let enhancer = async ({ formData, cancel }) => {
		loading = true;

		if (confirm && !window?.confirm(confirmMessage)) {
			return cancel();
		}

		prehandler?.({ formData });

		return async ({ update, result }) => {
			await update();
			await posthandler?.({ result });
		};
	};

	let loading = false;
</script>

<form {method} use:enhance={enhancer} {...$$restProps}>
	<slot {loading} />
</form>
