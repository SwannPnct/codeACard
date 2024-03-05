<script>
	import SigninWithGithub from './SigninWithGithub.svelte';
	import exampleFrame from '$lib/assets/example-frame.webm';
	import exampleCode from '$lib/assets/example-code.webm';
	import LabeledContainer from '$lib/components/LabeledContainer.svelte';
</script>

<div class="relative mx-auto mt-16 flex w-fit flex-col items-center gap-24">
	<div class="text-center">
		<h1>Code your business card with HTML and CSS.</h1>
		<h2 class="text-xl md:text-3xl">Then download it. Simple.</h2>
	</div>
	<LabeledContainer
		label="Check it out"
		overrideClass="flex flex-col items-center gap-24 lg:flex-row"
	>
		<video src={exampleFrame} autoplay playsinline width="300" loop={true} />
		<video src={exampleCode} autoplay playsinline width="500" loop={true} />
	</LabeledContainer>
	<div class="flex flex-col items-center gap-4 md:flex-row">
		<span class="block">If you want to try it: </span>
		<SigninWithGithub />
	</div>
</div>
