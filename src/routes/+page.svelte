<script>
	import SigninWithGithub from './SigninWithGithub.svelte';
	import exampleFrame from '$lib/assets/example-frame.webm';
	import exampleCode from '$lib/assets/example-code.webm';
	import LabeledContainer from '$lib/components/LabeledContainer.svelte';

	let videoContainer;

	const onScroll = () => {
		if (videoContainer) videoContainer.style.top = `${window.scrollY / 4}px`;
	};

	const videoProps = {
		autoplay: true,
		muted: true,
		playsinline: true,
		loop: true
	};
</script>

<svelte:window on:scroll={onScroll} />

<div class="relative mx-auto mt-16 flex w-fit flex-col items-center gap-24">
	<div class="z-[999] text-center">
		<h1>Code your business card with HTML and CSS.</h1>
		<h2 class="text-xl md:text-3xl">Then download it. Simple.</h2>
	</div>
	<div
		bind:this={videoContainer}
		style="top: 0;"
		class="relative flex flex-col items-center gap-24 lg:flex-row"
	>
		<video src={exampleFrame} width="300" {...videoProps} />
		<video src={exampleCode} width="500" {...videoProps} />
	</div>
	<LabeledContainer
		label="Try it:"
		overrideClass="z-[999] border-black dark:border-white bg-white dark:bg-gray-800 flex flex-col items-center shadow-xl "
	>
		<SigninWithGithub />
	</LabeledContainer>
</div>
