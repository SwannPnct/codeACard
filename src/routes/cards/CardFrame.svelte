<script>
	import html2canvas from 'html2canvas';
	import { sizes } from './cards.utils';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let title;
	export let size;
	export let purifiedCode;
	export let cardName;
	export let overrideClass = '';

	let frame;

	export const download = async () => {
		if (browser) {
			const link = document.createElement('a');
			link.download = `${cardName}-${title}-${sizes[size].width}-${sizes[size].height}.png`;

			const canvas = await html2canvas(frame.contentDocument.body, {
				backgroundColor: null
			});

			link.href = canvas.toDataURL('image/png', 1);
			link.click();
		}
	};

	onMount(() => {
		const { contentDocument } = frame;

		contentDocument.open();
		contentDocument.write(`
                <html style="all: unset; width: 100%; height: 100%; overflow: hidden;">
					<head>
						<style>
						a, h1, h2, h3, button, span, p {
							all: unset;
						}
                        </style>
					</head>
                    <body style="all: unset; width: 100%; height: 100%; overflow: hidden;">
						${purifiedCode}
                    </body>
                </html>
            `);
		contentDocument.close();

		const script = contentDocument.createElement('script');
		script.type = 'module';
		script.innerHTML = `
		window.addEventListener('message', (event) => {
        const { type, value } = event.data;

        if (type === 'html') {
          document.body.innerHTML = value;
        }
      	})
		`;
		contentDocument.head.appendChild(script);
	});

	$: {
		frame?.contentWindow.postMessage({ type: 'html', value: purifiedCode }, '*');
	}
</script>

<div
	style={`width:${sizes[size].width}; height:${sizes[size].height}`}
	class={`shrink-0 overflow-hidden border border-dashed border-black dark:border-white ${overrideClass}`}
>
	<iframe bind:this={frame} {title} class="size-full" />
</div>
