<script>
	import html2canvas from 'html2canvas';
	import { sizes } from './cards.utils';
	import { browser } from '$app/environment';

	export let title;
	export let size;
	export let purifiedCode;
	export let cardName;
	export let overrideClass = '';

	$: frameId = `frame-${title}`;

	export const download = async () => {
		if (browser) {
			const link = document.createElement('a');
			link.download = `${cardName}-${title}-${sizes[size].width}-${sizes[size].height}.png`;

			const iframe = document.getElementById(frameId);
			const canvas = await html2canvas(iframe.contentDocument.body, {
				backgroundColor: null
			});

			link.href = canvas.toDataURL('image/png', 1);
			link.click();
		}
	};
</script>

<div
	style={`width:${sizes[size].width}; height:${sizes[size].height}`}
	class={`shrink-0 overflow-hidden border border-dashed border-black dark:border-white ${overrideClass}`}
>
	<iframe
		id={frameId}
		{title}
		class="size-full"
		srcdoc={`
                <html style="all: unset; width: 100%; height: 100%; overflow: hidden;">
                    <body style="all: unset; width: 100%; height: 100%; overflow: hidden;">
                        ${purifiedCode}
                        <style>
                            a, h1, h2, h3, button, span, p {
                                all: unset;
                            }
                        </style>
                    </body>
                </html>
            `}
	/>
</div>
