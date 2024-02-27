<script>
	export let overrideClass = '';
	export let label;
</script>

<div class={`relative h-fit w-fit rounded-lg border p-6 ${overrideClass}`}>
	<slot />
	<span class="absolute m-0 bg-white px-1 dark:bg-gray-800">{label}</span>
</div>

<style>
	span {
		top: -14px;
	}
</style>
